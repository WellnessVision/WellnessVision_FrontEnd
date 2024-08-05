import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './HP_AddPhysicalEvent.css';
import { useToggle } from '../../pages/HP/useToggle';
import HallAvailability from '../../components/HP_HallAvailability';
import './HP_AddPhysicalEventDateSelection.css'
import HP_SelectOneHallForPhysicalEvent from '../../components/HP_SelectOneHallForPhysicalEvent';

interface HP_AddPhysicalEventProps {
    show: boolean;
    handleClose: () => void;
    children?: React.ReactNode;
}

interface HallDetails {
    hall_id: string;
    capacity: number;
    charge: number;
    advance_percentage: number;
    state: string;
  }

const HP_AddPhysicalEventDateSelection: React.FC<HP_AddPhysicalEventProps> = ({ show, handleClose, children }) => {
    const [showPopup_2, togglePopup_2] = useToggle();
    const [eventTitle, setEventTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [otherEventType, setOtherEventType] = useState('');
    const [finalEventType, setFinalEventType] = useState('');
    const [hallType, setHallType] = useState('');
    const [expectedCapacity, setExpectedCapacity] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [date, setDate] = useState('');
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
    const [halls, setHalls] = useState<HallDetails[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);

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
        setDate('');
        setStartTime('');
        setEndTime('');
        setDuration('');
        setExpectedCapacity('');
        setTicketPrice('');
        setMessage('');
        setHalls([]);
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

    const dateChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setDate(e.target.value);
            setHalls([]);
            try {
                const response = await axios.get<HallDetails[]>(`http://localhost:15000/checkTheEventHallUsingDateForPhysicalEvent`, {
                    params: { hallType: hallType, date: e.target.value }
                });
                setHalls(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }
    };    

    const hallTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setHallType(e.target.value);
            setHalls([]);
            try {
                const response = await axios.get<HallDetails[]>(`http://localhost:15000/checkTheEventHallUsingDateForPhysicalEvent`, {
                    params: { hallType: e.target.value, date: date }
                });
                setHalls(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }
    }; 
    
    const handleViewDetailsClick = (hallId: string) => {
        setSelectedHallId(hallId);
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
                        <h1 className="hp_header_HP_AddPhysicalEvent hp_header">Add New Physical Event</h1>
                        <form>
                            <div className="name-group">
                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Select the Hall Type</label>
                                    <select
                                        id="HallType"
                                        className="form-control"
                                        value={hallType}
                                        required
                                        onChange={hallTypeChange}
                                    >
                                        <option value="" disabled>Hall Type</option>
                                        <option value="Lecture">Lecture Hall (Tables and Chairs)</option>
                                        <option value="Therapy">Therapy Hall (Therapy Beds)</option>
                                        <option value="Free Space">Free Space Hall (Yoga Mats)</option>
                                    </select>
                                </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label">Event Date (The date should be tomorrow or later)</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="EventDate"
                                    placeholder="Event Date (The date should be tomorrow or later)"
                                    required
                                    value={date}
                                    min={minDate}
                                    onChange={dateChange}
                                />
                            </div>
                            </div>
                            {hallType && date ? (
                            <div className="cardHang HP_AddPhysicalEventDateSelectionCardHang" style={{ width: '100%' }}>
                                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Available Halls</p>
                                    {halls.length > 0 ? (
                                        halls.map(hall => (
                                            <div className="card particepationMarkCards HP_AddPhysicalEventDateSelectionCard" style={{ width: '100%' }} key={hall.hall_id}>
                                                <div className="card-body card-body participantDetailsFlexContainer HP_AddPhysicalEventDateSelectionCardBody">
                                                <h5 className="card-title">Hall Id: {hall.hall_id}</h5>
                                                <h5 className="card-title">Max Capacity: {hall.capacity}</h5>
                                                <h5 className="card-title">Hourly Charge: Rs.{hall.charge}/=</h5>
                                                <h5 className="card-title">Advance Precentage: {hall.advance_percentage}%</h5>
                                                { hall.state == "fullyBooked" ? (
                                                    <h5 className="HP_AddPhysicalEventDateSelectionSorryMessage">Fully Booked</h5>
                                                ) : ( 
                                                    <a className="btn btn-warning HP_AddPhysicalEventDateSelectionBookButton" onClick={() => handleViewDetailsClick(hall.hall_id)}><i className="bi bi-bag-plus-fill"></i> Book</a>
                                                ) }
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Halls are available</p>
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
                        <HP_SelectOneHallForPhysicalEvent 
                        show_2={showPopup_2} 
                        handleClose_2={togglePopup_2} 
                        HallId={selectedHallId} 
                        EventDate={date}
                        showLoadingPopupflag = {toggleLoadingPopup}
                        />}
        </div>
    );
};

export default HP_AddPhysicalEventDateSelection;
