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
import EM_SetReduceHallCapacity from './EM_SetReduceHallCapacity';
import EM_IncreasedHallCapacity from './EM_IncreasedHallCapacity';

interface Hp_DeletePhysicalEventFineDetailsProps {
  show_8: boolean;
  handleClose_8: () => void;
  hallId: any;
  setCapasityModificationType: any;
  roomDetails: any;
}

interface Event {
    setDateState: string;
    startDate: string;
    endDate: string;
}

const EM_SelectCapasityModificationType: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_8, handleClose_8, hallId, setCapasityModificationType, roomDetails}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));
    const [dateInput, setDateInput] = useState(false);
    const [showPopup_3, togglePopup_3] = useToggle();
    const [showPopup_5, togglePopup_5] = useToggle();
    const [showPopup_9, togglePopup_9] = useToggle();
    const [showPopup_11, togglePopup_11] = useToggle();
    const [selectStartAndEndDate, setSelectStartAndEndDate] = useState(false);
    const [selectUnavailableDate, setSelectUnavailableDate] = useState(false);
    const [eventData, setEventData] = useState<Event | null>(null);
    const [hallCapacityFlag, setHallCapacityFlag] = useState(false);
    const [increasedHallCapacityFlag, setIncreasedHallCapacityFlag] = useState(false);


    const handelCheckReduceHallCapacity =  useCallback(async () => {
        try {
            toggleLoadingPopup(true);
          const response = await axios.get<Event>(`http://localhost:15000/getLastBookDateOfHallForEventManager`, {
            params: { 
                hallId 
             }
          });
          setEventData(response.data);
          toggleLoadingPopup(false);
          togglePopup_9();
          setHallCapacityFlag(true);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
    }, []);

const handleClose = () => {
    setCapasityModificationType(false);
    handleClose_8();
  };

  const handleSelectStartAndEndDate = () => {
    setSelectStartAndEndDate(true);
    togglePopup_3();
  };

  const handelIncreasedHallCapacity = () => {
    setIncreasedHallCapacityFlag(true);
    togglePopup_11();
  };
    
return (
        <div className={`popup ${show_8 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`} style={{ zIndex: '0' }}>
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
                   <i className="bi bi-arrow-left-circle"></i> Close</button>
                <button className="btn btn-success participantDetailsviewMoreButton" style={{ marginLeft: '50px', width: '250px' }} 
                  onClick={() => handelIncreasedHallCapacity()}>
                    <i className="bi bi-chevron-double-up"></i> Increase Capacity</button>
                  <button className="btn btn-warning participantDetailsviewMoreButton" style={{ marginLeft: '50px' }}
                   onClick={handelCheckReduceHallCapacity}>
                    <i className="bi bi-chevron-double-down"></i> Reduce Capacity </button>
                  </div>)
                  : ''}
                </div>
              </div>
            </div>
          </div>
          {showLoadingPopup && <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} style={{zIndex: '3'}} src={loading_gif}/>}
          {selectStartAndEndDate && <EM_SetStartDateAndEndDate show_3={showPopup_3} handleClose_3={togglePopup_3} hallId={hallId} setSelectStartAndEndDate={setSelectStartAndEndDate}/>}
          {selectUnavailableDate && <EM_SetHallUnavailableDate show_5={showPopup_5} handleClose_5={togglePopup_5} hallId={hallId} setSelectUnavailableDate={setSelectUnavailableDate}/>}
          {hallCapacityFlag && <EM_SetReduceHallCapacity show_9={showPopup_9} handleClose_9={togglePopup_9} hallId={hallId} bookingDetails={eventData} roomDetails={roomDetails} setHallCapacityFlag={setHallCapacityFlag}/>}
          {increasedHallCapacityFlag && <EM_IncreasedHallCapacity show_11={showPopup_11} handleClose_11={togglePopup_9} hallId={hallId} roomDetails={roomDetails} setIncreasedHallCapacityFlag={setIncreasedHallCapacityFlag}/>}
        </div>
      );
    };
    
    export default EM_SelectCapasityModificationType;