import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import '../../../components//Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../../pages/HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif';
import EM_SetStartDateAndEndDate from './EM_SetStartDateAndEndDate';
import EM_SetHallUnavailableDate from './EM_SetHallUnavailableDate';

interface Hp_DeletePhysicalEventFineDetailsProps {
  show_2: boolean;
  handleClose_2: () => void;
  hallId: any;
  setSelectMaintainDateType: any;
  roomDetails: any;
}

const EM_SelectMaintainDateType: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_2, handleClose_2, hallId, setSelectMaintainDateType, roomDetails}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));
    const [dateInput, setDateInput] = useState(false);
    const [showPopup_3, togglePopup_3] = useToggle();
    const [showPopup_5, togglePopup_5] = useToggle();
    const [selectStartAndEndDate, setSelectStartAndEndDate] = useState(false);
    const [selectUnavailableDate, setSelectUnavailableDate] = useState(false);

const clearSetDays =  useCallback(async () => {
    try {
        navigate('/HP_LodingPage');
        await axios.put(`http://localhost:15000/clearHallSetDateOfHallForEventManager`, null, {
        params: { 
            hallId 
            }
        });
        navigate(`/EM_ViewAllPhysicalEventsOfHall/${hallId}`);
    } catch (err) {
        if (err instanceof Error) {
        setError(err.message);
        } else {
        setError('An unknown error occurred');
        }
    }
    }, []);

const handleClose = () => {
    setSelectMaintainDateType(false);
    handleClose_2();
  };

  const handleSelectStartAndEndDate = () => {
    setSelectStartAndEndDate(true);
    togglePopup_3();
  };

  const handleSelectUnavailableDate = () => {
    setSelectUnavailableDate(true);
    togglePopup_5();
  };
    
return (
        <div className={`popup ${show_2 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`} style={{ zIndex: '0' }}>
          <div className="popup-inner popup-inner_HP_HallAvailability" style={{ width: '1100px' }}>
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical events</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                {roomDetails ? (
                    <div>
                <button className="btn btn-primary participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                   onClick={() => handleClose()}>
                   <i className="bi bi-arrow-left-circle"></i> Close
                  </button>
                {roomDetails.unavailable_date == null ? 
                <button className="btn btn-success participantDetailsviewMoreButton" style={{ marginLeft: '50px', width: '250px' }} 
                  onClick={() => handleSelectStartAndEndDate()}>
                    <i className="bi bi-calendar-check"></i> Set Maintain Time Period
                  </button> : ''}
                  {roomDetails.unavailable_date != null ? 
                <button className="btn btn-success participantDetailsviewMoreButton" style={{ marginLeft: '50px', width: '250px' }} 
                 disabled
                  onClick={() => handleSelectStartAndEndDate()}>
                    <i className="bi bi-calendar-check"></i> Set Maintain Time Period
                  </button> : ''}
                  {roomDetails.maintain_start_date == null ? 
                  <button className="btn btn-warning participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                   onClick={() => handleSelectUnavailableDate()}
                   >
                    <i className="bi bi-calendar-check"></i> Set Unavailable Date 
                  </button> : '' }
                  {roomDetails.maintain_start_date != null ? 
                  <button className="btn btn-warning participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                  disabled
                   onClick={() => handleSelectUnavailableDate()}
                   >
                    <i className="bi bi-calendar-check"></i> Set Unavailable Date 
                  </button> : '' }
                  {roomDetails.maintain_start_date != null || roomDetails.unavailable_date != null? 
                  <button className="btn btn-danger participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                   onClick={clearSetDays}
                   >
                    <i className="bi bi-arrow-clockwise"></i> Clear selected days 
                  </button> : '' }
                  {roomDetails.maintain_start_date == null && roomDetails.unavailable_date == null? 
                  <button className="btn btn-danger participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                  disabled
                   onClick={clearSetDays}
                   >
                   <i className="bi bi-arrow-clockwise"></i> Clear selected days 
                  </button> : '' }
                  </div>)
                  : ''}
                </div>
              </div>
            </div>
          </div>
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
          {selectStartAndEndDate && <EM_SetStartDateAndEndDate show_3={showPopup_3} handleClose_3={togglePopup_3} hallId={hallId} setSelectStartAndEndDate={setSelectStartAndEndDate}/>}
          {selectUnavailableDate && <EM_SetHallUnavailableDate show_5={showPopup_5} handleClose_5={togglePopup_5} hallId={hallId} setSelectUnavailableDate={setSelectUnavailableDate}/>}
        </div>
      );
    };
    
    export default EM_SelectMaintainDateType;