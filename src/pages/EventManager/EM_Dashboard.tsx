import React, { useState, useEffect } from 'react';
import EM_Sidebar from './EM_components/EM_Sidebar';
import axios from 'axios';
import '../HP/HP_Dashboard.css'
import eventImage from '../../resources/yoga01.png'

interface HP_Profile {
  id: number;
  user_type: string;
  email: string;
}

const EM_Dashboard: React.FC = () => {
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
      <EM_Sidebar activeMenuItem={["Dashboard"]}/>
      <h3 className='HP_Dashboard_dashboard'>Dashboard</h3>
      <div className="card text-center HP_Dashboard_eventCard">
  <div className="card-header">
   Health Prefessionals Events
  </div>
  <div className="card-body">
    <h5 className="card-title">View and manage health prefessionals events</h5>
    <p className="card-text">You can view and manage health prefessionals events under health prefessional category</p>
    <a href="/EM_ViewAllHealthProfessionals" className="btn btn-outline-primary">View Health Prefessional</a>
  </div>
  <div className="card-footer text-body-secondary">
    Event Manager @WellnessVision
  </div>
</div>
<div className="card text-center HP_Dashboard_eventCard2">
  <div className="card-header">
 Physical Event Halls
  </div>
  <div className="card-body">
    <h5 className="card-title">View and manage physical event halls</h5>
    <p className="card-text">You can view all the physical event halls and manage those under Event Halls category</p>
    <a href="/EM_ViewAllPhysicalEventHalls" className="btn btn-outline-primary">View Physical Event Halls</a>
  </div>
  <div className="card-footer text-body-secondary">
  Event Manager @WellnessVision
  </div>
</div>
</div>
  );
};

export default EM_Dashboard;
