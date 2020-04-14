import React, {useRef} from 'react';
import { SIGN_IN } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from "../../App";

const Login = () => {
    const [signIn, { data, error }] = useMutation(SIGN_IN, { errorPolicy: 'ignore' });
    const { setAuthToken } = React.useContext(AuthContext)
    const usernameRef = useRef();
    const passwordRef = useRef();

    
    React.useEffect ( () => {
        data && setAuthToken(data.signIn);
    }, [data, setAuthToken])


    const handleSubmit = e => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log(e);
        const formData = {
            password: password,
            username: username
        }
        console.log(formData)
        try {
            signIn({ variables: formData})
        } catch (err) {
            console.error(err);
        }

    }

    if (error) {
        return <div>error</div>
    }

    return (
        <div className="auth-box login-box">
            <h2>Log in</h2>

            <form onSubmit={handleSubmit} autoComplete="off">
            <p>BeeBop|WhatIsLif3</p>

                <input name="username" placeholder="username/email" type="text" ref={usernameRef} />
                <input name="password" placeholder="password" type="password" ref={passwordRef} />
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login;