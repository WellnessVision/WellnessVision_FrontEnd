import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './HP_AddPhysicalEvent.css';
import { useToggle } from '../../pages/HP/useToggle';
import HallAvailability from '../../components/HP_HallAvailability';

interface HP_AddPhysicalEventProps {
    show: boolean;
    handleClose: () => void;
    children?: React.ReactNode;
}

const HP_AddPhysicalEvent: React.FC<HP_AddPhysicalEventProps> = ({ show, handleClose, children }) => {
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

    const handleAddPhysicalEvent = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsButtonDisabled(true);

        if (!eventImage) {
            setMessage('Please select an image file');
            return;
        }

        try {
            
            const nullImage = "pending";
            const hpId = Number(localStorage.getItem('hpId'));

            const response = await axios.post('http://localhost:15000/physicalEvent', {
                eventTitle,
                finalEventType,
                hallType,
                date,
                startTime,
                endTime,
                finalDuration,
                expectedCapacity,
                ticketPrice,
                language,
                eventDescription,
                hpId,
                nullImage,
                accountNumber,
                accountOwnerName,
                branchName,
                bankName
            });

            setEventData(response.data);
            togglePopup_2();
        } catch (error) {
            setMessage('Error registering event');
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

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner" id='popup-inner_HP_AddPhysicalEvent'>
                <button className="btn btn-danger close-btn" onClick={() => { handleClose(); ClearAll(); }}>
                    <i className="bi bi-x-lg closeAddEvent"></i>
                </button>
                <div className="hp_form">
                    <div className="form_div hp_form_padding_HP_addPhysicalEvent">
                        <h1 className="hp_header_HP_AddPhysicalEvent hp_header">Add New Physical Event</h1>
                        <form onSubmit={handleAddPhysicalEvent}>
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
                                    <select
                                        id="HallType"
                                        className="form-control"
                                        value={hallType}
                                        required
                                        onChange={(e) => { setHallType(e.target.value); setIsButtonDisabled(false); }}
                                    >
                                        <option value="" disabled>Hall Type</option>
                                        <option value="Lecture">Lecture Hall (Tables and Chairs)</option>
                                        <option value="Therapy">Therapy Hall (Therapy Beds)</option>
                                        <option value="Free Space">Free Space Hall (Yoga Mats)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group EventDate_HP_addPhysicalEvent_for_hp">
                                <label htmlFor="exampleInputPassword1" className="form-label event_date_HP_AddPhysicalEvent">Event Date (The date should be tomorrow or later)</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="EventDate"
                                    placeholder="Event Date (The date should be tomorrow or later)"
                                    required
                                    value={date}
                                    min={minDate}
                                    onChange={(e) => { setDate(e.target.value); setIsButtonDisabled(false); }}
                                />
                            </div>
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
                            <div className='HP_AddPhysicalEventPaddingToExpectedCapacity'>
                            {message && !duration && <p className="time_wrong_addEvent">{message}</p>}
                            </div>
                            <div className="name-group capasity_HP_addPhysicalEvent">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        max={1000}
                                        min={1}
                                        className="form-control"
                                        id="ExpectedCapacity"
                                        placeholder="Expected participant Count (Max = 1000)"
                                        required
                                        value={expectedCapacity}
                                        onChange={(e) => { setExpectedCapacity(e.target.value); setIsButtonDisabled(false); }}
                                    />
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
                            <button type="submit" className="btn btn-primary submit_button_HP_addPhysicalEvent" disabled={isButtonDisabled}>Check Hall Availability</button>
                        </form>
                        <HallAvailability show_2={showPopup_2} handleClose_2={togglePopup_2} handleClose={handleClose} eventData={eventData} finalDuration={parseInt(finalDuration)}  eventImage={eventImage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HP_AddPhysicalEvent;
