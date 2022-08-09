import React, { useEffect, useState } from "react";
import { getAllTheatres, updateTheatre } from "../../api/theatres";
import TheatresEditModal from "../theatres-edit-modal/TheatresEditModal";

const TheatresList = () => {
    const [theatresList, setTheatresList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // api call to fetch theatres list
        // on success of data, set it to state -- setTheatresList
        fetchTheatres();
    }, []);

    const fetchTheatres = () => {
        getAllTheatres()
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    console.log(data);
                    setTheatresList(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteTheatre = rowData => {
        const theatreId = rowData._id;
        const theatresListUpdated = theatresList.filter(theatre => {
            const { _id } = theatre;
            return _id !== theatreId;
        });
        setTheatresList(theatresListUpdated);
    };

    const editTheatre = rowData => {
        setSelectedTheatre({ ...rowData });
        setShowEditModal(true);
    };

    const handleTicketsChange = e => {
        const tempTheatre = { ...selectedTheatre };

        if (e.target.name === "name") {
            tempTheatre.name = e.target.value;
        } else if (e.target.name === "city") {
            tempTheatre.city = e.target.value;
        } else if (e.target.name === "description") {
            tempTheatre.description = e.target.value;
        } else if (e.target.name === "pinCode") {
            tempTheatre.pinCode = e.target.value;
        }

        setSelectedTheatre(tempTheatre);
    };

    const handleEditTheatreSubmit = e => {
        const id = selectedTheatre._id;

        try {
            updateTheatre(id, selectedTheatre)
                .then(res => {
                    const { message, status } = res;
                    if (status === 200) {
                        setSelectedTheatre({});
                        setErrorMessage("");
                        setShowEditModal(false);
                        fetchTheatres();
                    } else if (message) {
                        setErrorMessage(message);
                    }
                })
                .catch(err => {
                    setErrorMessage(err.message);
                });
        } catch (err) {
            setErrorMessage(err.message);
        }

        // api call to save the theatre data
        // send the id and the theatre data

        // on success of save, i will close the modal
        // and i will fetch the theatre list again

        // empty the selected theatre

        // on error, i will show the error

        e.preventDefault();
    };

    // return a Material table with all the data in the list theatresList
    return (
        <div className='m-5'>
            {showEditModal && (
                <TheatresEditModal
                    selectedTheatre={selectedTheatre}
                    setErrorMessage={setErrorMessage}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    handleEditTheatreSubmit={handleEditTheatreSubmit}
                    handleTicketsChange={handleTicketsChange}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    );
};

export default TheatresList;
