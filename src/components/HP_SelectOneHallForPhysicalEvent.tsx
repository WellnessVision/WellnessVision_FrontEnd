import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loading_gif from '../resources/prosecing.gif';
import './HP_HallAvailability.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css';
import '../components/HP_EventBookingClose.css';
import './HP_SelectOneHallForPhysicalEvent.css'
import { useToggle } from '../pages/HP/useToggle';
import HallAvailability from '../components/HP_HallAvailability';

interface HP_EventBookingCloseProps {
  show_2: boolean;
  handleClose_2: () => void;
  HallId: any;
  EventDate: any;
  showLoadingPopupflag: any;
}

interface HallBookings {
    startTime: number;
    endTime :number;
  }

  interface Event {
    hall_id: string;
    hall_type: string;
    capacity: number;
    charge: number;
    event_id: number;
    advance_percentage: number;
  }

const HP_SelectOneHallForPhysicalEvent: React.FC<HP_EventBookingCloseProps> = ({ show_2, handleClose_2, HallId, EventDate, showLoadingPopupflag }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [hallBookings, setHallBookings] = useState<HallBookings[]>([]);
  const [startValue, setStartValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [otherEventType, setOtherEventType] = useState('');
  const [finalEventType, setFinalEventType] = useState('');
  const [hallType, setHallType] = useState('');
  const [expectedCapacity, setExpectedCapacity] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [minDate, setMinDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState<JSX.Element | null>(null);
  const [accountOwnerName, setAccountOwnerName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [bankName, setBankName] = useState('');
  const [finalDuration, setFinalDuration] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const hpId = Number(localStorage.getItem('hpId'));
  const [showPopup_3, togglePopup_3] = useToggle();

  const fetchEvents =  useCallback(async () => {
    try {
      const response = await axios.get<HallBookings[]>(`http://localhost:15000/getHallBookingAvailableSlotsForGivenHallAndDate`, {
        params: { hallId: HallId, date: EventDate }
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
        const response = await axios.get<Event>(`http://localhost:15000/checkAndTemporarilyBookingEventHall`, {
            params: { hpId, hallId: HallId, date: EventDate, startTime : Number(startTime), endTime : Number(endTime), duration: Number(finalDuration)}
        });
        setEventData(response.data);
        togglePopup_3();
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
    if (startTime && endTime) {
        const start = parseInt(startTime);
        const end = parseInt(endTime);
        if (start < end) {
            const durationHours = end - start;
            setDuration(`${durationHours} hour(s)`);
            setFinalDuration(`${durationHours}`);
        } else {
            setDuration('');
        }
    }
}, [startTime, endTime]);

useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
}, []);

  const canselDetailsClick = () => {
    showLoadingPopupflag(false);
    handleClose_2();
  };

  const handleNextBooking = () => {
    setStartValue((startValue) => startValue + 1);
};

const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const end = e.target.value;
    const start = parseInt(startTime);
    if (parseInt(end) > start) {
        setEndTime(end);
    } else {
        setEndTime('');
        setMessage('End time must be greater than start time');
    }
};

const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const accountNumberRegex = /^\d+$/;

    if (!accountNumberRegex.test(value)) {
        setAccountNumberError(
            <div>
                <span>Account number must be a number</span><br />
            </div>
        );
    } else {
        setAccountNumberError(null);
    }

    setAccountNumber(value);
};

const handleClear = () => {
    setStartTime('');
    setEndTime('');
    setDuration('');
    setIsButtonDisabled(false);
};

const ClearAll = () => {
    setEventTitle('');
    setEventType('');
    setOtherEventType('');
    setHallType('');
    setStartTime('');
    setEndTime('');
    setDuration('');
    setExpectedCapacity('');
    setTicketPrice('');
    setMessage('');
};

const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setEventType(selectedType);
    setFinalEventType(selectedType);
};

const handleEventTypeChange_2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setOtherEventType(selectedType);
    setFinalEventType(selectedType);
};

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setEventImage(e.target.files[0]);
    }
};
  

  return (
    <div className={`popup ${show_2 ? 'show HP_SelectOneHallForPhysicalEventPopupLayer' : ''}`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
            <p>Those times are already Booked</p>
            <div className='HP_HallAvailability_div'>
            { hallBookings.length > 0 ? (
            hallBookings.map(hallBooking => (
                <div>
                    <p className='HP_SelectOneHallForPhysicalEvent_BookingTime'>{formatTime(hallBooking.startTime)} - {formatTime(hallBooking.endTime)}</p>
                </div>
            ))) : (<div><p className='HP_SelectOneHallForPhysicalEvent_BookingTime'>No Alrady Bookings for that day</p></div>)}
            <div className="straight-line"></div>
            <p>Set Your Event Time</p>
            <form onSubmit={checkHallAvailability}>
             <div className="name-group">
                                <div className="form-group">
                                    <select
                                        id="StartTime"
                                        className="form-control"
                                        value={startTime}
                                        required
                                        onChange={(e) => setStartTime(e.target.value)}
                                        disabled={!!endTime}
                                    >
                                        <option value="" disabled>Start time</option>
                                        <option value="8">8:00 AM</option>
                                        <option value="9">9:00 AM</option>
                                        <option value="10">10:00 AM</option>
                                        <option value="11">11:00 AM</option>
                                        <option value="12">12:00 PM</option>
                                        <option value="13">1:00 PM</option>
                                        <option value="14">2:00 PM</option>
                                        <option value="15">3:00 PM</option>
                                        <option value="16">4:00 PM</option>
                                        <option value="17">5:00 PM</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        id="EndTime"
                                        className="form-control"
                                        value={endTime}
                                        required
                                        onChange={handleEndTimeChange}
                                        disabled={!startTime || !!duration}
                                    >
                                        <option value="" disabled>End time</option>
                                        <option value="9">9:00 AM</option>
                                        <option value="10">10:00 AM</option>
                                        <option value="11">11:00 AM</option>
                                        <option value="12">12:00 PM</option>
                                        <option value="13">1:00 PM</option>
                                        <option value="14">2:00 PM</option>
                                        <option value="15">3:00 PM</option>
                                        <option value="16">4:00 PM</option>
                                        <option value="17">5:00 PM</option>
                                        <option value="18">6:00 PM</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Duration"
                                        placeholder="Duration"
                                        readOnly
                                        disabled
                                        required
                                        value={duration}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary clear_button_addEvent" onClick={handleClear}>
                                    <span className="clear_button_text_addEvent">Clear</span>
                                </button>
                            </div>
                            {message && !duration && <p className="time_wrong_addEvent">{message}</p>}
              <button
                type="button"
                className="btn btn-primary HP_HallAvailability_cancel_button eventCloseMessageCloseButton"
                onClick={canselDetailsClick}>
                <i className="bi bi-arrow-left-circle"></i> Cancel
              </button>
              <button
                    type="submit"
                    className="btn btn-warning HP_SelectOneHallForPhysicalEventBookingButton">
                    <i className="bi bi-bag-plus-fill"></i> Make a Booking
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
      {showPopup_3 && <HallAvailability show_3={showPopup_3} handleClose_3={togglePopup_3} eventData={eventData} finalDuration={parseInt(finalDuration)}/>}
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default HP_SelectOneHallForPhysicalEvent;