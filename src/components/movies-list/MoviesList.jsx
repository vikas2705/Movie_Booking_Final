import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
    getAllMovies,
    removeMovie,
    updateMovieDetails,
} from "../../api/movies";
import { Modal } from "react-bootstrap";
import moment from "moment";

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

    var formattedDate = moment(selectedMovie?.releaseDate).format("DD-MM-YYYY");
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

    return (
        <div className='m-5'>
            <MaterialTable
                data={moviesList}
                title='Movies List'
                columns={[
                    { title: "Movie name", field: "name" },
                    { title: "Release data", field: "releaseDate" },
                    { title: "Release  status", field: "releaseStatus" },
                    { title: "Director", field: "director" },
                    { title: "Description", field: "description" },
                ]}
                options={{
                    sorting: true,
                    actionsColumnIndex: -1,
                    filtering: true,
                    headerStyle: {
                        backgroundColor: "#202429",
                        color: "#fff",
                    },
                    rowStyle: {
                        backgroundColor: "#EEE",
                    },
                    exportMenu: [
                        {
                            label: "Export PDF",
                            exportFunc: (cols, datas) =>
                                ExportPdf(cols, datas, "Movies Records"),
                        },
                        {
                            label: "Export CSV",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, "Movies Records"),
                        },
                    ],
                }}
                actions={[
                    {
                        icon: Edit,
                        tooltip: "Edit Movie",
                        onClick: (event, rowData) => editMovie(rowData),
                    },
                    /*  {
                        icon: Delete,
                        tooltip: "Delete Movie",
                        onClick: (event, rowData) => deleteMovie(rowData),
                    }, */
                ]}
            />

            {showMovieEditModal && (
                <Modal
                    show={showMovieEditModal}
                    onHide={() => {
                        setErrorMessage("");
                        setShowMovieEditModal(false);
                    }}
                    backdrop='static'
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>EDIT MOVIE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h4>TheatreId: {selectedMovie._id}</h4>
                        </div>

                        <hr />

                        <form onSubmit={handleEditMovieSubmit}>
                            <div className='input-group'>
                                <label>
                                    Movie name:
                                    <input
                                        type='text'
                                        className='form-control m-1'
                                        name='name'
                                        value={selectedMovie.name}
                                        required
                                        onChange={handleMovieEdit}
                                    />
                                </label>
                            </div>

                            <div className='input-group'>
                                <label>
                                    Release date:
                                    <input
                                        type='text'
                                        required
                                        name='releaseDate'
                                        value={selectedMovie.releaseDate}
                                        onChange={handleMovieEdit}
                                        className='form-control m-1'
                                    />
                                </label>
                            </div>

                            <div className='input-group'>
                                <label>
                                    Release status:
                                    <input
                                        type='text'
                                        name='releaseStatus'
                                        required
                                        value={selectedMovie.releaseStatus}
                                        onChange={handleMovieEdit}
                                        className='form-control m-1'
                                    />
                                </label>
                            </div>

                            <div className='input-group'>
                                <label>
                                    Director:
                                    <input
                                        type='text'
                                        required
                                        name='director'
                                        value={selectedMovie.director}
                                        className='form-control m-1'
                                        onChange={handleMovieEdit}
                                    />
                                </label>
                            </div>

                            <div className='input-group'>
                                <label>
                                    Description:
                                    <input
                                        type='text'
                                        name='description'
                                        required
                                        className='form-control m-1'
                                        value={selectedMovie.description}
                                        onChange={handleMovieEdit}
                                    />
                                </label>
                            </div>

                            <div className='input-group'>
                                <button
                                    type='button'
                                    className='btn btn-secondary m-1'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='btn btn-primary m-1'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};
export default MoviesList;
