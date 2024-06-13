import React from 'react';
import './FirstPage.css';
import Login from '../components/Login';

const login: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome</h1>
                <Login />
            </header>
        </div>
    );
};

export default login