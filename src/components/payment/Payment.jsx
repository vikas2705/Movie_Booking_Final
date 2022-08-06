import React from "react";
import { Modal } from "react-bootstrap";

import { TICKET_PRICE } from "../../constants/config";

const Payment = props => {
    const {
        confirmationModal,
        setConfirmationModal = () => {},
        selectedSeats = [],
        movieName,
        theatreName,
        handleConfirmTransaction = () => {},
    } = props;

    return (
        <div>
            {confirmationModal && (
                <Modal
                    show={confirmationModal}
                    onHide={() => {
                        setConfirmationModal(false);
                    }}
                    backdrop='static'
                    keyboard={false}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>
                            <div className='p-2'>
                                Please confirm your booking details
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className='row p-2'>
                            <div className='col-sm-4'>Movie Name: </div>
                            <div className='col-sm-8'>{movieName}</div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-sm-4'>Theatre Name: </div>
                            <div className='col-sm-8'>{theatreName}</div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-sm-4'>Selected Seats: </div>
                            <div className='col-sm-8'>
                                {selectedSeats.join(",")} (
                                {selectedSeats.length} seats)
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-sm-4'>Total Price: </div>
                            <div className='col-sm-8'>
                                {TICKET_PRICE * selectedSeats.length}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className='btn btn-secondary'
                            onClick={() => {
                                setConfirmationModal(false);
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className='btn btn-danger'
                            onClick={handleConfirmTransaction}
                        >
                            Confirm
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Payment;
