import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown.js';
import 'bootstrap/js/dist/collapse.js';
import './HP_SideBar.css';
import NotificationIcon from './HP_NotificationIcon';
import WellnessVision from '../resources/WellnessVision_new_icon.png';
import axios from 'axios';

interface SidebarProps {
    activeMenuItem: string;
}

interface HP_Profile {
    firstName: string;
    lastName: string;
    profilePicture: string;
  }

const Sidebar: React.FC<SidebarProps> = ({ activeMenuItem }) => {
    const notificationCount = 3;
    const [error, setError] = useState<string | null>(null);
    const hpId = Number(localStorage.getItem('hpId'));
    const [profileDetails, setProfileDetails] = useState<HP_Profile | null>(null);

    const fetchProfileDetails = async () => {
        try {
          const response = await axios.get<HP_Profile>(`http://localhost:15000/healthProfessionalDashboardProfileDetails`, {
            params: { hpId: hpId }
          });
          setProfileDetails(response.data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };
    
      useEffect(() => {
        fetchProfileDetails();
      }, []);

    return (
        <div>
            <nav className="navbar fixed-top" style={{ backgroundColor: '#e3f2fd' }} id="navbar">
                <div className="container-md" id="navbar_2">
                    <img src={WellnessVision} alt="WellnessVisionIcon" className="WellnessVisionIcon" />
                    <a className="navbar-brand" id='WellnessVisionName' href="#">WellnessVision</a>
                    <div className="ml-auto">
                        <NotificationIcon count={notificationCount} />
                    </div>
                    {profileDetails && (
                        <>
                            <div className="name">{profileDetails.firstName + " " + profileDetails.lastName}</div>
                            <img src={profileDetails.profilePicture} alt="Profile" className="profile-pic" id='Profile' />
                        </>
                    )}
                </div>
            </nav>

            <div className='row fixed-top' id='sidebar'>
                <div className='col-auto col-sm-2 d-flex flex-column justify-content-between min-vh-100 fixed-left' style={{ backgroundColor: '#373A40' }}>
                    <div className='mt-2'>
                        <a className='text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline' role='button'>
                            <span className='' id='WellnessVision'>WellnessVision</span>
                        </a>
                        <hr className='text-white d-none d-sm-block'></hr>
                        <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id='parentM'>
                            <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}>
                                <a href="/HP_Dashboard" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'Dashboard' ? 'active' : ''}`} aria-current="page">
                                    <i className='bi bi-speedometer2'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                                </a>
                            </li>

                            <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'UpcomingEvents' ? 'active' : ''}`}>
                                <a href="#submenu1" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'UpcomingEvents' ? 'active' : ''}`} data-bs-toggle="collapse" aria-current="page">
                                    <i className='bi bi-calendar2-week'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Upcoming Events</span>
                                    <i className='bi bi-arrow-down-short text-end'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column" id='submenu1' data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" aria-current="page">
                                            Online <span className='d-none d-sm-inline'>Events</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="/HP_ViewEvents" aria-current="page">
                                            Physical <span className='d-none d-sm-inline'>Events</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" aria-current="page">
                                            All <span className='d-none d-sm-inline'>Events</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'PreviousEvents' ? 'active' : ''}`}>
                                <a href="#submenu2" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'PreviousEvents' ? 'active' : ''}`} data-bs-toggle="collapse" aria-current="page">
                                    <i className='bi bi-grid'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Previous Events</span>
                                    <i className='bi bi-arrow-down-short text-end'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column" id='submenu2' data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" aria-current="page">
                                            Online <span className='d-none d-sm-inline'>Events</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" aria-current="page">
                                            Physical <span className='d-none d-sm-inline'>Events</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" aria-current="page">
                                            All <span className='d-none d-sm-inline'>Events</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'Appointments' ? 'active' : ''}`}>
                                <a href="#" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'Appointments' ? 'active' : ''}`} aria-current="page">
                                    <i className='bi bi-alarm'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Appointments</span>
                                </a>
                            </li>

                            <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'Articles' ? 'active' : ''}`}>
                                <a href="#" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'Articles' ? 'active' : ''}`} aria-current="page">
                                    <i className='bi bi-file-text'></i>
                                    <span className='ms-2 d-none d-sm-inline'>Awareness Articles</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown open account_div">
                        <a className="btn border-none dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className='bi bi-person f5-4'></i><span className='f5-4 ms-3 d-none d-sm-inline'>Account</span>
                        </a>
                        <div className="dropdown-menu account" aria-labelledby="triggerId">
                            <a className="dropdown-item" href="#">Logout</a>
                            <a className="dropdown-item" href="#">Settings</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
