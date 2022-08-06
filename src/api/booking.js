import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// create new booking
export const createNewBooking = async bookingData => {
    const postUrl = `${BASE_URL}/mba/api/v1/bookings`;
    try {
        const response = await axios.post(postUrl, bookingData, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// make Payment API
export const makePaymentForBooking = async paymentData => {
    const postUrl = `${BASE_URL}/mba/api/v1/payments`;
    try {
        const response = await axios.post(postUrl, paymentData, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
