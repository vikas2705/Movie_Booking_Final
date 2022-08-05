import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./SelectTheatre.css";
import { getMovieDetails } from "../../api/movies";
import { getAllTheatres } from "../../api/theatres";
import { getTheatresForCurrentMovie } from "../../utils/getTheatres";

const SelectTheatre = () => {
    const params = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const [currentMovieTheatres, setCurrentMovieTheatres] = useState([]);
    const { movieName, movieId } = params;

    useEffect(() => {
        //componentDidMount
        fetchMovieDetail(movieId);
        fetchAllTheatres();
    }, []);

    const fetchMovieDetail = movieId => {
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

    const fetchAllTheatres = () => {
        getAllTheatres().then(res => {
            const { data, status } = res;
            if (status === 200) {
                console.log(data);
                // call a function which will filter out theatres for current movie
                // out of all theatres
                const filteredTheatres = getTheatresForCurrentMovie(
                    data,
                    movieId
                );
                setCurrentMovieTheatres(filteredTheatres);
            }
        });
    };

    // give default empty string values to variables if they are undefined
    const {
        trailerUrl = "",
        posterUrl = "",
        name = "",
        description = "",
        director = "",
        releaseDate = "",
        casts = [],
        _id = "",
        releaseStatus,
        language,
    } = movieDetail;

    return (
        <div>
            <Header />
            <div className='select-main p-5'>
                <h2>{movieName}</h2>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='movie-tag desc'>{description}</div>
                    <div className='movie-tag language'>{language}</div>
                    <div className='movie-tag releaseStatus'>
                        {releaseStatus}
                    </div>
                </div>
                <hr />
                <div className='text-grey'>
                    <h5>Director: {director}</h5>
                    <h5>Release Date: {releaseDate}</h5>
                </div>
            </div>

            <div className='theatre-detail bg-light p-5'>
                <h2>Select Theatre</h2>

                <div className='theatre-list my-5 container'>
                    {currentMovieTheatres.map(theatre => {
                        const { name, _id } = theatre;

                        return (
                            <Link
                                to={`/select-seats/${movieId}/${_id}`}
                                className='theatre-item row p-4'
                            >
                                <h4 className='col-sm-4'>{name}</h4>
                                <h4 className='text-danger col-sm-4'>
                                    <i className='bi bi-phone-fill text-danger'></i>
                                    m-Ticket
                                </h4>
                                <h4 className='text-success col-sm-4'>
                                    Food & Beverages
                                </h4>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SelectTheatre;
