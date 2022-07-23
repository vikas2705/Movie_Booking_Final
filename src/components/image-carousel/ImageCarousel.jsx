import React from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";

const ImageCarousel = props => {
    const { images } = props;

    return (
        <div className='shadow-lg'>
            <CCarousel controls indicators>
                {images.map((image, index) => {
                    return (
                        <CCarouselItem>
                            <CImage
                                className='d-block w-100'
                                src={image}
                                alt={`slide ${index + 1}`}
                            />
                        </CCarouselItem>
                    );
                })}
            </CCarousel>
        </div>
    );
};

export default ImageCarousel;
