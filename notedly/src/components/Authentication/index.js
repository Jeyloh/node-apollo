import React from 'react';
import './auth.css'
import Login from './Login';
import Register from './Register';

export default () => {

    return (
        <div className="auth-container">
            <Login />
            <Register />
        </div>
    )
}
