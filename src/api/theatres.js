import axios from "axios";
import { AxiosInstance } from "../utils/AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllTheatres = async () => {
    const getUrl = `${BASE_URL}/mba/api/v1/theatres`;
    return await axios.get(getUrl);
};

export const updateTheatre = async (theatreId, theatreData) => {
    const postUrl = `${BASE_URL}/mba/api/v1/theatres/${theatreId}`;
    return await axios.put(postUrl, theatreData, {
        headers: {
            "x-access-token": localStorage.getItem("accessToken"),
        },
    });
};

export const getTheaterById = async cinemaId => {
    const URL = `/mba/api/v1/theatres/${cinemaId}`;

    try {
        return await AxiosInstance.get(URL);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
