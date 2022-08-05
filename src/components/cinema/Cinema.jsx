import React, { useState } from "react";
import { getTheatre2DRepresentation } from "../../utils/makeTheatre";
import Seat from "../seat/Seat";
import "./cinema.css";

const Cinema = () => {
    const [cinemaState, setCinemaState] = useState(
        getTheatre2DRepresentation()
    );

    const handleSelectSeat = (rowIndex, colIndex) => {
        const currentStatus = cinemaState[rowIndex][colIndex];
        let finalStatus = "";

        if (currentStatus === "available") {
            finalStatus = "selected";
        } else if (currentStatus === "selected") {
            finalStatus = "available";
        } else {
            finalStatus = "occupied";
        }

        const tempState = [...cinemaState];
        tempState[rowIndex][colIndex] = finalStatus;
        setCinemaState(tempState);
    };

    return (
        <div className='my-5'>
            {cinemaState.map((cinemaRow, rowIndex) => {
                return (
                    <div className='cinema-main  d-flex justify-content-center'>
                        <div className='cinema-row row'>
                            {cinemaRow.map((cinemaCol, colIndex) => {
                                const classNm =
                                    colIndex === 2 || colIndex === 6
                                        ? "col-sm-1 offset-sm-2"
                                        : "col-sm-1";

                                return (
                                    <div
                                        className={classNm}
                                        onClick={() => {
                                            handleSelectSeat(
                                                rowIndex,
                                                colIndex
                                            );
                                        }}
                                    >
                                        <Seat seatStatus={cinemaCol} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cinema;
