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
import AM_MaintainDateUpdateState from './AM_MaintainDateUpdateState';

interface HP_EventBookingCloseProps {
  show_8: boolean;
  handleClose_8: () => void;
  setAddnewRoomFlag: any;
}

interface HallBookings {
     bookedDated: string;
  }

  interface Event {
    setDateState: string;
    startDate: string;
    endDate: string;
  }

const AM_AddNewAppointmentRoom: React.FC<HP_EventBookingCloseProps> = ({ show_8, handleClose_8, setAddnewRoomFlag }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [hallBookings, setHallBookings] = useState<HallBookings[]>([]);
  const [roomId, setRoomId] = useState('');
  const [roomType, setRoomType] = useState('');
  const [charge, setCharge] = useState('');
  const [advancePercentage, setAdvancePercentage] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('');
  const [finalDuration, setFinalDuration] = useState('');
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const hpId = Number(localStorage.getItem('hpId'));
  const [showPopup_4, togglePopup_4] = useToggle();
  const [datesUpdateFlag, setSatesUpdateFlag] = useState(false);

  const checkHallAvailability = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoadingPopup(true);
    try {
        navigate('/HP_LodingPage');
        await axios.post(`http://localhost:15000/addNewAppointmentRoomForAppointmentManager`, null, {
            params: {  
                roomId,
                roomType,
                charge, 
                advancePercentage
            }
        });
        navigate(`/AM_ViewAllAppointmentScheduleOfRoom/${roomId}`);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
    }
};


const canselDetailsClick = () => {
    setAddnewRoomFlag(false);
    handleClose_8();
  };


const handleClear = () => {
    setCharge('');
    setAdvancePercentage('');
    setIsButtonDisabled(false);
};

const ClearAll = () => {
    setCharge('');
    setAdvancePercentage('');
    setMessage('');
};

return (
    <div className={`popup ${show_8 ? 'show HP_SelectOneHallForPhysicalEventPopupLayer' : ''}`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
            <p className='HP_SelectOneHallForPhysicalEvent_AvailableTimeHeading'>New Appointment Room</p>
            <div className='HP_HallAvailability_div'>
            { hallBookings.length > 0 ? (
            hallBookings.map(hallBooking => (
                <div>
                    <p className='HP_SelectOneHallForPhysicalEvent_BookingTime'>{hallBooking.bookedDated}</p>
                </div>
            ))) : ('')}
            <div className="straight-line"></div>
            <form onSubmit={checkHallAvailability}>
             <div className="name-group">

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Room Id
                                   <span> <input
                                        type='text'
                                        id="StartTime"
                                        className="form-control"
                                        value={roomId}
                                        required
                                        placeholder='Room Id'
                                        onChange={(e) => setRoomId(e.target.value)}
                                    /></span></label>
                                </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Room Type
                                   <span> 
                                   <select
                                        id="HallType"
                                        className="form-control"
                                        value={roomType}
                                        required
                                        onChange={(e) => setRoomType(e.target.value)}
                                    >
                                        <option value="" disabled>Room Type</option>
                                        <option value="Discussion">Discussion Room (Table and Chairs)</option>
                                        <option value="Therapy">Therapy Room (Therapy Beds)</option>
                                        <option value="Free Space">Free Space Room (Yoga Mats)</option>
                                    </select>
                                    </span></label>
                            </div>
                        </div>
                        <div className="name-group">
                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Charge Per Hour (Rs.)
                                   <span> 
                                    <input
                                        type='number'
                                        id="StartTime"
                                        className="form-control"
                                        min={1}
                                        value={charge}
                                        required
                                        placeholder='Charge Per Hour (Rs.)'
                                        onChange={(e) => setCharge(e.target.value)}
                                    /></span></label>
                                </div>

                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Advance Percentage
                                   <span><input
                                        type="number"
                                        step="any"
                                        id="EndTime"
                                        className="form-control"
                                        value={advancePercentage}
                                        required
                                        min={0.1}
                                        placeholder='Advance Percentage'
                                        onChange={(e) => setAdvancePercentage(e.target.value)}
                                        style={{width: '235px'}}
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
                    <i className="bi bi-floppy-fill"></i> Save
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default AM_AddNewAppointmentRoom;