import React from "react";
import { useNavigate } from "react-router-dom";
import Image403 from "../../assets/403.svg";

const Unauthorised403 = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <section className='bg-light d-flex justify-content-center align-items-center text-center vh-100'>
            <div>
                <h1>Unauthorised!</h1>
                <img src={Image403} alt='..' />
                <br />
                <br />
                <p>You are not authorised to view this page</p>

                <button className='btn btn-primary' onClick={goBack}>
                    Go Back
                </button>
            </div>
        </section>
    );
};

export default Unauthorised403;
