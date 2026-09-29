import Movie from "../models/movie.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import { Plans } from "../constants/plans.constants.js";
import { constructorError } from "../utils/contructor.error.js";
import { embellishText } from "./embellish-text.service.js";
import { buscarPeliculaTMDB, obtenerPeliculaTMDB, obtenerPosterTMDB } from "./api-externa.service.js";

export const createMovieService = async (data, userId) => {
    const category = await Category.findById(data.category);

    if (!category) { throw constructorError("Categoría no encontrada", 404); }

    const user = await User.findById(userId);

    if (!user) { throw constructorError("Usuario no encontrado", 404); }

    if (user.plan === Plans.plus) {
        const movieCount = await Movie.countDocuments({
            user: userId
        });

        if (movieCount >= 4) { throw constructorError( "El plan Plus permite un máximo de 4 películas", 409); }
    }

    const peliculaExistente = await Movie.findOne({
        user: userId,
        title: data.title,
        releaseYear: data.releaseYear
    });

    if (peliculaExistente) {
        throw constructorError( "Ya tenés esta película en tu colección", 409 );
    }

    const description = await embellishText(data.description);

    const tmdbMovie = await buscarPeliculaTMDB(
        data.title,
        data.releaseYear
    );

    if (!tmdbMovie) { throw constructorError("No se encontró la película en TMDB",404);}

    const movie = await Movie.create({
        title: data.title,
        description: description,
        releaseYear: data.releaseYear,
        category: data.category,
        user: userId,
        tmdbId: tmdbMovie.id
    });

    return movie;
};

export const getMoviesService = async ( userId, page, limit, filters = {}) => {
    const skip = (page - 1) * limit;

    const query = { user: userId };

    if (filters.title) { query.title = { $regex: filters.title, $options: "i" }; }

    if (filters.category) { query.category = filters.category; }

    if (filters.releaseYear !== undefined) { query.releaseYear = filters.releaseYear; }

    const [movies, total] = await Promise.all([
        Movie.find(query)
             .select("title description releaseYear category user tmdbId")
             .populate("category", "name description")
             .skip(skip)
             .limit(limit)
             .lean(),

        Movie.countDocuments(query) //cantidad de pelis para paginacion
    ]);

    const moviesWithPosters = await Promise.all(
        movies.map(async (movie) => {
            let poster = null;

            try {
                const tmdbMovie = await obtenerPeliculaTMDB(movie.tmdbId);
                poster = obtenerPosterTMDB(tmdbMovie.poster_path);
                if(poster == null ) { poster = `No se pudo obtener el poster de TMDB para la película ${movie._id}`}
            } catch (error) {
                console.error( `No se pudo obtener el poster de TMDB para la película ${movie._id}:`, error.message);
            }

            return { ...movie, poster };
        })
    );

    return {
        data: moviesWithPosters,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const getMovieByIdService = async (movieId, userId) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    })
        .populate("category", "name description")
        .lean();

    if (!movie) {
        throw constructorError("Película no encontrada", 404);
    }

    let poster = null;

    try {
        const tmdbMovie = await obtenerPeliculaTMDB(movie.tmdbId);
        poster = obtenerPosterTMDB(tmdbMovie.poster_path);
    } catch (error) {
        console.error( `No se pudo obtener el poster de TMDB para la película ${movie._id}:`, error.message );
    }

    return { ...movie, poster };
};

export const updateMovieService = async (movieId, userId, data) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    });

    if (!movie) { throw constructorError("Película no encontrada", 404); }

    if (data.title !== undefined) { movie.title = data.title; }

    if (data.description !== undefined) { movie.description = await embellishText(data.description); }

    if (data.releaseYear !== undefined) { movie.releaseYear = data.releaseYear; }

    if (data.category !== undefined) {
        const category = await Category.findById(data.category);

        if (!category) { throw constructorError("Categoría no encontrada", 404); }

        movie.category = data.category;
    }

    if ( data.title !== undefined || data.releaseYear !== undefined) {
        const tmdbMovie = await buscarPeliculaTMDB(
            movie.title,
            movie.releaseYear
        );

        if (!tmdbMovie) {
            throw constructorError( "No se encontró la película en TMDB", 404 );
        }

        movie.tmdbId = tmdbMovie.id;
    }
    return await movie.save();
};

export const replaceMovieService = async (movieId, userId, data) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    });

    if (!movie) { throw constructorError("Película no encontrada", 404); }

    const category = await Category.findById(data.category);

    if (!category) { throw constructorError("Categoría no encontrada", 404); }
    
    let tmdbId = movie.tmdbId;

    if (data.title !== movie.title || data.releaseYear !== movie.releaseYear) {
        const tmdbMovie = await buscarPeliculaTMDB(
            data.title,
            data.releaseYear
        );

        if (!tmdbMovie) { throw constructorError("No se encontró la película en TMDB", 404); }

        tmdbId = tmdbMovie.id;
    }

    movie.title = data.title;
    movie.description = await embellishText(data.description);
    movie.releaseYear = data.releaseYear;
    movie.category = data.category;
    movie.tmdbId = tmdbId;

    return await movie.save();
};

export const deleteMovieService = async (movieId, userId) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    });

    if (!movie) { throw constructorError("Película no encontrada", 404); }

    await movie.deleteOne();
};