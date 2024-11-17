import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../components/HP_HallAvailability.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css';
import '../../../components/HP_EventBookingClose.css';
import '../../../components/HP_SelectOneHallForPhysicalEvent.css'
import { useToggle } from '../../HP/useToggle';
import HP_RoomAvailability from '../../../components/HP_RoomAvailability';
import loading_gif from '../../../resources/prosecing.gif';
import { setDate } from 'date-fns';
import EM_MaintainDateUpdateState from './EM_MaintainDateUpdateState';

interface HP_EventBookingCloseProps {
  show_3: boolean;
  handleClose_3: () => void;
  hallId: any;
  setSelectStartAndEndDate: any;
}

interface HallBookings {
     bookedDated: string;
  }

  interface Event {
    setDateState: string;
    startDate: string;
    endDate: string;
  }

const EM_SetStartDateAndEndDate: React.FC<HP_EventBookingCloseProps> = ({ show_3, handleClose_3, hallId, setSelectStartAndEndDate }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [hallBookings, setHallBookings] = useState<HallBookings[]>([]);
  const [startDate, setStartDate] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [minDate, setMinDate] = useState('');
  const [minEndDate, setMinEndDate] = useState('');
  const [finalDuration, setFinalDuration] = useState('');
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const hpId = Number(localStorage.getItem('hpId'));
  const [showPopup_4, togglePopup_4] = useToggle();
  const [datesUpdateFlag, setSatesUpdateFlag] = useState(false);

  const fetchEvents =  useCallback(async () => {
    try {
      const response = await axios.get<HallBookings[]>(`http://localhost:15000/getAlreadyBookedDatesOfOneHallForEventManager`, {
        params: { 
           hallId 
         }
      });
      setHallBookings(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const checkHallAvailability = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoadingPopup(true);
    try {
        const response = await axios.get<Event>(`http://localhost:15000/checkAndSetMaintenanceDateOfHallForEventManager`, {
            params: { 
                hallId, 
                startDate, 
                endDate
            }
        });
        setEventData(response.data);
        setSatesUpdateFlag(true);
        togglePopup_4();
        setShowLoadingPopup(false);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
    }
};

useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate());
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
}, []);

  const canselDetailsClick = () => {
    setSelectStartAndEndDate(false);
    handleClose_3();
  };

  const handleSetDays = (selectedStartDate: string) => {
    setStartDate(selectedStartDate);
    setMinEndDate(selectedStartDate);
};


const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setIsButtonDisabled(false);
};

const ClearAll = () => {
    setStartDate('');
    setEndDate('');
    setMessage('');
};

return (
    <div className={`popup ${show_3 ? 'show HP_SelectOneHallForPhysicalEventPopupLayer' : ''}`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
            <p className='HP_SelectOneHallForPhysicalEvent_AvailableTimeHeading'>Booking Days</p>
            <div className='HP_HallAvailability_div'>
            { hallBookings.length > 0 ? (
            hallBookings.map(hallBooking => (
                <div>
                    <p className='HP_SelectOneHallForPhysicalEvent_BookingTime'>{hallBooking.bookedDated}</p>
                </div>
            ))) : (<p>No Booking Days</p>)}
            <div className="straight-line"></div>
            <p className='HP_SelectOneHallForPhysicalEvent_SettheEventTime'>Set Start Date and End Date</p>
            <form onSubmit={checkHallAvailability}>
             <div className="name-group">
                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Start Date
                                   <span> <input
                                        type='date'
                                        id="StartTime"
                                        className="form-control"
                                        min={minDate}
                                        value={startDate}
                                        required
                                        onChange={(e) => handleSetDays(e.target.value)}
                                        disabled={!!endDate}
                                    /></span></label>
                                </div>
                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">End Date
                                   <span><input
                                        type='date'
                                        id="EndTime"
                                        className="form-control"
                                        value={endDate}
                                        required
                                        min={minEndDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        disabled={!startDate}
                                    /></span></label>
                                </div>
                                <button type="button" className="btn btn-primary clear_button_addEvent" onClick={handleClear}  style={{marginTop: '30px'}}>
                                    <span className="clear_button_text_addEvent">Clear</span>
                                </button>
                            </div>
              <button
                type="button"
                className="btn btn-primary HP_HallAvailability_cancel_button eventCloseMessageCloseButton"
                onClick={canselDetailsClick}>
                <i className="bi bi-arrow-left-circle"></i> Cancel
              </button>
              <button
                    type="submit"
                    className="btn btn-warning HP_SelectOneHallForPhysicalEventBookingButton" style={{width: '150px'}}>
                     <i className="bi bi-floppy-fill"></i> Update
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
      {datesUpdateFlag && <EM_MaintainDateUpdateState show_4={showPopup_4} handleClose_4={togglePopup_4} eventData={eventData} hallId={hallId}/>}
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default EM_SetStartDateAndEndDate;