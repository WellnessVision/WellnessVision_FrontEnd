import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif';
import Hp_DeletePhysicalEventReasonAndContinue from '../components/Hp_DeletePhysicalEventReasonAndContinue';

interface Hp_DeletePhysicalEventFineDetailsProps {
  show_3: boolean;
  handleClose_3: () => void;
  appointmentSchedule: any;
  setAppointmentCloseFlag: any;
}

const Hp_CloseAppointmentBooking: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_3, handleClose_3, appointmentSchedule, setAppointmentCloseFlag}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));


const handleChangeStateSubmit =  useCallback(async () => {
    try {
        navigate('/HP_LodingPage');
      await axios.put(`http://localhost:15000/closeAppointmentBookingForHp`, null, {
        params: {
            appointmentId: appointmentSchedule.appointmentId,
        }
      });
      navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentSchedule.appointmentId}`);
    } 
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
  }
}, [appointmentSchedule]);

const handleCloseDelete = () => {
    setAppointmentCloseFlag(false);
    handleClose_3();
  };
    


    return (
        <div className={`popup ${show_3 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability" style={{ width: '650px' }}>
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical events</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                      <p className="card-text detail" style={{ color: 'red' }}>After close the appointment booking, you can't reopen it and anyone can't booked that appointment</p>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDelete}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={handleChangeStateSubmit}>
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Continue</span>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
        </div>
      );
    };
    
    export default Hp_CloseAppointmentBooking;