import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";
import ReactPlayer from "react-player";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./movieDetail.css";

const MovieDetail = () => {
    const params = useParams();
    const [movieDetail, setMovieDetail] = useState({});

    const { movieId } = params;

    useEffect(() => {
        fetchMovieDetail(movieId);
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

    return (
        <div className='movie-detail bg-light'>
            <Header />

            <div className='video-player d-flex justify-content-center'>
                <ReactPlayer
                    url={"https://youtu.be/BUjXzrgntcY"}
                    controls
                    className='videop'
                    width='70%'
                    height='450px'
                />
            </div>
            <div className='container movie-data m-5'>
                <div className='row'>
                    <div className='col'>
                        <img
                            src='https://images.news18.com/ibnlive/uploads/2022/06/anuritta-jha-1.jpg'
                            className='movie-poster'
                            alt='movie poster'
                            width='50%'
                        />
                    </div>
                    <div className='col'>
                        <h2>Bramhastra</h2>

                        <h4>lorem ipsum random text </h4>

                        <h5>Release Date: 25th July, 2022</h5>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MovieDetail;
