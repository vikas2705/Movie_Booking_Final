import React from "react";

const SelectedSeats = props => {
    const { selectedSeatsCount, price } = props;

    return (
        selectedSeatsCount > 0 && (
            <div className='bg-dark p-4 text-light my-5'>
                <span>
                    You have selected
                    <span className='text-info'>
                        {" "}
                        {selectedSeatsCount}{" "}
                    </span>{" "}
                    seats. Total amount is Rs.
                    <span className='text-info'>
                        {" "}
                        {price * selectedSeatsCount}.
                    </span>
                </span>
            </div>
        )
    );
};

export default SelectedSeats;
