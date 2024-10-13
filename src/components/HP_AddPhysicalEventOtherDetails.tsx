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

const HP_AddPhysicalEventOtherDetails: React.FC<HP_AddPhysicalEventOtherDetailsProps> = ({ show_4, handleClose_4, eventData, advancePayment, totalCharge }) => {
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
    const navigate = useNavigate();

    useEffect(() => {
          setEventId(eventData.event_id);
      }, [eventData]);


    const handleOrderPhysicalEvent = async (event: FormEvent) => {
        event.preventDefault();
        setShowLoadingPopup(true);
        if (eventData.event_id) {
          try {
            if (!eventImage) {
              setMessage('Please select an image file');
              return;
            }
    
            const formData = new FormData();
            formData.append('file', eventImage);
            formData.append('event_id', eventData.event_id);
            formData.append('hall_capacity', eventData.capacity.toString());
            formData.append('total_hall_charge', totalCharge.toString());
            formData.append('advance_percentage', eventData.advance_percentage.toString());
            formData.append('advance_payment', advancePayment.toString());
            formData.append('userEmail', hpEmail);
            formData.append('hpId', hpId);
            formData.append('title', eventTitle);
            formData.append('eventType', eventType);
            formData.append('ticketPrice', ticketPrice);
            formData.append('language', language);
            formData.append('description', eventDescription);
            formData.append('accountNumber', accountNumber);
            formData.append('accountHolderName', accountOwnerName);
            formData.append('branch', branchName);
            formData.append('bank', bankName);
    
            await axios.post('http://localhost:15000/physicalEventImageUpload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setShowLoadingPopup(false);
            navigate(`/HP_OneEvents/${eventId}`);
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
                                    placeholder="Event Title"
                                    required
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                />
                            </div>
                            <div className="name-group">
                                <div className="form-group">
                                    <select
                                        id="EventType"
                                        className="form-control"
                                        value={eventType}
                                        required
                                        onChange={handleEventTypeChange}
                                    >
                                        <option value="" disabled>Event Type</option>
                                        <option value="Awareness Lecture">Awareness Lecture</option>
                                        <option value="Yoga Event">Yoga Event</option>
                                        <option value="Therapy Event">Therapy Event</option>
                                        <option value="Exercise Event">Exercise Event</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {eventType === 'Other' && (
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="OtherEventType"
                                            required
                                            placeholder="Please specify the event type"
                                            value={otherEventType}
                                            onChange={handleEventTypeChange_2}
                                        />
                                    </div>
                                )}
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
                                            placeholder="Ticket Price"
                                            required
                                            value={ticketPrice}
                                            onChange={(e) => setTicketPrice(e.target.value)}
                                        />
                                    </div>
                               </div>
                        </div>
                            <div className="name-group image_language_div_HP_addPhysicalEvent">
                            <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="form-label cover_image_HP_addPhysicalEvent">Cover Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    required
                                    id="exampleFormControlFile1"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control language_HP_addPhysicalEvent"
                                    id="EventLanguage"
                                    placeholder="Language"
                                    required
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                />
                            </div>
                            </div>
                            <div className="form-group EventDescription_add_physical_event_hp">
                                <textarea
                                    className="form-control"
                                    id="EventDescription"
                                    placeholder="Event Description"
                                    maxLength={1000}
                                    required
                                    value={eventDescription}
                                    onChange={(e) => setEventDescription(e.target.value)}
                                />
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
                             <button className="btn btn-primary HP_HallAvailability_cancel_button HP_AddPhysicalEventOtherDetails_cancel_button" onClick={handleClose_4}>Cancel</button>
                            <button type="submit"className="btn btn-warning HP_HallAvailability_hallBook HP_AddPhysicalEventOtherDetails_hallBook" disabled={isButtonDisabled}>Continue</button>
                        </form>
                    </div>
                </div>
            </div>
            {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
        </div>
    );
};

export default HP_AddPhysicalEventOtherDetails;
