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
    activeMenuItem: string[];
}

interface Admin_Profile {
    firstName: string;
    lastName: string;
    profilePic: string;
  }

const Admin_Sidebar: React.FC<SidebarProps> = ({ activeMenuItem }) => {
    const notificationCount = 3;
    const [error, setError] = useState<string | null>(null);
    const adminId = Number(localStorage.getItem('adminId'));
    const [profileDetails, setProfileDetails] = useState<Admin_Profile | null>(null);

    const fetchProfileDetails = async () => {
        try {
          const response = await axios.get<Admin_Profile>(`http://localhost:15000/adminDashboardProfileDetails`, {
            params: { adminId: adminId }
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

    const isActive = (item: string) => (activeMenuItem.includes(item) ? "active" : "");
    const isExpanded = (items: string[]) =>
    items.includes(activeMenuItem[0]) ? "show" : "";

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
                            <img src={profileDetails.profilePic} alt="Profile" className="profile-pic" id='Profile' />
                        </>
                    )}
                </div>
            </nav>

            <div className="row fixed-top" id="sidebar">
        <div
          className="col-auto col-sm-2 d-flex flex-column justify-content-between min-vh-100 fixed-left"
          style={{ backgroundColor: "#373A40" }}
        >
          <div className="mt-2">
            <a
              className="text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline"
              role="button"
            >
              <span className="" id="WellnessVision">
                WellnessVision
              </span>
            </a>
            <hr className="text-white d-none d-sm-block"></hr>
            <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
              <li
                className={`nav-item my-1 py-2 py-sm-0 ${isActive(
                  "Dashboard"
                )}`}
              >
                <a
                  href="/Admin_Dashboard"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Dashboard"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </a>
              </li>
       
              <li className={`nav-item my-1 py-2 py-sm-0 ${isExpanded([
                        "RegistretionRequest",
                        "HealthProfessionalRegistretionRequest",
                        "VolunteerRegistretionRequest",
                        ])}`}>
                        <a
                            href="#submenuRegistretionRequest"
                            className={`nav-link text-white text-center text-sm-start ${isActive(
                            "RegistretionRequest"
                            )}`}
                            data-bs-toggle="collapse"
                            aria-current="page"
                            data-menu="RegistretionRequest"
                        >
                            <i className="bi bi-calendar2-week"></i>
                            <span className="ms-2 d-none d-sm-inline">Registretion Request</span>
                            <i className="bi bi-arrow-down-short text-end"></i>
                        </a>
                        <ul
                            className={`nav collapse ms-2 flex-column ${isExpanded([
                            "HealthProfessionalRegistretionRequest",
                            "VolunteerRegistretionRequest",
                            ])}`}
                            id="submenuRegistretionRequest"
                            data-bs-parent="#parentM"
                        >
                            <li className="nav-item">
                            <a
                                className={`nav-link text-white ${isActive("HealthProfessionalRegistretionRequest")}`}
                                href="/AdminViewHealthProfessionalRegistrationRequest"
                                aria-current="page"
                                data-menu="HealthProfessionalRegistretionRequest"
                            >
                                <i className="bi bi-calendar"></i> Health Professional
                            </a>
                            </li>
                            <li className="nav-item">
                            <a
                                className={`nav-link text-white ${isActive("VolunteerRegistretionRequest")}`}
                                href="#"
                                aria-current="page"
                                data-menu="VolunteerRegistretionRequest"
                            >
                                Volunteer
                            </a>
                            </li>
                        </ul>
                </li>
                
                <li
                className={`nav-item my-1 py-2 py-sm-0 ${isExpanded([
                  "UpcomingEvents",
                  "PhysicalEvents",
                  "OnlineEvents",
                ])}`}
              >
                <a
                  href="#submenuEvents"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Events"
                  )}`}
                  data-bs-toggle="collapse"
                  aria-current="page"
                  data-menu="Events"
                >
                  <i className="bi bi-calendar2-week"></i>
                  <span className="ms-2 d-none d-sm-inline">Events</span>
                  <i className="bi bi-arrow-down-short text-end"></i>
                </a>
                <ul
                  className={`nav collapse ms-2 flex-column ${isExpanded([
                    "UpcomingEvents",
                    "PhysicalEvents",
                    "OnlineEvents",
                  ])}`}
                  id="submenuEvents"
                  data-bs-parent="#parentM"
                >
                  <li
                    className={`nav-item ${isExpanded([
                      "PhysicalEvents",
                      "OnlineEvents",
                    ])}`}
                  >
                    <a
                      href="#submenuUpcoming"
                      className={`nav-link text-white text-center text-sm-start ${isActive(
                        "UpcomingEvents"
                      )}`}
                      data-bs-toggle="collapse"
                      aria-current="page"
                      data-menu="UpcomingEvents"
                    >
                      <i className="bi bi-calendar"></i>
                      <span className="ms-2 d-none d-sm-inline">Upcoming</span>
                      <i className="bi bi-arrow-down-short text-end"></i>
                    </a>
                    <ul
                      className={`nav collapse ms-2 flex-column ${isExpanded([
                        "PhysicalEvents",
                        "OnlineEvents",
                      ])}`}
                      id="submenuUpcoming"
                      data-bs-parent="#submenuEvents"
                    >
                      <li className="nav-item">
                        <a
                          className={`nav-link text-white ${isActive(
                            "PhysicalEvents"
                          )}`}
                          href="#"
                          aria-current="page"
                          data-menu="PhysicalEvents"
                        >
                           <i className="bi bi-calendar"></i> Physical Events
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link text-white ${isActive(
                            "OnlineEvents"
                          )}`}
                          href="#"
                          aria-current="page"
                        >
                          Online Events
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#submenuPrevious"
                      className={`nav-link text-white text-center text-sm-start ${isActive(
                        "PreviousEvents"
                      )}`}
                      data-bs-toggle="collapse"
                      aria-current="page"
                      data-menu="PreviousEvents"
                    >
                      <i className="bi bi-calendar-check"></i>
                      <span className="ms-2 d-none d-sm-inline">Previous</span>
                      <i className="bi bi-arrow-down-short text-end"></i>
                    </a>
                    <ul
                      className="nav collapse ms-2 flex-column"
                      id="submenuPrevious"
                      data-bs-parent="#submenuEvents"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link text-white"
                          href="#"
                          aria-current="page"
                        >
                          Physical Events
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-white"
                          href="#"
                          aria-current="page"
                        >
                          Online Events
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={`nav-item my-1 py-2 py-sm-0 ${isExpanded([
                        "Deleted_Events",
                        "PhysicalDeleted_Events",
                        "OnlineDeleted_Events",
                        ])}`}>
                        <a
                            href="#submenuDeleted_Events"
                            className={`nav-link text-white text-center text-sm-start ${isActive(
                            "Deleted_Events"
                            )}`}
                            data-bs-toggle="collapse"
                            aria-current="page"
                            data-menu="Deleted_Events"
                        >
                            <i className="bi bi-calendar2-week"></i>
                            <span className="ms-2 d-none d-sm-inline">Deleted Events</span>
                            <i className="bi bi-arrow-down-short text-end"></i>
                        </a>
                        <ul
                            className={`nav collapse ms-2 flex-column ${isExpanded([
                            "PhysicalDeleted_Events",
                            "OnlineDeleted_Events",
                            ])}`}
                            id="submenuDeleted_Events"
                            data-bs-parent="#parentM"
                        >
                            <li className="nav-item">
                            <a
                                className={`nav-link text-white ${isActive("PhysicalDeleted_Events")}`}
                                href="#"
                                aria-current="page"
                                data-menu="PhysicalDeleted_Events"
                            >
                                <i className="bi bi-calendar"></i> Physical Events
                            </a>
                            </li>
                            <li className="nav-item">
                            <a
                                className={`nav-link text-white ${isActive("OnlineDeleted_Events")}`}
                                href="#"
                                aria-current="page"
                                data-menu="OnlineDeleted_Events"
                            >
                                Online Events
                            </a>
                            </li>
                        </ul>
                </li>

              <li
                className={`nav-item my-1 py-2 py-sm-0 ${isActive(
                  "My Appointments"
                )}`}
              >
                <a
                  href="#"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "My Appointments"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-calendar-range"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    My Appointments
                  </span>
                </a>
              </li>

              <li
                className={`nav-item my-1 py-2 py-sm-0 ${isActive("Payments")}`}
              >
                <a
                  href="#"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Payments"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-credit-card"></i>
                  <span className="ms-2 d-none d-sm-inline">Payments</span>
                </a>
              </li>

              <li
                className={`nav-item my-1 py-2 py-sm-0 ${isActive(
                  "Feedback"
                )}`}
              >
                <a
                  href="#"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Feedback"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-chat-left"></i>
                  <span className="ms-2 d-none d-sm-inline">Feedback</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Feedback"
                  )}`}
                  aria-current="page">
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Sidebar;
