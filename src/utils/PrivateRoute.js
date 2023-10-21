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
            setUser(data);
        }
        else{
            navigate("/login")
        }
    }, []);


    if (user === null) {
       
        return (<div>chargement...</div>); 
    }

    return children;
}