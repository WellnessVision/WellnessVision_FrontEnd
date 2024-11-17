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
import EM_HallCapacityRediceState from './EM_HallCapacityRediceState';

interface HP_EventBookingCloseProps {
  show_9: boolean;
  handleClose_9: () => void;
  hallId: any;
  bookingDetails: any;
  roomDetails: any;
  setHallCapacityFlag: any;
}

interface HallBookings {
     bookedDated: string;
  }

  interface Event {
    setDateState: string;
  }

const EM_SetReduceHallCapacity: React.FC<HP_EventBookingCloseProps> = ({ show_9, handleClose_9, hallId, bookingDetails, roomDetails, setHallCapacityFlag }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [newCapacity, setNewCapacity] = useState(roomDetails.capacity);
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
  const [showPopup_10, togglePopup_10] = useToggle();
  const [hallCapacityRediceStateFlag, setHallCapacityRediceStateFlag] = useState(false);

const checkHallAvailability = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoadingPopup(true);
    try {
        const response = await axios.get<Event>(`http://localhost:15000/CheckAndSetReduceHallCapacityOfHallForEventManager`, {
            params: { 
                hallId, 
                newCapacity
            }
        });
        setEventData(response.data);
        setShowLoadingPopup(false);
        togglePopup_10();
        setHallCapacityRediceStateFlag(true);
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
    setHallCapacityFlag(false);
    handleClose_9();
  };


const handleClear = () => {
    setNewCapacity('');
    setIsButtonDisabled(false);
};

const ClearAll = () => {
    setNewCapacity('');
    setMessage('');
};

return (
    <div className={`popup ${show_9 ? 'show HP_SelectOneHallForPhysicalEventPopupLayer' : ''}`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
            <div className='HP_HallAvailability_div'>
            {bookingDetails.setDateState === "Yes" ? 
                <div>
                 <p className='HP_SelectOneHallForPhysicalEvent_SettheEventTime'>Reduce The Hall Capacity</p>
                 <div className="straight-line"></div>
                    <form onSubmit={checkHallAvailability}>
                    <div className="name-group">
                        <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="form-label">New Capacity
                            <span> <input
                                type='number'
                                id="StartTime"
                                className="form-control"
                                max={roomDetails.capacity}
                                value={newCapacity}
                                required
                                style={{width: '250px', marginLeft: '25px'}}
                                onChange={(e) => setNewCapacity(e.target.value)}
                            /></span></label>
                        </div>
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
            : 
            <div>
                 <div>
                  <p className='Unfortunately_header_HP_HallAvailability'>Fail to Reduce The Capacity</p>
                  <div className="straight-line"></div>
                  <p className='Unfortunately_text_HP_HallAvailability' style={{marginTop: '15px'}}>Can't reduce capacity before <span style={{color: 'red'}}>{bookingDetails.startDate}</span>, Because there are already booked physical events till <span style={{color: 'red'}}>{bookingDetails.startDate}</span></p>
                  <div className='HP_HallAvailability_button_div'>
                  <button
                    type="button"
                    className="btn btn-primary HP_HallAvailability_cancel_button eventCloseMessageCloseButton"
                    onClick={canselDetailsClick}>
                    <i className="bi bi-arrow-left-circle"></i> Cancel
                    </button>
                  </div>
                </div>
            </div>}
            </div>
          </div>
        </div>
      </div>
      {hallCapacityRediceStateFlag && <EM_HallCapacityRediceState show_10={showPopup_10} handleClose_10={togglePopup_10} eventData={eventData} hallId={hallId} newCapacity={newCapacity}/>}
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default EM_SetReduceHallCapacity;