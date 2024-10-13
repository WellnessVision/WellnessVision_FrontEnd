import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import { useToggle } from '../../../pages/HP/useToggle';
import HallAvailability from '../../../components/HP_HallAvailability';
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../../resources/prosecing.gif';
import '../../../components/HP_AddPhysicalEventOtherDetails.css'

interface HP_AddPhysicalEventOtherDetailsProps {
    show_5: boolean;
    handleClose_5: () => void;
    appointmentDetails: any;
    appointmentSchedule: any;
}

const NU_AddMoneyReseptsDetailsForAppointment: React.FC<HP_AddPhysicalEventOtherDetailsProps> = ({ show_5, handleClose_5, appointmentDetails, appointmentSchedule }) => {
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
    const userId = String(localStorage.getItem('userId'));
    const hpEmail = String(localStorage.getItem('hpEmail'));
    const [eventId, setEventId] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

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

    const addAppointmentBookingMoneyReceiptsDetails = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowLoadingPopup(true);
        try {
            navigate('/HP_LodingPage');
            await axios.put(`http://localhost:15000/addAppointmentBookingOtherDetailsAndSaveForNu`, null, {
              params: {
                bookingId: appointmentDetails.bookingId,
                userId,
                paidAmount: appointmentSchedule.bookingPrice,
                accountNumber,
                accountOwnerName,
                branchName,
                bankName
              }
            });
            // navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentDetails.bookingId}`);
            navigate('/NU_ViewHealthProfessionals');
          } 
          catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className={`popup ${show_5 ? 'show HP_AddPhysicalEventOtherDetailsPopup' : ''}`}>
            <div className="popup-inner HP_AddPhysicalEventOtherDetailspopup_inner" id='popup-inner_HP_AddPhysicalEvent'>
                <div className="hp_form HP_AddPhysicalEventOtherDetailspopup_inner">
                    <div className="form_div hp_form_padding_HP_addPhysicalEvent HP_AddPhysicalEventOtherDetailspopup_inner">
                        <h5 className="hp_header_HP_AddPhysicalEvent hp_header" style={{ fontSize: '22px', marginTop: '-58px' }}>Money receipts details</h5>
                        <form onSubmit={addAppointmentBookingMoneyReceiptsDetails}>
                            <p className='Money_receipts_details_HP_addPhysicalEvent'style={{marginTop: '1px' }}>Add a Bank Account Details</p>
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
                             <button className="btn btn-primary HP_HallAvailability_cancel_button HP_AddPhysicalEventOtherDetails_cancel_button" onClick={handleClose_5}>Cancel</button>
                            <button type="submit"className="btn btn-warning HP_HallAvailability_hallBook HP_AddPhysicalEventOtherDetails_hallBook" disabled={isButtonDisabled}>Continue</button>
                        </form>
                    </div>
                </div>
            </div>
            {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
        </div>
    );
};

export default NU_AddMoneyReseptsDetailsForAppointment;
