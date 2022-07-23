import axios from "axios";

const BASE_URL = "https://relevel-movie-booking-app-be.herokuapp.com/";

export const getAllMovies = async () => {
    const postUrl = `${BASE_URL}/mba/api/v1/movies`;
    return await axios.get(postUrl);
};
