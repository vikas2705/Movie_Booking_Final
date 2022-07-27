import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";
import "./header.css";

const Header = props => {
    const { filterMoviesBySearch, showSearch } = props;
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const logoutFn = () => {
        localStorage.clear();
        navigate("/login?referrer=home");
    };

    const loginFn = () => {
        navigate("/login");
    };
    const searchFn = e => {
        console.log(searchText);
        e.preventDefault();
        filterMoviesBySearch(searchText);
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

            {showSearch && (
                <form className='d-flex' onSubmit={searchFn}>
                    <input
                        type='text'
                        className='custom-input'
                        value={searchText}
                        onChange={e => {
                            setSearchText(e.target.value);
                        }}
                        placeholder={"Enter movie name"}
                    />
                    <CButton
                        type='submit'
                        color='danger'
                        className='px-3 searchBtn'
                    >
                        Search
                    </CButton>
                </form>
            )}

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
