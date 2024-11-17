import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../../pages/HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif'
import HP_AddAppointmentScheduleOtherDetails from '../../../components/HP_AddAppointmentScheduleOtherDetails';

interface HP_HallAvailabilityProps {
  show_4: boolean;
  handleClose_4: () => void;
  eventData: any;
  roomId: any;
}

const AM_MaintainDateUpdateState: React.FC<HP_HallAvailabilityProps> = ({ show_4, handleClose_4, eventData, roomId }) => {
  const [message, setMessage] = useState('');
  const [event_id, setEventId] = useState('');
  const [totalCharge, setTotalCharge] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const hpId = String(localStorage.getItem('hpId'));
  const hpEmail = String(localStorage.getItem('hpEmail'));
  const [showPopup_4, togglePopup_4] = useToggle();

  const handleGotIt = () => {
    navigate('/HP_LodingPage');
    setTimeout(() => {
        navigate(`/AM_ViewAllAppointmentScheduleOfRoom/${roomId}`);
    }, 100);
}



return (
    <div className={`popup ${show_4 ? 'show HP_HallAvailabilityPopupForIt' : ''} `}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body HP_HallAvailabilityMainDivCard">
            <h5 className="card-title title_HP_HallAvailability">Appointment Room(In WellnessVision Premises)</h5>
            <div className="straight-line"></div>
            <div className='HP_HallAvailability_div'>
              {eventData.setDateState === 'Updated' ? (
                <div>
                <p className='Unfortunately_header_HP_HallAvailability' style={{color :'#008000'}}>Successfully Updated</p>
                <p className='Unfortunately_text_HP_HallAvailability'>Room Id: {roomId} is not available for appointment booking from {eventData.startDate} to {eventData.endDate}</p>
                <div className='HP_HallAvailability_button_div'>
                  <button className="btn btn-success HP_HallAvailability_cancel_button" onClick={handleGotIt}>
                  <i className="bi bi-check2-circle"></i> Got it
                  </button>
                </div>
              </div>
                ) : (
                <div>
                  <p className='Unfortunately_header_HP_HallAvailability'>Fail to Update</p>
                  <p className='Unfortunately_text_HP_HallAvailability'>There are already booked appoinments are available from {eventData.startDate} to {eventData.endDate}</p>
                  <div className='HP_HallAvailability_button_div'>
                    <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleClose_4}>
                      <i className="bi bi-arrow-left-circle"></i> Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
    </div>
  );
};

export default AM_MaintainDateUpdateState;