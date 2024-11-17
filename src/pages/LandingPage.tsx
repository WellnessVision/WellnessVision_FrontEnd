import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import './LandingPage.css';
import Footer from '../components/Footer';
import WellnessVision from '../resources/WellnessVision_new_icon.png';
import { useToggle } from '../pages/HP/useToggle';
import Login from '../components/Login';
import main_landing_image from '../resources/main_langing_image.jpg'
import s1 from '../resources/s_1.jpg'
import s2 from '../resources/s_2.jpg'
import s3 from '../resources/s_3.jpg'

const LandingPage: React.FC = () => {
    const [showPopup, togglePopup] = useToggle();


    useEffect(() => {
        let counter = 1;
        const intervalId = setInterval(() => {
            const nextRadio = document.getElementById(`radio${counter}`) as HTMLInputElement;
            if (nextRadio) {
                nextRadio.checked = true;
                counter = counter >= 3 ? 1 : counter + 1;
            }
        }, 3000); 

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img className='icon_landing_page' src={WellnessVision} alt="WellnessVision" />
                        <span className='wellnessVision_landing_page'>WellnessVision</span>
                    </a>
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
                    <button onClick={togglePopup} className="btn btn-outline-success me-2" id='login_landing_page' type="button">Log In</button>
                    <a href='/NU_Register' className="btn btn-outline-success me-2" id='register_landing_page' type="button">Sign Up</a>
                    <Login show={showPopup} handleClose={togglePopup} />
                </div>
            </nav>

            <main className='main_in_landing_page'>
                <div className='main_colour'>
                <section className="hero">
                    <div className="hero__info">
                        <h1 className="hero__main-title">Welcome to WellnessVision, where your wellness journey begins!</h1>
                        <p className="hero__info-description">
                            Discover a platform that connects you with health professionals for events, appointments, and more. Whether you're looking for yoga sessions, therapy events, or health articles, WellnessVision has you covered.
                        </p>
                        <a href='/NU_Register' className="btn-primary landing_signUpBotton">Sign Up!</a>
                    </div>
                </section>

                <section className="services">
                    <div className="slide-title"><h2>OUR SERVICES</h2></div>
                    <div className="slider-info">
                    </div>
                    <div className="slide-container">
                        <div className="slider">
                            <div className="slides">
                                <input type="radio" name="radio-btn" id="radio1" defaultChecked />
                                <input type="radio" name="radio-btn" id="radio2" />
                                <input type="radio" name="radio-btn" id="radio3" />

                                <div className="slider-pic">
                    <div className="info-item s1">
                    <div className="slide">
                                    <h2>Organize Physical and Online Events</h2>
                                </div>
                    <img src={s1} className='s1_image' alt="Waste Management System" />
                    </div>
                   
                    <div className="info-item s2">
                    <div className="slide">
                    <h2>E- chanaling Health Professionals</h2>
                                </div>
                    <img className='s2_image'src={s2} alt="Marketplace" />
                    </div>
                    
                    <div className="info-item s3">
                    <div className="slide">
                                    <h2>Publish Awareness Articals</h2>
                                </div>
                    <img className='s3_image' src={s3} alt="Another Service" />
                    </div>
                    </div>
                            </div>

                            <div className="navigation-manual">
                                <label htmlFor="radio1" className="manual-btn"></label>
                                <label htmlFor="radio2" className="manual-btn"></label>
                                <label htmlFor="radio3" className="manual-btn"></label>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hero hero_hp_landing_page">
                    <div className="hero__info">
                        <h1 className="hero__main-title">Health Professionals</h1>
                        <p className="hero__info-description">
                        Here the health professionals are the doctors, consultants, and yoga masters who hold physical events,
                        online events, add awareness articles, and treat patients
                        </p>
                        <a href='/HP_Register' className="btn-primary landing_signUpBotton">Be a Health Professional !</a>
                    </div>
                </section>

                <section className="hero hero_Volunteer_landing_page">
                    <div className="hero__info">
                        <h1 className="hero__main-title">Volunteer</h1>
                        <p className="hero__info-description">
                        Here the volunteer can request health professionals by saying they would like to volunteer for health professional's physical events.
                        </p>
                        <a href='/Volunteer_Register' className="btn-primary landing_signUpBotton">Be a Volunteer !</a>
                    </div>
                </section>

                </div>

            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
