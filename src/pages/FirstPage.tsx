import React, { useState } from 'react';
import './FirstPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginData {
    id: number;
    user_type: string;
    email: string;
}

const FirstPage: React.FC = () => {
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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
      </ul>
    </div>
  </div>
  <button className="btn btn-outline-success me-2" type="button">Main button</button>
    <button className="btn btn-sm btn-outline-secondary" type="button">Smaller button</button>
</nav>
        </div>
    );
};

export default FirstPage;
