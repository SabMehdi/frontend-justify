import { createContext, useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null)
    const url1="https://sabermehdi.pythonanywhere.com"
    const url2="http://127.0.0.1:8000"
    const setUserData = (userData) => {
        setUser(userData)
    }

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('authTokens')
        if (storedData) {
            const data = JSON.parse(storedData)
            setAuthTokens(data.authTokens)
            setUser(data)
        //    console.log("authcontext: "+ data.email)
        }
    }, []);

    const loginUser = async (email, password) => {
        try {
            const response = await fetch(url1+"/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthTokens(data.token);
                setUserData(data)
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/justify')
            } else {
            }
        } catch (error) {
            alert("Login error:", error);
        }
    };

    const registerUser = async (email, username, password) => {
        try {
            const response = await fetch(url1+"/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email }),
            });

            if (response.ok) {
                const data = await response.json()
                setAuthTokens(data.token);
                setUserData(data)
                localStorage.setItem('authTokens', JSON.stringify(data))
                alert("Registration successful!")
                navigate('/')
            } else {
                
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    };

    const logOut=() => {
        setAuthTokens(null);
        setUserData(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    return (
        <AuthContext.Provider value={{ authTokens, loginUser, registerUser, user, setUserData,logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
