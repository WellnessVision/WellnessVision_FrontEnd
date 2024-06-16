import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';

interface HP_HallAvailabilityProps {
    show_2: boolean;
    handleClose_2: () => void;
    children_2?: React.ReactNode;
  }

const HP_HallAvailability: React.FC<HP_HallAvailabilityProps> = ({ show_2, handleClose_2, children_2 }) => {
  const [message, setMessage] = useState('');
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:15000/register', {
      });
      setMessage(response.data.message || 'Registration successful');
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div className={`popup ${show_2 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
          <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title title_HP_HallAvailability">Hall Avaliability (In WellnessVision Premises)</h5>
              <div className="straight-line"></div>
              <div className='HP_HallAvailability_div'>
              <p className="card-text detail Hall_ID_HP_HallAvailability"><i className="bi bi-award-fill"></i> E401 (Hall ID)</p>
                <p className="card-text detail Hall_type_HP_HallAvailability"><i className="bi bi-bookmark-star-fill"></i> Lecture Hall (Tables and Chairs)</p>
                <p className="card-text detail seats_HP_HallAvailability"><i className='bi bi-person-workspace'></i> 1000 Seats (Maximum Participant Capacity)</p>
                <p className="card-text detail price_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.25000/= (Per Hour (1h))<span className="card-text detail duration_HP_HallAvailability"><i className='bi bi-hourglass-split'></i>2 hour duration</span></p>
                <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-hourglass-split'></i> Rs.25000/= * 2h = Rs.50000/= (Total Charge for Hall)</p>
                <div>
                <a href="HP_OneEvents" className="btn btn-primary HP_HallAvailability_cansel">
                <i className="bi bi-arrow-left-circle"></i> Cancel
              </a>
              <a href="HP_OneEvents" className="btn btn-warning HP_HallAvailability_hallBook">
                <i className="bi bi-bag-plus-fill"></i><span className='HP_HallAvailability_hallBook_text'> Book Now</span>
              </a>
              </div>
            </div>
          </div></div>
        </div>
        </div>
  );
};

export default HP_HallAvailability;
