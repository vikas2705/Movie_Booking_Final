import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ROLES } from "../../constants/userRoles";
import "./signup.css";

const Signup = props => {
    const { onSignupSubmit, goToLogin, errorMessageSignup } = props;

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState(ROLES.CUSTOMER);

    const handleSubmit = e => {
        // 1. create the data  object
        // 2. call the onSignupSubmit with data
        // 3. e. prevent default to prevent submit

        const data = { userId, password, name: userName, email, userType };
        onSignupSubmit(data);
        e.preventDefault();
    };

    return (
        <div className='justify-content-center d-flex align-items-center vh-100'>
            <div className='bg-white auth-container p-5'>
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <input
                            type='text'
                            placeholder='Enter User Id'
                            value={userId}
                            className='form-control m-1'
                            onChange={e => {
                                setUserId(e.target.value);
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            className='form-control m-1'
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type='text'
                            placeholder='Enter user name'
                            value={userName}
                            className='form-control m-1'
                            onChange={e => {
                                setUserName(e.target.value);
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            className='form-control m-1'
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className='col d-flex justify-content-center align-items-center'>
                        <label>User Type: </label>
                        <DropdownButton
                            align='end'
                            title={userType}
                            id='userType'
                            className='form-control m-1'
                            onSelect={val => {
                                setUserType(val);
                            }}
                            variant='light'
                        >
                            <Dropdown.Item eventKey={ROLES.CUSTOMER}>
                                {ROLES.CUSTOMER}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey={ROLES.CLIENT}>
                                {ROLES.CLIENT}
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div>
                        <input
                            type='submit'
                            className='form-control m-1 btn btn-primary'
                            value='Create'
                        />
                    </div>
                    <div>
                        Already have an account?
                        <a href='#' onClick={goToLogin}>
                            Login!
                        </a>
                    </div>
                </form>
                <div className='error-msg text-danger m-1'>
                    {errorMessageSignup}
                </div>
            </div>
        </div>
    );
};

export default Signup;
