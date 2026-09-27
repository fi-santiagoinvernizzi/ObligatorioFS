import axios from "axios";
import { constructorError } from "../utils/contructor.error.js";

//imports del error
import https from "node:https";
import dns from "node:dns";


const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN;

//mas cosas para el error
dns.setDefaultResultOrder("ipv4first");

const httpsAgent = new https.Agent({
    keepAlive: false,
    family: 4
});

const apiExternas = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 15000,

    //tratando de arreglar el error
    httpsAgent,
    //termina aca

    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${tmdbAccessToken}`
    }
});

export const buscarPeliculaTMDB = async (title, releaseYear) => {
    const maxIntentos = 3;

    for (let intento = 1; intento <= maxIntentos; intento++) {
        try {
            const response = await apiExternas.get("/search/movie", {
                params: {
                    query: title,
                    primary_release_year: releaseYear,
                    include_adult: false,
                    language: "es-ES"
                }
            });

            const resultados = response.data.results;

            if (!resultados || resultados.length === 0) {
                return null;
            }

            const tituloBuscado = title.trim().toLowerCase();

            return (
                resultados.find((movie) => {
                    const tituloTMDB = movie.title?.trim().toLowerCase();
                    const fecha = movie.release_date || "";

                    return (
                        tituloTMDB === tituloBuscado &&
                        fecha.startsWith(String(releaseYear))
                    );
                }) || resultados[0]
            );
        } catch (error) {
            console.error(
                    `Error TMDB búsqueda. Intento ${intento}/${maxIntentos}:`,
                    error.code,
                    error.message
                );
            if (intento === maxIntentos) {
                    throw constructorError("No se pudo consultar TMDB", 502);
            }

            //para que no haga dos intentos uno atras del otro
            await new Promise((resolve) => {
                setTimeout(resolve, 1000 * intento);
            });
        }
    }
};

export const obtenerPeliculaTMDB = async (tmdbId) => {
    const maxIntentos = 2;

    for (let intento = 1; intento <= maxIntentos; intento++) {
        try {
            const response = await apiExternas.get(
                `/movie/${tmdbId}`,
                {
                    params: {
                        language: "es-ES"
                    }
                }
            );

            return response.data;

        } catch (error) {
            console.error(
                `Error TMDB detalle. Intento ${intento}/${maxIntentos}:`,
                error.code,
                error.message
            );

            if (intento === maxIntentos) {
                throw constructorError( "No se pudo consultar TMDB", 502);
            }
        }
    }
};

export const obtenerPosterTMDB = (posterPath) => {
    if (!posterPath) {
        return null;
    }

    return `https://image.tmdb.org/t/p/w500${posterPath}`;
};