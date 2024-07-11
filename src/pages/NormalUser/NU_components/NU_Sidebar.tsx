import React, { useEffect, useState } from "react";
import NotificationIcon from "../../../components/HP_NotificationIcon";
import WellnessVision from "../../../resources/WellnessVision_new_icon.png";
// import profilePic from "../../../resources/yoga01.png";
import axios from "axios";

interface NU_SidebarProps {
  activeMenuItem : string;
}

interface UserDetailsProps {
    firstName: string;
    lastName: string;
    profilePic: string;
    
}

const NU_Sidebar: React.FC<NU_SidebarProps> = ({activeMenuItem}) => {
  const notificationCount = 2;
  const [error, setError] = useState('');
  const[userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);


  const fetchUserDetails = async() =>{
    try{
        const userId = localStorage.getItem('nuId');
            const response = await axios.get<UserDetailsProps>(`http://localhost:15000/getNormalUserDetails`, {
                params: {userId: userId}
            });
            setUserDetails(response.data);
            
        }   
    catch(err){
        setError('An unknown error occurred');
    }
  } 

  
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <nav className="navbar fixed-top" style={{ backgroundColor: "#e3f2fd" }} id="navbar">
        <div className="container-md" id="navbar_2">
          <img src={WellnessVision} alt="WellnessVisionIcon" className="WellnessVisionIcon" />
          <a className="navbar-brand" id="WellnessVisionName" href="#"> WellnessVision </a>
          <div className="ml-auto"> <NotificationIcon count={notificationCount} /> </div>
          <div className="name">{userDetails?.firstName}</div>
          <img src={userDetails?.profilePic} alt="Profile" className="profile-pic" id="Profile" />
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
                      <a href="/NU_Dashboard" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'Dashboard' ? 'active' : ''}`} aria-current="page">
                          <i className='bi bi-speedometer2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                      </a>
                  </li>

                  <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'Events' ? 'active' : ''}`}>
                    <a href="#submenu1" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'Events' ? 'active' : ''}`} data-bs-toggle="collapse" aria-current="page">
                        <i className='bi bi-calendar2-week'></i>
                        <span className='ms-2 d-none d-sm-inline'>Events</span>
                        <i className='bi bi-arrow-down-short text-end'></i>
                    </a>
                    <ul className="nav collapse ms-2 flex-column" id='submenu1' data-bs-parent="#parentM">
                        <li className="nav-item">
                            <a className={`nav-link text-white  ${activeMenuItem === 'PhysicalEvents' ? 'active' : ''}`} href="/NU_ViewAllPhysicalEvents" aria-current="page">
                            Physical <span className='d-none d-sm-inline'>Events</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link text-white  ${activeMenuItem === 'OnlineEvents' ? 'active' : ''}`} href="#" aria-current="page">
                            Online <span className='d-none d-sm-inline'>Events</span>
                            </a>
                        </li>
                       
                    </ul>
                </li>

                <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'Bookings' ? 'active' : ''}`}>
                                <a href="#submenu2" className={`nav-link text-white text-center text-sm-start ${activeMenuItem === 'PreviousEvents' ? 'active' : ''}`} data-bs-toggle="collapse" aria-current="page">
                                    <i className='bi bi-grid'></i>
                                    <span className='ms-2 d-none d-sm-inline'>My Bookings</span>
                                    <i className='bi bi-arrow-down-short text-end'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column" id='submenu2' data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" aria-current="page">
                                            Online <span className='d-none d-sm-inline'>Bookings</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="/NU_ViewBookedPhysicalEvents" aria-current="page">
                                            Physical <span className='d-none d-sm-inline'>Bookings</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>


                  <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'My Appointments' ? 'active' : ''}`}>
                      <a href="#" className="nav-link text-white text-center text-sm-start" aria-current="page">
                          <i className='bi bi-calendar-range'></i>
                          <span className='ms-2 d-none d-sm-inline'>My Appointments</span>
                      </a>
                  </li>

                  <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'Payments' ? 'active' : ''}`}>
                      <a href="#" className="nav-link text-white text-center text-sm-start" aria-current="page">
                      <i className='bi bi-credit-card'></i>
                          <span className='ms-2 d-none d-sm-inline'>Payments</span>
                      </a>
                  </li>

                  <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'History' ? 'active' : ''}`}>
                      <a href="#" className="nav-link text-white text-center text-sm-start" aria-current="page">
                          <i className='bi bi-clock-history'></i>
                          <span className='ms-2 d-none d-sm-inline'>History</span>
                      </a>
                  </li>

                  <li className={`nav-item my-1 py-2 py-sm-0 ${activeMenuItem === 'MyProfile' ? 'active' : ''}`}>
                      <a href="#" className="nav-link text-white text-center text-sm-start" aria-current="page">
                      <i className='bi bi-person-circle'></i>
                          <span className='ms-2 d-none d-sm-inline'>My Profile</span>
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

export default NU_Sidebar;
