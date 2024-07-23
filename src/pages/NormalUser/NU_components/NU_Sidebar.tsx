import React, { useEffect, useState } from "react";
import NotificationIcon from "../../../components/HP_NotificationIcon";
import WellnessVision from "../../../resources/WellnessVision_new_icon.png";
import axios from "axios";
import "./NU_Sidebar.css"; // Import the CSS file where your styles are defined

interface NU_SidebarProps {
  activeMenuItem: string[];
}

interface UserDetailsProps {
  firstName: string;
  lastName: string;
  profilePic: string;
}

const NU_Sidebar: React.FC<NU_SidebarProps> = ({ activeMenuItem }) => {
  const notificationCount = 2;
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get<UserDetailsProps>(
        `http://localhost:15000/getNormalUserDetails`,
        {
          params: { userId: userId },
        }
      );
      setUserDetails(response.data);
    } catch (err) {
      setError("An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const isActive = (item: string) => (activeMenuItem.includes(item) ? "active" : "");
  const isExpanded = (items: string[]) =>
  items.includes(activeMenuItem[0]) ? "show" : "";

  return (
    <div>
      <nav
        className="navbar fixed-top"
        style={{ backgroundColor: "#e3f2fd" }}
        id="navbar"
      >
        <div className="container-md" id="navbar_2">
          <img
            src={WellnessVision}
            alt="WellnessVisionIcon"
            className="WellnessVisionIcon"
          />
          <a className="navbar-brand" id="WellnessVisionName" href="#">
            WellnessVision
          </a>
          <div className="ml-auto">
            <NotificationIcon count={notificationCount} />
          </div>
          <div className="name">
            {userDetails?.firstName} {userDetails?.lastName}
          </div>
          <img
            src={userDetails?.profilePic}
            alt="Profile"
            className="profile-pic"
            id="Profile"
          />
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
                  href="/NU_Dashboard"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Dashboard"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </a>
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
                          href="/NU_ViewUpcomingPhysicalEvents"
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

              <li
                className={`nav-item my-1 py-2 py-sm-0 ${isExpanded([
                  "UpcomingBooked_Events",
                  "PhysicalBooked_Events",
                  "OnlineBooked_Events",
                ])}`}
              >
                <a
                  href="#submenuBooked_Events"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Booked_Events"
                  )}`}
                  data-bs-toggle="collapse"
                  aria-current="page"
                  data-menu="Booked_Events"
                >
                  <i className="bi bi-calendar2-week"></i>
                  <span className="ms-2 d-none d-sm-inline">Booked Events</span>
                  <i className="bi bi-arrow-down-short text-end"></i>
                </a>
                <ul
                  className={`nav collapse ms-2 flex-column ${isExpanded([
                    "UpcomingBooked_Events",
                    "PhysicalBooked_Events",
                    "OnlineBooked_Events",
                  ])}`}
                  id="submenuBooked_Events"
                  data-bs-parent="#parentM"
                >
                  <li
                    className={`nav-item ${isExpanded([
                      "PhysicalBooked_Events",
                      "OnlineBooked_Events",
                    ])}`}
                  >
                    <a
                      href="#submenuUpcomingBooked_Events"
                      className={`nav-link text-white text-center text-sm-start ${isActive(
                        "UpcomingBooked_Events"
                      )}`}
                      data-bs-toggle="collapse"
                      aria-current="page"
                      data-menu="UpcomingBooked_Events"
                    >
                      <i className="bi bi-calendar"></i>
                      <span className="ms-2 d-none d-sm-inline">Upcoming</span>
                      <i className="bi bi-arrow-down-short text-end"></i>
                    </a>
                    <ul
                      className={`nav collapse ms-2 flex-column ${isExpanded([
                        "PhysicalBooked_Events",
                        "OnlineBooked_Events",
                      ])}`}
                      id="submenuUpcomingBooked_Events"
                      data-bs-parent="#submenuBooked_Events"
                    >
                      <li className="nav-item">
                        <a
                          className={`nav-link text-white ${isActive(
                            "PhysicalBooked_Events"
                          )}`}
                          href="/NU_ViewBookedUpcomingphysicalEvents"
                          aria-current="page"
                          data-menu="PhysicalBooked_Events"
                        >
                           <i className="bi bi-calendar"></i> Physical Events
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link text-white ${isActive(
                            "OnlineBooked_Events"
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
                      href="#submenuPreviousBooked_Events"
                      className={`nav-link text-white text-center text-sm-start ${isActive(
                        "PreviousBooked_Events"
                      )}`}
                      data-bs-toggle="collapse"
                      aria-current="page"
                      data-menu="PreviousBooked_Events"
                    >
                      <i className="bi bi-calendar-check"></i>
                      <span className="ms-2 d-none d-sm-inline">Previous</span>
                      <i className="bi bi-arrow-down-short text-end"></i>
                    </a>
                    <ul
                      className="nav collapse ms-2 flex-column"
                      id="submenuPreviousBooked_Events"
                      data-bs-parent="#submenuBooked_Events"
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

export default NU_Sidebar;
