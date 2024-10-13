import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import worning_image from '../resources/worning_error.png'

interface LoginData {
    id: number;
    user_type: string;
    email: string;
}

interface LoginProps {
    show: boolean;
    handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({ show, handleClose }) => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorState, setErrorState] = useState<Boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get<LoginData>(`http://localhost:15000/login`, {
                params: { email: email, password: password }
            });
            const loginData = response.data;
            if (loginData.user_type === "HP") {
                localStorage.setItem('hpId', String(loginData.id));
                navigate('/HP_Dashboard');
            }
            else if(loginData.user_type === "NU"){
                localStorage.setItem('userId', String(loginData.id));
                navigate('/NU_Dashboard');
            }
            else if(loginData.user_type === "SA"){
                localStorage.setItem('adminId', String(loginData.id));
                navigate('/Admin_Dashboard');
            }
            else if(loginData.user_type === "V"){
                localStorage.setItem('volunteerId', String(loginData.id));
                navigate('/volunteer_Dashboard');
            }
            else {
                alert(loginData.user_type);
            }
        } catch (err) {
            if (err instanceof Error) {
                setErrorState(true);
                setError("Invalide Email or Password");
            } else {
                setError('An unknown error occurred');
                alert('An unknown error occurred');
            }
        }
    };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner login_popup">
                <span className='welcome_login'>Welcome to WellnessVision</span>
            <button className="btn btn-danger close-btn_login" onClick={() => {handleClose()}}>
                    <i className="bi bi-x-lg closeAddEvent"></i>
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <div className={`${errorState ? 'alert alert-danger login_error_div_login_show' : 'login_error_div_login_hide'}`} role="alert">
                        <img  className='worning_error_image_login' src={worning_image} alt="" />
                       <span className='worning_error_message_login'>{error}</span>
                       </div>
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
