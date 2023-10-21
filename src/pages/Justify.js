import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const JustifyTextComponent = () => {
    const [inputText, setInputText] = useState('');
    const [justifiedText, setJustifiedText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useContext(AuthContext)
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const url1='https://sabermehdi.pythonanywhere.com/justify'
    const url2='http://127.0.0.1:8000/justify/'
    
    const handleJustifyText = () => {
        
        fetch(url1, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': 'token ' + user.token, 
            },
            body: JSON.stringify({ text: String(inputText) }),
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
                console.log(JSON.parse(data.justified_text).text)
                setJustifiedText(JSON.parse(data.justified_text).text);
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
                style={{ height: '50vh', width: '80vw' }} 

            />
            <br/>
            <button onClick={handleJustifyText}>Justify Text</button>
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                {justifiedText && (
                    <div>
                        <h3>Justified Text:</h3>
                        <textarea
                            rows="10"
                            cols="40"
                            value={justifiedText}
                            readOnly
                            style={{ height: '50vh', width: '80vw' }} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JustifyTextComponent;
