import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/HP_SideBar';
import axios from 'axios';
import lodingGif from '../../resources/prosecing.gif'
import './HP_LodingPage.css'

const HP_LodingPage: React.FC = () => {

  return (
    <div>
        <img src={lodingGif} alt="lodingGif" className='lodingGif_hp_HP_LodingPage'/>
      {/* <Sidebar activeMenuItem="" /> */}
      <Sidebar activeMenuItem={[""]} />
    </div>
  );
};

export default HP_LodingPage;
