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

const SelectSeats = () => {
    const params = useParams();
    const { movieId, theatreId } = params;
    const [movieDetail, setMovieDetail] = useState({});
    const [theatreDetail, setTheatreDetail] = useState({});

    useEffect(() => {
        fetchMovieDetails(movieId);
        fetchTheatreDetails(theatreId);
    }, []);

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

            <div className='select-seats-main vh-100 p-5'>
                <h2>
                    {movieName}-{theatreName}
                </h2>
                <SeatGuide />
                <Screen />
                <Cinema />
            </div>

            <Footer />
        </div>
    );
};

export default SelectSeats;
