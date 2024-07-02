import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/HP_SideBar';
import axios from 'axios';

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
      <Sidebar activeMenuItem="Dashboard" />
    </div>
  );
};

export default HP_Dashboard;
