import React from "react";
import Seat from "../seat/Seat";
import "./seatGuide.css";

const SeatGuide = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className='bg-dark p-3 d-flex justify-content-between align-items-center seat-guide my-3'>
                <div className='d-flex align-items-center'>
                    <Seat seatStatus='available' />
                    <span>Available</span>
                </div>
                <div className='d-flex align-items-center'>
                    <Seat seatStatus='selected' />
                    <span>Selected</span>
                </div>
                <div className='d-flex align-items-center'>
                    <Seat seatStatus='occupied' />
                    <span>Occupied</span>
                </div>
            </div>
        </div>
    );
};

export default SeatGuide;
