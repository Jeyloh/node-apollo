import React, { useRef, useEffect, useContext } from 'react';
import { AuthContext } from "../../App";
import { SIGN_UP } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

const Register = () => {
    const [signUp, { data }] = useMutation(SIGN_UP, { errorPolicy: 'ignore' });

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setAuthToken } = useContext(AuthContext)

    useEffect ( () => {
        data && setAuthToken(data.signUp);
    }, [data, setAuthToken])

    const handleSubmit = e => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(e);
        const formData = {
            password: password,
            email: email,
            username: username
        }
        console.log(formData)

        try {
            signUp({ variables: formData})
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="auth-box register-box">
            <h2>Register</h2>

            <form onSubmit={handleSubmit} autoComplete="off">
                <input name="username" placeholder="username" type="text" ref={usernameRef} />
                <input name="email" placeholder="email" type="text" ref={emailRef} />
                <input name="password" placeholder="password" type="password" ref={passwordRef} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;