import {  useNavigate } from 'react-router-dom';

import {  useEffect, useState } from 'react';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const [user, setUser] = useState(null);
    const navigate=useNavigate()
    useEffect(() => {
        const storedData = localStorage.getItem('authTokens');
        if (storedData!==null) {
            const data = JSON.parse(storedData);
            console.log("stored:", storedData)
            setUser(data);
            console.log("Data from local storage:", data);
        }
        else{
            navigate("/login")
        }
    }, []);

    console.log("User in PrivateRoute (before return):", user);

    if (user === null) {
       
        return (<div>chargement...</div>); 
    }

    console.log("User in PrivateRoute (after return):", user);
    return children;
}