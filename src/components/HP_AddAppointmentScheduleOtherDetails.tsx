import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import { useToggle } from '../pages/HP/useToggle';
import HallAvailability from '../components/HP_HallAvailability';
import { useNavigate } from 'react-router-dom';
import loading_gif from '../resources/prosecing.gif';
import './HP_AddPhysicalEventOtherDetails.css'

interface HP_AddPhysicalEventOtherDetailsProps {
    show_4: boolean;
    handleClose_4: () => void;
    eventData: any;
    advancePayment: number;
    totalCharge: number;
}

const HP_AddAppointmentScheduleOtherDetails: React.FC<HP_AddPhysicalEventOtherDetailsProps> = ({ show_4, handleClose_4, eventData, advancePayment, totalCharge }) => {
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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showLoadingPopup, setShowLoadingPopup] = useState(false);
    const hpId = String(localStorage.getItem('hpId'));
    const hpEmail = String(localStorage.getItem('hpEmail'));
    const [eventId, setEventId] = useState('');
    const [maxPatientCount, setMaxPatientCount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
          setEventId(eventData.event_id);
      }, [eventData]);


    const handleOrderPhysicalEvent = async (event: FormEvent) => {
        event.preventDefault();
        setShowLoadingPopup(true);
        if (eventData.event_id) {
          try {
  
            const formData = new FormData();
       
            formData.append('appointmentId', eventData.event_id);
            formData.append('totalRoomCharge', totalCharge.toString());
            formData.append('advance_percentage', eventData.advance_percentage.toString());
            formData.append('advance_payment', advancePayment.toString());
            formData.append('hpId', hpId);
            formData.append('title', eventTitle);
            formData.append('maxPatientCount', maxPatientCount);
            formData.append('ticketPrice', ticketPrice);
            formData.append('accountNumber', accountNumber);
            formData.append('accountHolderName', accountOwnerName);
            formData.append('branch', branchName);
            formData.append('bank', bankName);
    
            await axios.post('http://localhost:15000/updateAppointmentScheduleOtherDetailsForHp', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setShowLoadingPopup(false);
            navigate(`/HP_ViewOneAppointmentScheduleDetails/${eventId}`);
          } catch (error) {
            setMessage('Error registering event');
          }
        }
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
        setDate('');
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

    const handleCancelPhysicalEvent = async (event: FormEvent) => {
        event.preventDefault();
        if (eventId) {
          try {
            await axios.put('http://localhost:15000/physicalEvent', {
             eventId
            });
            handleClose_4();
          } catch (error) {
            setMessage('Error registering event');
          }
        }
      };

    return (
        <div className={`popup ${show_4 ? 'show HP_AddPhysicalEventOtherDetailsPopup' : ''}`}>
            <div className="popup-inner HP_AddPhysicalEventOtherDetailspopup_inner" id='popup-inner_HP_AddPhysicalEvent'>
                <div className="hp_form HP_AddPhysicalEventOtherDetailspopup_inner">
                    <div className="form_div hp_form_padding_HP_addPhysicalEvent HP_AddPhysicalEventOtherDetailspopup_inner">
                        <h1 className="hp_header_HP_AddPhysicalEvent hp_header">Add New Physical Event</h1>
                        <form onSubmit={handleOrderPhysicalEvent}>
                        <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="EventTitle"
                                    placeholder="Appointment Title"
                                    required
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                />
                            </div>
                            <div className="name-group">
                            <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            min={1}
                                            className="form-control"
                                            id="TicketPrice"
                                            placeholder="Max Patient Count (Pre Day)"
                                            required
                                            value={maxPatientCount}
                                            onChange={(e) => setMaxPatientCount(e.target.value)}
                                        />
                                    </div>
                               </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text RsTag_addEvent">Rs.</div>
                                        </div>
                                        <input
                                            type="number"
                                            min={1}
                                            className="form-control"
                                            id="TicketPrice"
                                            placeholder="Booking Price (Pre Patient)"
                                            required
                                            value={ticketPrice}
                                            onChange={(e) => setTicketPrice(e.target.value)}
                                        />
                                    </div>
                               </div>
                        </div>
                            <p className='Money_receipts_details_HP_addPhysicalEvent'>Money receipts details</p>
                            <div className="name-group Money_receipts_details_HP_addPhysicalEvent">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control language_HP_addPhysicalEvent"
                                    id="EventLanguage"
                                    placeholder="Account Number"
                                    required
                                    value={accountNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control language_HP_addPhysicalEvent"
                                    id="EventLanguage"
                                    placeholder="Account Holder Name"
                                    required
                                    value={accountOwnerName}
                                    onChange={(e) => setAccountOwnerName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control language_HP_addPhysicalEvent"
                                    id="EventLanguage"
                                    placeholder="Branch Name"
                                    required
                                    value={branchName}
                                    onChange={(e) => setBranchName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control language_HP_addPhysicalEvent"
                                    id="EventLanguage"
                                    placeholder="Bank Name"
                                    required
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                />
                            </div>
                                </div>
                             <button className="btn btn-primary HP_HallAvailability_cancel_button HP_AddPhysicalEventOtherDetails_cancel_button" onClick={handleClose_4}><i className="bi bi-arrow-left-circle"></i> Cancel</button>
                            <button type="submit"className="btn btn-warning HP_HallAvailability_hallBook HP_AddPhysicalEventOtherDetails_hallBook" disabled={isButtonDisabled}><i className="bi bi-bag-plus-fill"></i> Continue</button>
                        </form>
                    </div>
                </div>
            </div>
            {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
        </div>
    );
};

export default HP_AddAppointmentScheduleOtherDetails;
