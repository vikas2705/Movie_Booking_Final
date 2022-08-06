import { SEAT_ROWS, SEAT_COLS } from "../constants/config";

export const getSeatNumber = (rowIndex, colIndex) => {
    return rowIndex * SEAT_ROWS + colIndex + 1;
};

export const getTheatre2DRepresentation = (
    selectedSeats = [],
    occupiedSeats = []
) => {
    const seats = [];

    for (let row = 0; row < SEAT_ROWS; row++) {
        const rowArr = [];

        for (let col = 0; col < SEAT_COLS; col++) {
            const seatNo = getSeatNumber(row, col);

            if (occupiedSeats.includes(seatNo)) {
                rowArr.push("occupied");
            } else if (selectedSeats.includes(seatNo)) {
                rowArr.push("selected");
            } else {
                rowArr.push("available");
            }

            // [available, available, available, available, available, available, available, available]
        }

        seats.push(rowArr);
    }

    return seats;
};

// seat no 5
// rowIndex = 0
// colIndex = 4

//seat no 19
// rowIndex -- 19/8 , quotient -- 2,  rmainder - 3 ---
// rowIndex == 2
// colIndex = 2

//seat no 20
// rowIndex -- 2
// colIndex -- 3

// seat 47
//   rowIndex - 5
// colIndex - 6
//(5 * 8) + 6 + 1

// rowIndex * ROWS_COUNT + (colIndex + 1) == SeatNo
/*
        [
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
            [available, available, available, available, available, available, available, available]
        ]
        */

/*

["selected", X, X, X, "occupied", X, X, X]

[X, X, X, "selected", X, X, X, X]

[X, X, "occupied", "occupied", X, X, X, X]

[X, X, X, X, X, X, X, X]

[X, X, X, X, X, X, "selected", X]

[X, X, "occupied", X, X, X, X, X]

[X, X, X, X, X, X, X, X]

[X, X, X, X, X, X, X, X]


available-- - available

"selected"

"occupied"

*/
