import React, { useState, useEffect } from 'react'

 

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (username: string, password: string) => {}
});

export const AuthContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storeUser = localStorage.getItem('isLoggedIn');

        if(storeUser === '1'){
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.getItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }
            }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
