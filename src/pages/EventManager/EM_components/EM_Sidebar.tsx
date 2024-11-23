import React, { useEffect, useState } from "react";
import WellnessVision from "../../../resources/WellnessVision_new_icon.png";
import axios from "axios";
import "../../NormalUser/NU_components/NU_Sidebar.css"; 
import EM_NotificationIcon from "../../../components/EM_NotificationIcon";

interface NU_SidebarProps {
  activeMenuItem: string[];
}

interface UserDetailsProps {
  firstName: string;
  lastName: string;
  profilePic: string;
}

const EM_Sidebar: React.FC<NU_SidebarProps> = ({ activeMenuItem }) => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);
  const eventManagerId = Number(localStorage.getItem('eventManagerId'));

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<UserDetailsProps>(
        `http://localhost:15000/getEventManagerDetailsForEventManager`,
        {
          params: { eventManagerId },
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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<number>(`http://localhost:15000/getNotificationsCountForAnyUser`,{
            params: { ownerId: eventManagerId }
        });
        setNotificationCount(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchEvent();
  }, [eventManagerId]);

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
            <EM_NotificationIcon count={notificationCount} />
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
                  href="/EM_Dashboard"
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
                className={`nav-item my-1 py-2 py-sm-0 ${isActive("HealthProfessionals")}`}
              >
                <a
                  href="/EM_ViewAllHealthProfessionals"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "HealthProfessionals"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-credit-card"></i>
                  <span className="ms-2 d-none d-sm-inline">Health Professionals</span>
                </a>
              </li>

              <li
                className={`nav-item my-1 py-2 py-sm-0 ${isActive(
                  "EventHalls"
                )}`}
              >
                <a
                  href="/EM_ViewAllPhysicalEventHalls"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "EventHalls"
                  )}`}
                  aria-current="page"
                >
                  <i className="bi bi-chat-left"></i>
                  <span className="ms-2 d-none d-sm-inline">Event Halls</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className={`nav-link text-white text-center text-sm-start ${isActive(
                    "Logout"
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

export default EM_Sidebar;
