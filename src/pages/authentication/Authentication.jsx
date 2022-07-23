import React, { useState } from "react";
import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import "./authentication.css";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    const [errorMessageSignup, setErrorMessageSignup] = useState("");

    const navigate = useNavigate();

    const goToSignup = () => {
        setShowSignup(true);
    };
    const goToLogin = () => {
        setShowSignup(false);
    };

    const handleLoginSubmit = data => {
        console.log(data);

        // 1. make an api call and post the data
        // 2. if api call is successful, redirect to concerned user
        // 3.if api call is failure, show a message to user
        navigate("/customer");

        // if login is failure
        // dont redirect to next page
        setErrorMessageLogin("Some error occured");
    };
    const handleSignupSubmit = data => {
        console.log(data);

        // 1. make an api call and post the data to signup
        // 2. if api call is successful, redirect to login page
        // 3. show a message to user that login is successful

        // if submit is successful
        setShowSignup(false);
        setLoginMessage("Sign up Successful!! Please login");

        // if submit is failure
        // dont call setignup(false)
        setErrorMessageSignup("Some error occured");
    };

    return (
        <div className='main'>
            {showSignup ? (
                <Signup
                    onSignupSubmit={handleSignupSubmit}
                    goToLogin={goToLogin}
                    errorMessageSignup={errorMessageSignup}
                />
            ) : (
                <Login
                    onLoginSubmit={handleLoginSubmit}
                    goToSignup={goToSignup}
                    loginMessage={loginMessage}
                    errorMessageLogin={errorMessageLogin}
                />
            )}
        </div>
    );
};

export default Authentication;
