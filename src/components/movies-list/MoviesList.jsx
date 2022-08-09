import React, { useEffect, useState } from "react";
import {
    getAllMovies,
    removeMovie,
    updateMovieDetails,
} from "../../api/movies";
import { Modal } from "react-bootstrap";

const MoviesList = () => {
    const [moviesList, setMoviesList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [showMovieEditModal, setShowMovieEditModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        getAllMovies()
            .then(res => {
                const { status, data, message } = res;
                if (status === 200) {
                    console.log({ movies: data });
                    setMoviesList(data);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
        /**
         * 1. api call to fetch list of movies
         * 2. if successful show, list of movies
         *
         */
    };

    var formattedDate = selectedMovie?.releaseDate;
    console.log({ formattedDate });

    const editMovie = rowData => {
        setSelectedMovie({ ...rowData });
        setShowMovieEditModal(true);
    };

    const handleEditMovieSubmit = e => {
        updateMovieDetails(selectedMovie._id, selectedMovie)
            .then(res => {
                const { data, status } = res;

                if (status === 200) {
                    setErrorMessage("");
                    setSelectedMovie({});
                    fetchMovies();
                    setShowMovieEditModal(false);
                }
            })
            .catch(err => {
                setErrorMessage(err.message);
            });
        e.preventDefault();
    };

    const handleMovieEdit = e => {
        const tempMovie = { ...selectedMovie };

        if (e.target.name === "name") {
            tempMovie.name = e.target.value;
        } else if (e.target.name === "releaseDate") {
            tempMovie.releaseDate = e.target.value;
        } else if (e.target.name === "releaseStatus") {
            tempMovie.releaseStatus = e.target.value;
        } else if (e.target.name === "director") {
            tempMovie.director = e.target.value;
        } else if (e.target.name === "description") {
            tempMovie.description = e.target.value;
        }

        setSelectedMovie(tempMovie);
    };

    const deleteMovie = rowData => {
        console.log(rowData);
        const movieId = rowData._id;

        removeMovie(movieId)
            .then(res => {
                console.log(res);

                if (res.status === 200) {
                    fetchMovies();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return null;
};
export default MoviesList;
