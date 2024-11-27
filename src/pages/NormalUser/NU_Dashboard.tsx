import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NU_Sidebar from './NU_components/NU_Sidebar';
import CalendarComponent from './NU_components/NU_Calender';


const NU_Dashboard: React.FC = () => {


  return (
    <div>
      <NU_Sidebar activeMenuItem={["Dashboard"]}/>
      <h3 className='HP_Dashboard_dashboard'>Normal User Dashboard</h3>
      <CalendarComponent/>
    </div>
  );
};

export default NU_Dashboard;
