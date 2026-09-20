import {createMovieService, getMoviesService, getMovieByIdService, updateMovieService,
        replaceMovieService, deleteMovieService } from "../services/movie.services.js";

export const createMovieController = async (req, res, next) => {
    try {
        const movie = await createMovieService(
            req.body,
            req.user.id
        );
        return res.status(201).json(movie);

    } catch (error) {
        next(error);
    }
};

export const getMoviesController = async (req, res, next) => {
    try {
        const movies = await getMoviesService(req.user.id);
        return res.status(200).json(movies);

    } catch (error) {
        next(error);
    }
};

export const getMovieByIdController = async (req, res, next) => {
    try {
        const movie = await getMovieByIdService(
            req.params.idMovie,
            req.user.id
        );
        return res.status(200).json(movie);

    } catch (error) {
        next(error);
    }
};

export const updateMovieController = async (req, res, next) => {
    try {
        const movie = await updateMovieService(
            req.params.idMovie,
            req.user.id,
            req.body
        );
        return res.status(200).json(movie);

    } catch (error) {
        next(error);
    }
};

export const replaceMovieController = async (req, res, next) => {
    try {
        const movie = await replaceMovieService(
            req.params.idMovie,
            req.user.id,
            req.body
        );
        return res.status(200).json(movie);

    } catch (error) {
        next(error);
    }
};

export const deleteMovieController = async (req, res, next) => {
    try {
        await deleteMovieService(
            req.params.idMovie,
            req.user.id
        );
        return res.status(204).send();
        
    } catch (error) {
        next(error);
    }
};