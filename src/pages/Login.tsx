import React, { useState } from 'react';
import './FirstPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginData {
    id: number;
    user_type: string;
    email: string;
}

const login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const fetchEvent = async () => {
        try {
            const response = await axios.get<LoginData>(`http://localhost:15000/login`, {
                params: { email: email, password: password }
            });
            const loginData = response.data;
            if (loginData.user_type === "HP") {
                navigate('/HP_ViewEvents');
            } else {
                alert(loginData.user_type);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={fetchEvent}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default login;
