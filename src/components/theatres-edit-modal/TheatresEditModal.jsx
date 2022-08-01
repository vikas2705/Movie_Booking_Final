import React from "react";
import { Modal } from "react-bootstrap";

const TheatresEditModal = props => {
    const {
        selectedTheatre,
        setErrorMessage,
        showEditModal,
        setShowEditModal,
        handleEditTheatreSubmit,
        handleTicketsChange,
        errorMessage,
    } = props;

    return (
        <Modal
            show={showEditModal}
            onHide={() => {
                setErrorMessage("");
                setShowEditModal(false);
            }}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>EDIT THEATRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h4>TheatreId: {selectedTheatre._id}</h4>
                </div>

                <hr />

                <form onSubmit={handleEditTheatreSubmit}>
                    <div className='input-group'>
                        <label>
                            Theatre Name:
                            <input
                                type='text'
                                value={selectedTheatre.name}
                                name='name'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Theatre City:
                            <input
                                type='text'
                                value={selectedTheatre.city}
                                name='city'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Theatre Pincode:
                            <input
                                type='text'
                                value={selectedTheatre.pinCode}
                                name='pinCode'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Theatre Description:
                            <textarea
                                name='description'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            >
                                {selectedTheatre.description}
                            </textarea>
                        </label>
                    </div>

                    <div className='input-group'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={() => {
                                setErrorMessage("");
                                setShowEditModal(false);
                            }}
                        >
                            Cancel
                        </button>

                        <button type='submit' className='btn btn-primary'>
                            Update
                        </button>
                    </div>
                </form>

                {errorMessage && (
                    <div className='text-danger'>{errorMessage}</div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TheatresEditModal;
