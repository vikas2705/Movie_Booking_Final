import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllMovies = async () => {
    const url = `${BASE_URL}/mba/api/v1/movies`;
    return await axios.get(url);
};

export const getMovieDetails = async movieId => {
    const url = `${BASE_URL}/mba/api/v1/movies/${movieId}`;
    return await axios.get(url);
};

export const updateMovieDetails = async (movieId, movie) => {
    const url = `${BASE_URL}/mba/api/v1/movies/${movieId}`;
    return await axios.put(url, movie, {
        headers: {
            "x-access-token": localStorage.getItem("accessToken"),
        },
    });
};

export const removeMovie = async movieId => {
    const url = `${BASE_URL}/mba/api/v1/movies/${movieId}`;
    return await axios.delete(url, {
        headers: {
            "x-access-token": localStorage.getItem("accessToken"),
        },
    });
};
