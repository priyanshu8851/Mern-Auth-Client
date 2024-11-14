import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState("")
    const [isLoading, setIsloading] = useState(true)

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        localStorage.setItem('token', serverToken);
    };
    
    
    const isToken = !token
    
    
    const Logoutuser = () => {
        setToken("")
        setUser("")
        return localStorage.removeItem("token")
    }


    const userAuth = async () => {
        try {
            setIsloading(true)
            const res = await fetch(`http://localhost:3001/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            const data = await res.json()
            if (res.ok) {
                setUser(data)
                console.log(data)
                setIsloading(false)
            }else{
                setIsloading(false)
            }
        } catch (error) {

            console.log(error)
        }
    }

    // authentication
    useEffect(() => {
        userAuth()
        console.log("hello")
    }, [])

    const authContextValue = {
        storeTokenInLS,
        Logoutuser,
        isToken,
        user,
        userAuth,
        token,
        setUser,
        isLoading
    };


    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};