import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AM_Sidebar from './AM_components/AM_Sidebar';


const AM_Dashboard: React.FC = () => {
  return (
    <div>
      <AM_Sidebar activeMenuItem={["Dashboard"]}/>
      <h3 className='NU_Dashboard_dashboard'>Dashboard</h3>
    </div>
  );
};

export default AM_Dashboard;
