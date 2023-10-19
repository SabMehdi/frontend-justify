import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const JustifyTextComponent = () => {
    const [inputText, setInputText] = useState('');
    const [justifiedText, setJustifiedText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {user}=useContext(AuthContext)
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleJustifyText = () => {
        // Make an HTTP POST request to the Django backend
        console.log(user.token)
        fetch('http://127.0.0.1:8000/justify/', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization':'token '+ user.token, // Replace with your actual authentication token
            },
            body: JSON.stringify({ text: inputText }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 402) {
                    throw new Error('Payment Required');
                } else {
                    throw new Error('Server Error');
                }
            })
            .then((data) => {
                setJustifiedText(data.justified_text);
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setJustifiedText('');
            });
    };

    return (
        <div>
            <h2>Text Justification</h2>
            <textarea
                rows="10"
                cols="40"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text to justify"
            />
            <button onClick={handleJustifyText}>Justify Text</button>
            {errorMessage && <p>{errorMessage}</p>}
            {justifiedText && (
                <div>
                    <h3>Justified Text:</h3>
                    <p>{justifiedText}</p>
                </div>
            )}
        </div>
    );
};

export default JustifyTextComponent;
