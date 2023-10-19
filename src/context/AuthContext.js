import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser]=useState(null)

   const setUserData=(userData)=>{
        setUser(userData)
    }
    
    useEffect(() => {
        // You can check if the user is already authenticated here (e.g., from local storage).
        // If yes, set the token using setAuthTokens.
    }, []);

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setAuthTokens(data.token); 
                setUserData(data)
                console.log(user)
            } else {
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const registerUser = async (email,username, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password,email }),
            });

            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    };
    return (
        <AuthContext.Provider value={{ authTokens, loginUser,registerUser,user,setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
