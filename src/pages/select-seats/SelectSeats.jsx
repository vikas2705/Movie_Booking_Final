import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";
import { getTheaterById } from "../../api/theatres";
import Cinema from "../../components/cinema/Cinema";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Screen from "../../components/screen/Screen";
import SeatGuide from "../../components/seat-guide/SeatGuide";
import "./selectSeats.css";
import Payment from "../../components/payment/Payment";
import { createNewBooking, makePaymentForBooking } from "../../api/booking";
import { DEFAULT_OCCUPIED_SEATS, TICKET_PRICE } from "../../constants/config";

const SelectSeats = () => {
    const params = useParams();
    const { movieId, theatreId } = params;
    const [movieDetail, setMovieDetail] = useState({});
    const [theatreDetail, setTheatreDetail] = useState({});
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState(DEFAULT_OCCUPIED_SEATS);
    const [bookingDetail, setBookingDetail] = useState({});
    const [paymentDetail, setPaymentDetail] = useState({});
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    useEffect(() => {
        fetchMovieDetails(movieId);
        fetchTheatreDetails(theatreId);
    }, []);

    const handleConfirmPayment = async () => {
        const paymentData = {
            bookingId: bookingDetail._id,
            amount: TICKET_PRICE * selectedSeats.length,
        };

        const res = await makePaymentForBooking(paymentData);
        console.log(res);
        const { data, status } = res;
        if (status === 201) {
            setPaymentDetail(data);
            setPaymentSuccessful(true);
        }
    };

    const handlePostPayment = () => {
        /* after completing the payment
        1. close modal
        2. push the selected seats to occupied seats
        3. empty the selected seats
        4. set payment successful to false
        */
        setConfirmationModal(false);
        const tempOccupiedSeats = [...occupiedSeats];
        selectedSeats.forEach(seat => {
            tempOccupiedSeats.push(seat);
        });
        setOccupiedSeats(tempOccupiedSeats);
        setSelectedSeats([]);
        setPaymentSuccessful(false);
    };

    const createBooking = async () => {
        const bookingData = {
            theatreId,
            movieId,
            noOfSeats: selectedSeats.length,
            timing: new Date().toLocaleString(),
        };

        const res = await createNewBooking(bookingData);
        console.log(res);
        const { data, status } = res;
        if (status === 201) {
            setBookingDetail(data);
        }
        setConfirmationModal(true);
        setPaymentSuccessful(false);
        // api call to create  a new booking
        // show the booking modal
    };

    const fetchMovieDetails = movieId => {
        getMovieDetails(movieId)
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    console.log(data);
                    setMovieDetail(data);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const fetchTheatreDetails = theatreId => {
        getTheaterById(theatreId)
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    console.log(data);
                    setTheatreDetail(data);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const { name: movieName } = movieDetail;
    const { name: theatreName } = theatreDetail;

    return (
        <div>
            <Header />

            <div className='select-seats-main p-5'>
                <h2>
                    {movieName}-{theatreName}
                </h2>
                <SeatGuide />
                <Screen />
                <Cinema
                    createBooking={createBooking}
                    setSelectedSeats={setSelectedSeats}
                    selectedSeats={selectedSeats}
                    occupiedSeats={occupiedSeats}
                />

                <Payment
                    confirmationModal={confirmationModal}
                    setConfirmationModal={setConfirmationModal}
                    selectedSeats={selectedSeats}
                    movieName={movieName}
                    theatreName={theatreName}
                    handleConfirmPayment={handleConfirmPayment}
                    paymentSuccessful={paymentSuccessful}
                    setPaymentSuccessful={setPaymentSuccessful}
                    handlePostPayment={handlePostPayment}
                />
            </div>

            <Footer />
        </div>
    );
};

export default SelectSeats;
