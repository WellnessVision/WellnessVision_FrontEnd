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
import AM_UnavailableDateUpdateState from './AM_UnavailableDateUpdateState';

interface HP_EventBookingCloseProps {
  show_5: boolean;
  handleClose_5: () => void;
  roomId: any;
  setSelectUnavailableDate: any;
}

interface HallBookings {
     bookedDated: string;
  }

  interface Event {
    setDateState: string;
    startDate: string;
  }

const AM_SetRoomUnavailableDate: React.FC<HP_EventBookingCloseProps> = ({ show_5, handleClose_5, roomId, setSelectUnavailableDate }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [hallBookings, setHallBookings] = useState<HallBookings[]>([]);
  const [unavailableDate, setUnavailableDate] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [minDate, setMinDate] = useState('');
  const [finalDuration, setFinalDuration] = useState('');
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const hpId = Number(localStorage.getItem('hpId'));
  const [showPopup_6, togglePopup_6] = useToggle();
  const [unavailableDatesUpdateFlag, setUnavailableDatesUpdateFlag] = useState(false);

  const fetchEvents =  useCallback(async () => {
    try {
      const response = await axios.get<HallBookings[]>(`http://localhost:15000/getAlreadyBookedDatesOfOneRoomForAppointmentManager`, {
        params: { 
           roomId 
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
        const response = await axios.get<Event>(`http://localhost:15000/checkAndSetUnavailableDateOfRoomsForAppointmentManager`, {
            params: { 
                roomId, 
                unavailableDate
            }
        });
        setEventData(response.data);
        setUnavailableDatesUpdateFlag(true);
        togglePopup_6();
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
    setSelectUnavailableDate(false);
    handleClose_5();
  };


const handleClear = () => {
    setUnavailableDate('');
    setIsButtonDisabled(false);
};

const ClearAll = () => {
    setUnavailableDate('');
    setMessage('');
};

return (
    <div className={`popup ${show_5 ? 'show HP_SelectOneHallForPhysicalEventPopupLayer' : ''}`}>
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
            ))) : ('')}
            <div className="straight-line"></div>
            <p className='HP_SelectOneHallForPhysicalEvent_SettheEventTime'>Set Unavailable Date</p>
            <form onSubmit={checkHallAvailability}>
             <div className="name-group">
                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Unavailable Date
                                   <span> <input
                                        type='date'
                                        id="StartTime"
                                        className="form-control"
                                        min={minDate}
                                        value={unavailableDate}
                                        required
                                        disabled={!!unavailableDate}
                                        style={{width: '250px', marginLeft: '25px'}}
                                        onChange={(e) => setUnavailableDate(e.target.value)}
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
                    <i className="bi bi-bag-plus-fill"></i> Update
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
      {unavailableDatesUpdateFlag && <AM_UnavailableDateUpdateState show_6={showPopup_6} handleClose_6={togglePopup_6} eventData={eventData} roomId={roomId}/>}
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default AM_SetRoomUnavailableDate;