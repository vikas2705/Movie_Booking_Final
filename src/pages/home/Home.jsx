import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import img1 from "../../assets/1.avif";
import img2 from "../../assets/2.avif";
import img3 from "../../assets/3.avif";
import img4 from "../../assets/4.avif";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";
import Footer from "../../components/footer/Footer.jsx";
import "./home.css";
import { getAllMovies } from "../../api/movies";
import Loader from "../../components/loader/Loader.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [allmovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAllMovies()
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    setMovies(data);
                    setAllMovies(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false);
            });
    }, []);

    const filterMoviesBySearch = searchText => {
        const filteredMovies = allmovies.filter(movie => {
            return movie.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setMovies(filteredMovies);
    };

    const handleGotoDetailPage = movieId => {
        navigate(`/movie-detail/${movieId}`);
    };

    return (
        <div>
            <Header
                filterMoviesBySearch={filterMoviesBySearch}
                showSearch={true}
            />

            <ImageCarousel images={[img1, img2, img3, img4]} />

            <div className='container main-section'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className='row  '>
                        {movies.map(movie => {
                            return (
                                <div
                                    className='col-lg-3 col-md-4 col-sm-6 movie-tile bg-dark text-light'
                                    onClick={() => {
                                        handleGotoDetailPage(movie._id);
                                    }}
                                >
                                    <img
                                        src={movie.posterUrl}
                                        alt='poster'
                                        className='image-tile'
                                    />
                                    <h3>{movie.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};
export default Home;
