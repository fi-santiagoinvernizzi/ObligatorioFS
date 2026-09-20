import Movie from "../models/movie.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import { Plans } from "../constants/plans.constants.js";
import { constructorError } from "../utils/contructor.error.js";

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
    
    const movie = await Movie.create({
        title: data.title,
        description: data.description,
        releaseYear: data.releaseYear,
        category: data.category,
        user: userId
    });

    return movie;
};

export const getMoviesService = async (userId) => {
    const movies = await Movie.find({
        user: userId
    });

    return movies;
};

export const getMovieByIdService = async (movieId, userId) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    });

    if (!movie) {
        throw constructorError("Película no encontrada", 404);
    }

    return movie;
};

export const updateMovieService = async (movieId, userId, data) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    });

    if (!movie) { throw constructorError("Película no encontrada", 404); }

    if (data.title !== undefined) { movie.title = data.title; }

    if (data.description !== undefined) { movie.description = data.description; }

    if (data.releaseYear !== undefined) { movie.releaseYear = data.releaseYear;}

    if (data.category !== undefined) {
        const category = await Category.findById(data.category);
        if (!category) { throw constructorError("Categoría no encontrada", 404); }

        movie.category = data.category;
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

    movie.title = data.title;
    movie.description = data.description;
    movie.releaseYear = data.releaseYear;
    movie.category = data.category;

    return await movie.save();
};

export const deleteMovieService = async (movieId, userId) => {
    const movie = await Movie.findOne({
        _id: movieId,
        user: userId
    });

    if (!movie) { throw constructorError("Película no encontrada", 404); }

    await movie.deleteOne();

    return;
};