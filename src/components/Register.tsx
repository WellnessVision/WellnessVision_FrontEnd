import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
    const params = useParams()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const user_type = params.user_type;

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:15000/register', {
                user_type,
                email,
                password
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
