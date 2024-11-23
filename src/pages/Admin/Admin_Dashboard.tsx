import React, { useState, useEffect } from 'react';
import Sidebar from './Admin_components/Admin_Sidebar';
import axios from 'axios';
import '../HP/HP_Dashboard.css'
import eventImage from '../../resources/yoga01.png'

interface HP_Profile {
  id: number;
  user_type: string;
  email: string;
}

const Admin_Dashboard: React.FC = () => {
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
    Registretion Request
  </div>
  <div className="card-body">
    <h5 className="card-title">View and manage registretion requests</h5>
    <p className="card-text">You can view and manage health prefessionals, volunteers registretion requests under registretion request category</p>
    <a href="/Admin_ViewVolunteerRegistrationRequest" className="btn btn-outline-primary">Volunteers</a>
    <a href="/AdminViewHealthProfessionalRegistrationRequest" className="btn btn-outline-primary"  style={{marginLeft: '50px'}}>Health prefessionals</a>
  </div>
  <div className="card-footer text-body-secondary">
    System Admin @WellnessVision
  </div>
</div>
<div className="card text-center HP_Dashboard_eventCard2">
  <div className="card-header">
  Admin Privilege Users
  </div>
  <div className="card-body">
    <h5 className="card-title">View and manage admin privilege users</h5>
    <p className="card-text">You can view all the admin privilege users and manage them under Admin Privilege Users in All Users category</p>
    <a href="/Admin_ViewAllSystemPrivilegeUser" className="btn btn-outline-primary">View Admin Privilege Users</a>
  </div>
  <div className="card-footer text-body-secondary">
  System Admin @WellnessVision
  </div>
</div>
</div>
  );
};

export default Admin_Dashboard;
