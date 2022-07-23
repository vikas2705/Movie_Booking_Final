import axios from "axios";

const BASE_URL = "https://relevel-movie-booking-app-be.herokuapp.com/";

// login
export const userSignin = async data => {
    const postUrl = `${BASE_URL}/mba/api/v1/auth/signin`;
    return await axios.post(postUrl, data);
};

// signup
export const newUserSignup = async data => {
    const postUrl = `${BASE_URL}/mba/api/v1/auth/signup`;
    return await axios.post(postUrl, data);
};
