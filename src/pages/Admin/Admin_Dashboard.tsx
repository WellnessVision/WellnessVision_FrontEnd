import React, { useState, useEffect } from 'react';
import Sidebar from './Admin_components/Admin_Sidebar';
import axios from 'axios';
import CalendarComponent from '../NormalUser/NU_components/NU_Calender';

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
      <h3 className='HP_Dashboard_dashboard'>Admin Dashboard</h3>
      <CalendarComponent/>
    </div>
  );
};

export default Admin_Dashboard;
