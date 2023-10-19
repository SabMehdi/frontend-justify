import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Signup = () => {
    const { registerUser, successMessage, errorMessage } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            registerUser(email, username, password);
        } else {
            alert("Passwords do not match. Please try again.");
        }
    };

    return (
        <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Signup;
