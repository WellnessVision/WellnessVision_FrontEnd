import React, { useState, useEffect } from 'react';
import AM_Sidebar from './AM_components/AM_Sidebar';
import axios from 'axios';
import '../HP/HP_Dashboard.css'
import eventImage from '../../resources/yoga01.png'

interface HP_Profile {
  id: number;
  user_type: string;
  email: string;
}

const AM_Dashboard: React.FC = () => {
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
      <AM_Sidebar activeMenuItem={["Dashboard"]}/>
      <h3 className='HP_Dashboard_dashboard'>Dashboard</h3>
      <div className="card text-center HP_Dashboard_eventCard">
  <div className="card-header">
   Health Prefessionals Appointment
  </div>
  <div className="card-body">
    <h5 className="card-title">View and manage health prefessionals appointments</h5>
    <p className="card-text">You can view and manage health prefessionals appointments under health prefessional category</p>
    <a href="/AM_ViewAllHealthProfessionals" className="btn btn-outline-primary">View Health Prefessional</a>
  </div>
  <div className="card-footer text-body-secondary">
    Appointment Manager @WellnessVision
  </div>
</div>
<div className="card text-center HP_Dashboard_eventCard2">
  <div className="card-header">
 Appointment Rooms
  </div>
  <div className="card-body">
    <h5 className="card-title">View and manage appointment rooms</h5>
    <p className="card-text">You can view all theappointment rooms and manage those under Appointment Rooms category</p>
    <a href="/AM_ViewAllAppointmentRooms" className="btn btn-outline-primary">View Appointment Rooms</a>
  </div>
  <div className="card-footer text-body-secondary">
  Appointment Manager @WellnessVision
  </div>
</div>
</div>
  );
};

export default AM_Dashboard;
