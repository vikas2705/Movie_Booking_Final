import React from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";
import "./header.css";

const Header = () => {
    const navigate = useNavigate();

    const logoutFn = () => {
        localStorage.clear();
        navigate("/login?referrer=home");
    };

    const loginFn = () => {
        navigate("/login");
    };

    const isUserLoggedIn = localStorage.getItem("accessToken");

    return (
        <div className='bg-dark p-4 d-flex justify-content-between'>
            <div>
                <a
                    className='display-6 text-danger py-1 remove-underline'
                    href='#'
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    MY TICKET
                </a>
            </div>

            {isUserLoggedIn ? (
                <CButton
                    type='submit'
                    color='danger'
                    className='px-3'
                    onClick={logoutFn}
                >
                    Logout
                </CButton>
            ) : (
                <CButton
                    type='submit'
                    color='danger'
                    className='px-3'
                    onClick={loginFn}
                >
                    Login
                </CButton>
            )}
        </div>
    );
};
export default Header;
