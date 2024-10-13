import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif';
import Hp_UpdateTheAppointmentUnavailableDates from './Hp_UpdateTheAppointmentUnavailableDates';
import Hp_ClearAppointmentSchedile from './Hp_ClearAppointmentSchedile';

interface Hp_DeletePhysicalEventFineDetailsProps {
  show_10: boolean;
  handleClose_10: () => void;
  appointmentSchedule: any;
  setSelectClearOrUpdateState: any;
}

const Hp_SelectClearOrUpdateAppointmentSchedile: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_10, handleClose_10, appointmentSchedule, setSelectClearOrUpdateState}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));
    const [dateInput, setDateInput] = useState(false);
    const [showPopup_5, togglePopup_5] = useToggle();
    const [showPopup_12, togglePopup_12] = useToggle();
    const [unavailableDatePeriodState, setUnavailableDatePeriodState] = useState(false);
    const [clearDatePeriodState, setClearDatePeriodState] = useState(false);


    const handleClearDatesSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            navigate('/HP_LodingPage');
          await axios.put(`http://localhost:15000/clearAppointmentScheduleUnavailableDaysForHp`, null, {
            params: {
                appointmentId: appointmentSchedule.appointmentId
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
    };    

const handleClose = () => {
    setSelectClearOrUpdateState(false);
    handleClose_10();
  };

  const handleUnavailableDatePeriodState = () => {
    setUnavailableDatePeriodState(true);
    togglePopup_5();
  };

  const handleClearDatePeriodState = () => {
    setClearDatePeriodState(true);
    togglePopup_12();
  };
    


    return (
        <div className={`popup ${show_10 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`} style={{ zIndex: '0' }}>
          <div className="popup-inner popup-inner_HP_HallAvailability" style={{ width: '900px' }}>
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical events</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                <a className="btn btn-primary participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                   onClick={() => handleClose()}>
                    <i className="bi bi-eye"></i> Close
                  </a>
                <a className="btn btn-success participantDetailsviewMoreButton" style={{ marginLeft: '50px', width: '250px' }} 
                  onClick={() => handleClearDatePeriodState()}>
                    <i className="bi bi-eye"></i> Clear Unavailable Days
                  </a>
                  <a className="btn btn-danger participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                   onClick={() => handleUnavailableDatePeriodState()}>
                    <i className="bi bi-eye"></i> Set Unavailable Days
                  </a>
                </div>
              </div>
            </div>
          </div>
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
          {unavailableDatePeriodState && <Hp_UpdateTheAppointmentUnavailableDates show_5={showPopup_5} handleClose_5={togglePopup_5} appointmentSchedule={appointmentSchedule} setUnavailableDatePeriodState={setUnavailableDatePeriodState}/>}
          {clearDatePeriodState && <Hp_ClearAppointmentSchedile show_12={showPopup_12} handleClose_12={togglePopup_12} appointmentSchedule={appointmentSchedule} setClearDatePeriodState={setClearDatePeriodState}/>}
        </div>
      );
    };
    
    export default Hp_SelectClearOrUpdateAppointmentSchedile;