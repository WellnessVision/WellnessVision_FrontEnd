import React from "react";
import NotificationIcon from "../../components/HP_NotificationIcon";
import WellnessVision from "../../resources/WellnessVision_new_icon.png";
import profilePic from "../../resources/yoga01.png";

interface VolunteerSidebarProps {
  activeMenuItem : string;
}

const Volunteer_Sidebar: React.FC<VolunteerSidebarProps> = ({activeMenuItem}) => {
  const notificationCount = 2;

  return (
    <div>
      <nav className="navbar fixed-top" style={{ backgroundColor: "#e3f2fd" }} id="navbar">
        <div className="container-md" id="navbar_2">
          <img src={WellnessVision} alt="WellnessVisionIcon" className="WellnessVisionIcon" />
          <a className="navbar-brand" id="WellnessVisionName" href="#"> WellnessVision </a>
          <div className="ml-auto"> <NotificationIcon count={notificationCount} /> </div>
          <div className="name">Inod Shanilka</div>
          <img src={profilePic} alt="Profile" className="profile-pic" id="Profile" />
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

                  <li className="nav-item my-1 py-2 py-sm-0">
                      <a href="#" className={`nav-link text-white text-center text-sm-start  ${activeMenuItem === 'Dashboard' ? 'active' : ''}`} aria-current="page">
                          <i className='bi bi-speedometer2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                      </a>
                  </li>

                  <li className="nav-item my-1 py-2 py-sm-0">
                      <a href="#submenu1" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'Events' ? 'active' : ''}`} data-bs-toggle="collapse" aria-current="page">
                          <i className='bi bi-grid'></i>
                          <span className='ms-2 d-none d-sm-inline'>Events</span>
                          <i className='bi bi-arrow-down-short text-end'></i>
                      </a>
                      <ul className="nav collapse ms-2 flex-column" id='submenu1' data-bs-parent="#parentM">
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

                  <li className="nav-item my-1 py-2 py-sm-0">
                      <a href="#submenu2" className= "nav-link text-white text-center text-sm-start" data-bs-toggle="collapse" aria-current="page">
                          <i className='bi bi-calendar-range'></i>
                          <span className='ms-2 d-none d-sm-inline'>My Events</span>
                          <i className='bi bi-arrow-down-short text-end'></i>
                      </a>
                      <ul className="nav collapse ms-2 flex-column" id='submenu2' data-bs-parent="#parentM">
                          <li className="nav-item">
                              <a className={`nav-link text-white ${activeMenuItem === 'Upcomming' ? 'active' : ''}`} href="#" aria-current="page">
                                  Upcomming <span className='d-none d-sm-inline'>Events</span>
                              </a>
                          </li>
                          <li className="nav-item">
                              <a className={`nav-link text-white ${activeMenuItem === 'Previous' ? 'active' : ''}`} href="#" aria-current="page">
                                  Previous <span className='d-none d-sm-inline'>Events</span>
                              </a>
                          </li> 
                      </ul>
                  </li>                  

                  <li className="nav-item my-1 py-2 py-sm-0">
                      <a href="#" className={`nav-link text-white text-center text-sm-start  ${activeMenuItem === 'Appointments' ? 'active' : ''}`} aria-current="page">
                          <i className='bi bi-alarm'></i>
                          <span className='ms-2 d-none d-sm-inline'>Make an Appointment</span>
                      </a>
                  </li>

                  <li className="nav-item my-1 py-2 py-sm-0">
                      <a href="#" className={`nav-link text-white text-center text-sm-start  ${activeMenuItem === 'Bookings' ? 'active' : ''}`} aria-current="page">
                          <i className='bi bi-journal-medical'></i>
                          <span className='ms-2 d-none d-sm-inline'>My Bookings</span>
                      </a>
                  </li>

                  <li className="nav-item my-1 py-2 py-sm-0">
                      <a href="#" className={`nav-link text-white text-center text-sm-start  ${activeMenuItem === 'Articles' ? 'active' : ''}`} aria-current="page">
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

export default Volunteer_Sidebar;
