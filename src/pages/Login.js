import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(username, password);
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
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
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
