import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

    const logoutFn = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <h1>This is Admin page</h1>

            <button className='btn btn-primary' onClick={logoutFn}>
                Logout
            </button>
        </div>
    );
};
export default Admin;
