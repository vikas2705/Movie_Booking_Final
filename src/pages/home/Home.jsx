import React from "react";
import Header from "../../components/header/Header";
import img1 from "../../assets/1.avif";
import img2 from "../../assets/2.avif";
import img3 from "../../assets/3.avif";
import img4 from "../../assets/4.avif";
import ImageCarousel from "../../components/image-carousel/ImageCarousel";

const Home = () => {
    return (
        <div>
            <Header />

            <ImageCarousel images={[img1, img2, img3, img4]} />

            <h1>Welcome to Home page</h1>
        </div>
    );
};
export default Home;
