import React from 'react';
import './LandingPage.css'
import WellnessVision from '../resources/WellnessVision_new_icon.png'
import { useToggle } from '../pages/HP/useToggle';
import Login from '../components/Login';

const LandingPage: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"> <img className='icon_landing_page' src={WellnessVision} alt="" />
                    <span className='wellnessVision_landing_page'>WellnessVision</span></a>
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <button  onClick={togglePopup} className="btn btn-outline-success me-2" id='login_landing_page' type="button">Log In</button>
                <a href='/NU_Register' className="btn btn-outline-success me-2" id='register_landing_page' type="button">Register</a>
                <Login show={showPopup} handleClose={togglePopup} />
            </nav>
        </div>
    );
};

export default LandingPage;
