import React from 'react';
import './FirstPage.css';
import Login from '../components/Login';
import Register from '../components/Register';

const FirstPage: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome</h1>
                <Register />
            </header>
        </div>
    );
};

export default FirstPage;
