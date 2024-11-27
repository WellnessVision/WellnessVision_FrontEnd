import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/HP_SideBar';
import axios from 'axios';
import './HP_Dashboard.css'
import eventImage from '../../resources/yoga01.png'

interface HP_Profile {
  id: number;
  user_type: string;
  email: string;
}

const HP_Dashboard: React.FC = () => {
  // const [error, setError] = useState<string | null>(null);
  // const hpId = Number(localStorage.getItem('hpId'));
  // const [profileDetails, setProfileDetails] = useState<HP_Profile[]>([]);

  // const fetchProfileDetails = async () => {
  //   try {
  //     const response = await axios.get<HP_Profile[]>(`http://localhost:15000/healthProfessionalDashboardProfileDetails`, {
  //       params: { hpId: hpId }
  //     });
  //     setProfileDetails(response.data);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError('An unknown error occurred');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchProfileDetails();
  // }, []);

  return (
    <div>
      <Sidebar activeMenuItem={["Dashboard"]}/>
      <h3 className='HP_Dashboard_dashboard'>Dashboard</h3>
      <div className="card text-center HP_Dashboard_eventCard">
  <div className="card-header">
    Events
  </div>
  <div className="card-body">
    <h5 className="card-title">Add New  Physical Events</h5>
    <p className="card-text">Create a new physical event for users and start your new journey.</p>
    <a href="/HP_ViewEvents" className="btn btn-outline-primary">Add New Physical Event</a>
  </div>
  <div className="card-footer text-body-secondary">
    No events available
  </div>
</div>
<div className="card text-center HP_Dashboard_eventCard2">
  <div className="card-header">
  Appointment
  </div>
  <div className="card-body">
    <h5 className="card-title">Set Up Appointment Schedule</h5>
    <p className="card-text">Create a new appointment schedule for users and start your new journey.</p>
    <a href="/HP_ViewEvents" className="btn btn-outline-primary">Add New Appointment</a>
  </div>
  <div className="card-footer text-body-secondary">
    No appointments available
  </div>
</div>
</div>
  );
};

export default HP_Dashboard;
