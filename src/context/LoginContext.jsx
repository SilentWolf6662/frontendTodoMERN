import { createContext, useEffect, useState } from "react";

import { useRequestData } from "../hooks/useRequestData";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const { makeRequest, isLoading, data, error, errorMessage } = useRequestData()
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    const signIn = (identity, password) => {
        /* const formData = new FormData();
        formData.append('identity', identity);
        formData.append('password', password); */
        setUser('SilentWolf');
        setToken('1234567890')

        //makeRequest('collections/users/auth-with-password', 'POST', null, null, formData);
    }

    const signOut = () => {
        setUser();
        setToken();
    }

    /* useEffect(() => {
        if (data && data.token) {
            setUser(data.username);
            setToken(data.token);
        } else {
            signOut();
        }
    }, [data]) */

    return (
        <LoginContext.Provider value={{ signIn: signIn, signOut: signOut, user: user, token: token }}>
            {props.children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;