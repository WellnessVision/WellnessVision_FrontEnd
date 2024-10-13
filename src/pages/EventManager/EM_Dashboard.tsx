import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EM_Sidebar from './EM_components/EM_Sidebar';


const EM_Dashboard: React.FC = () => {
  return (
    <div>
      <EM_Sidebar activeMenuItem={["Dashboard"]}/>
      <h3 className='NU_Dashboard_dashboard'>Dashboard</h3>
    </div>
  );
};

export default EM_Dashboard;
