import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './HP_AddPhysicalEvent.css';
import { useToggle } from '../../pages/HP/useToggle';
import HallAvailability from '../../components/HP_HallAvailability';
import './HP_AddPhysicalEventDateSelection.css'
import HP_SelectOneHallForPhysicalEvent from '../../components/HP_SelectOneHallForPhysicalEvent';
import './HP_AddAppointmentSchedulesDateSelection.css'
import HP_SelectOneRoomForAppointmentSchedules from '../../components/HP_SelectOneRoomForAppointmentSchedules';

interface HP_AddPhysicalEventProps {
    show: boolean;
    handleClose: () => void;
    children?: React.ReactNode;
}

interface RoomDetails {
    roomId: string;
    roomType: string;
    charge: number;
    advancePercentage: number;
    state: string;
  }

const HP_AddAppointmentSchedulesDateSelection: React.FC<HP_AddPhysicalEventProps> = ({ show, handleClose, children }) => {
    const [showPopup_2, togglePopup_2] = useToggle();
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
    const [eventData, setEventData] = useState<any>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [rooms, setRooms] = useState<RoomDetails[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [sun, setSun] = useState<number>(5);
    const [mon, setMon] = useState<number>(5);
    const [tues, setTues] = useState<number>(5);
    const [wed, setWed] = useState<number>(5);
    const [thurs, setThurs] = useState<number>(5);
    const [fri, setFri] = useState<number>(5);
    const [sat, setSat] = useState<number>(5);

    const handleDayChange = (day: string, setDay: React.Dispatch<React.SetStateAction<number>>) => {
        setDay((prev) => (prev === 5 ? 1 : 5));
        
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
        setRooms([]);
        setSun(5);
        setMon(5);
        setTues(5);
        setWed(5);
        setThurs(5);
        setFri(5);
        setSat(5);
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

  
    const hallTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setHallType(e.target.value);
            setRooms([]);
            try {
                const response = await axios.get<RoomDetails[]>(`http://localhost:15000/getAllAvailableRoomsForOneRoomTypeForHp`, {
                    params: { roomType: e.target.value }
                });
                setRooms(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }
    }; 
    
    const handleViewDetailsClick = (roomId: string) => {
        setSelectedRoomId(roomId);
        toggleLoadingPopup(true);
        togglePopup_2();
      };

    return (
        <div className={`popup  ${show ? 'show HP_AddPhysicalEventDateSelectionPopupSection' : ''}`}>
            <div className="popup-inner HP_AddPhysicalEventDateSelectionPopup" id='popup-inner_HP_AddPhysicalEvent'>
                <button className="btn btn-danger close-btn" onClick={() => { handleClose(); ClearAll(); }}>
                    <i className="bi bi-x-lg closeAddEvent"></i>
                </button>
                <div className="hp_form HP_AddPhysicalEventDateSelectionPopup">
                    <div className="form_div hp_form_padding_HP_addPhysicalEvent HP_AddPhysicalEventDateSelectionPopup">
                        <h1 className="hp_header_HP_AddPhysicalEvent hp_header">Add New Appointment Schedule</h1>
                        <form>
                            <div className="name-group">
                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Select the Room Type</label>
                                    <select
                                        id="HallType"
                                        className="form-control"
                                        value={hallType}
                                        required
                                        onChange={hallTypeChange}
                                    >
                                        <option value="" disabled>Room Type</option>
                                        <option value="Discussion">Discussion Room (Table and Chairs)</option>
                                        <option value="Therapy">Therapy Room (Therapy Beds)</option>
                                        <option value="Free Space">Free Space Room (Yoga Mats)</option>
                                    </select>
                                </div>
                                <div className="HP_AddAppointmentSchedulesDateSelection_form-group">
                                    <label className="HP_AddAppointmentSchedulesDateSelection_form-label">Select The Appointment Schedules Days</label>
                                    <div className="HP_AddAppointmentSchedulesDateSelection_form-check-container">
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="sun"
                                                checked={sun === 1}
                                                onChange={() => handleDayChange('Sun', setSun)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="sun">Sun</label>
                                        </div>
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="mon"
                                                checked={mon === 1}
                                                onChange={() => handleDayChange('Mon', setMon)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="mon">Mon</label>
                                        </div>
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="tues"
                                                checked={tues === 1}
                                                onChange={() => handleDayChange('Tues', setTues)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="tues">Tues</label>
                                        </div>
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="wed"
                                                checked={wed === 1}
                                                onChange={() => handleDayChange('Wed', setWed)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="wed">Wed</label>
                                        </div>
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="thurs"
                                                checked={thurs === 1}
                                                onChange={() => handleDayChange('Thurs', setThurs)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="thurs">Thurs</label>
                                        </div>
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="fri"
                                                checked={fri === 1}
                                                onChange={() => handleDayChange('Fri', setFri)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="fri">Fri</label>
                                        </div>
                                        <div className="HP_AddAppointmentSchedulesDateSelection_form-check">
                                            <input
                                                type="checkbox"
                                                className="HP_AddAppointmentSchedulesDateSelection_form-check-input"
                                                id="sat"
                                                checked={sat === 1}
                                                onChange={() => handleDayChange('Sat', setSat)}
                                            />
                                            <label className="HP_AddAppointmentSchedulesDateSelection_form-check-label" htmlFor="sat">Sat</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {hallType && (sun == 1 || mon == 1 || tues == 1 || wed == 1 || thurs == 1 || fri == 1 || sat == 1) ? (
                            <div className="cardHang HP_AddPhysicalEventDateSelectionCardHang" style={{ width: '100%' }}>
                                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Available Halls</p>
                                    {rooms.length > 0 ? (
                                        rooms.map(room => (
                                            <div className="card particepationMarkCards HP_AddPhysicalEventDateSelectionCard" style={{ width: '100%' }} key={room.roomId}>
                                                <div className="card-body card-body participantDetailsFlexContainer HP_AddPhysicalEventDateSelectionCardBody">
                                                <h5 className="card-title">Room Id: {room.roomId}</h5>
                                                <h5 className="card-title">Hourly Charge: Rs.{room.charge}/=</h5>
                                                <h5 className="card-title">Advance Precentage: {room.advancePercentage}%</h5>
                                                <a className="btn btn-warning HP_AddPhysicalEventDateSelectionBookButton" onClick={() => handleViewDetailsClick(room.roomId)}><i className="bi bi-bag-plus-fill"></i> Book</a>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Rooms are available</p>
                                    )}
                                </div> ) : (
                                      <div className="cardHang HP_AddPhysicalEventDateSelectionCardHang" style={{ width: '100%' }}>
                                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Available Halls</p>
                                <h5 className="card-title">Please set the hall type and event date first</h5>
                                </div>
                                )}
                        </form>
                    </div>
                </div>
            </div>
            {showLoadingPopup && 
                        <HP_SelectOneRoomForAppointmentSchedules 
                        show_2={showPopup_2} 
                        handleClose_2={togglePopup_2} 
                        RoomId={selectedRoomId} 
                        sun={sun}
                        mon={mon}
                        tues={tues}
                        wed={wed}
                        thurs={thurs}
                        fri={fri}
                        sat={sat}
                        showLoadingPopupflag = {toggleLoadingPopup}
                        />}
        </div>
    );
};

export default HP_AddAppointmentSchedulesDateSelection;
