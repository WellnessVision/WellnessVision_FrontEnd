import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../../resources/prosecing.gif';
import '../../../components/HP_HallAvailability.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css';
import '../../../components/HP_EventBookingClose.css';
import '../../../components/HP_SelectOneHallForPhysicalEvent.css'
import { useToggle } from '../../HP/useToggle';
import NU_AppointmentBookingPaymentDetails from './NU_AppointmentBookingPaymentDetails';
import './NU_SelectAppoinmentDateForAppoinment.css'

interface HP_EventBookingCloseProps {
  show_2: boolean;
  handleClose_2: () => void;
  appointmentSchedule: any;
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

  interface appointmentBookingDetails {
    appointmentNumber: number;
    bookingId: number;
    bookingSate: string;
  }


const isSunday = (date: Date): boolean => date.getDay() === 0;
const isMonday = (date: Date): boolean => date.getDay() === 1;
const isTuesday = (date: Date): boolean => date.getDay() === 2;
const isWednesday = (date: Date): boolean => date.getDay() === 3;
const isThursday = (date: Date): boolean => date.getDay() === 4;
const isFriday = (date: Date): boolean => date.getDay() === 5;
const isSaturday = (date: Date): boolean => date.getDay() === 6;

const NU_SelectAppoinmentDateForAppoinment: React.FC<HP_EventBookingCloseProps> = ({ show_2, handleClose_2, appointmentSchedule }) => {
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
  const [date, setDate] = useState<string>('');
  const [minDate, setMinDate] = useState<string>('');
  const userId = String(localStorage.getItem('userId'));
  const [appointmentDetails, setAppointmentDetails] = useState<appointmentBookingDetails | null>(null);


  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedDate = new Date(e.target.value);
      if (appointmentSchedule.sunDay && isSunday(selectedDate)) {
          setDate(e.target.value);
          setMessage('');
      } else{
        if (appointmentSchedule.monDay && isMonday(selectedDate)) {
            setDate(e.target.value);
            setMessage('');
        }else{
            if (appointmentSchedule.tueDay && isTuesday(selectedDate)) {
                setDate(e.target.value);
                setMessage('');
            }else{
                if (appointmentSchedule.wedDay && isWednesday(selectedDate)) {
                    setDate(e.target.value);
                    setMessage('');
                }else{
                    if (appointmentSchedule.thuDay && isThursday(selectedDate)) {
                        setDate(e.target.value);
                        setMessage('');
                    }else{
                        if (appointmentSchedule.friDay && isFriday(selectedDate)) {
                            setDate(e.target.value);
                            setMessage('');
                        }else{
                            if (appointmentSchedule.satDay && isSaturday(selectedDate)) {
                                setDate(e.target.value);
                                setMessage('');
                            }else{
                                setMessage('Invalid Date');
                                setDate(''); 
                            }
                          }
                      }
                  }
              }
          }
      }
  };

//   const fetchEvents =  useCallback(async () => {
//     try {
//       const response = await axios.get<HallBookings[]>(`http://localhost:15000/getHallBookingAvailableSlotsForGivenHallAndDate`, {
//         params: { hallId: HallId, date: EventDate }
//       });
//       setHallBookings(response.data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const checkHallAvailability = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setShowLoadingPopup(true);
//     try {
//         const response = await axios.get<Event>(`http://localhost:15000/checkAndTemporarilyBookingEventHall`, {
//             params: { hpId, hallId: HallId, date: EventDate, startTime : Number(startTime), endTime : Number(endTime), duration: Number(finalDuration)}
//         });
//         setEventData(response.data);
//         togglePopup_3();
//         setShowLoadingPopup(false);
//     } catch (err) {
//         if (err instanceof Error) {
//             setError(err.message);
//         } else {
//             setError('An unknown error occurred');
//         }
//     }
// };


useEffect(() => {
    const today = new Date();
    {(appointmentSchedule.dailyState === "Available") && (appointmentSchedule.appointmentBookingCloseState === 'No') ? 
    today.setDate(today.getDate()+1) : today.setDate(today.getDate()+2)}
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
}, [appointmentSchedule]);

  const canselDetailsClick = () => {
    handleClose_2();
    setDate('');
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

const fetchAppointmentBookingDetails = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoadingPopup(true);
      try {
        const response = await axios.get<appointmentBookingDetails>(`http://localhost:15000/checkAndTemporarilyBookAppointmentBookingForNu`,{
            params: { appointmentId: appointmentSchedule.appointmentId, userId: userId, date: date }
        });
        setAppointmentDetails(response.data);
        setShowLoadingPopup(false);
        togglePopup_3();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
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
            <p className='HP_SelectOneHallForPhysicalEvent_AvailableTimeHeading'>Available Time Slots</p>
            <div className='HP_HallAvailability_div'>
            <h5 className="card-text"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Available Days :</span> 
            <span>{appointmentSchedule.sunDay && appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && appointmentSchedule.satDay ? (' Every Day') : 
            (<span> {appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && !appointmentSchedule.satDay && !appointmentSchedule.sunDay? (' Weekdays') : 
                (<span> {appointmentSchedule.satDay && appointmentSchedule.sunDay && !appointmentSchedule.monDay && !appointmentSchedule.tueDay && !appointmentSchedule.wedDay && !appointmentSchedule.thuDay && !appointmentSchedule.friDay? (' Weekend Days') :     
                (<span>
                {appointmentSchedule.sunDay ? (' Sun'):('')}
                {appointmentSchedule.sunDay && appointmentSchedule.monDay ? ', Mon' : appointmentSchedule.monDay ? ' Mon' : ''}
                {appointmentSchedule.monDay && appointmentSchedule.tueDay ? ', Tues': appointmentSchedule.tueDay ? ' Tues': ''}
                {appointmentSchedule.tueDay && appointmentSchedule.wedDay ? ', Wed' : appointmentSchedule.wedDay ? ' Wed' : ''}
                {appointmentSchedule.wedDay && appointmentSchedule.thuDay ? ', Thurs' : appointmentSchedule.thuDay ? ' Thurs' : ''}
                {appointmentSchedule.thuDay && appointmentSchedule.friDay ? ', Fri' : appointmentSchedule.friDay ? ' Fri' : ''}
                {appointmentSchedule.friDay && appointmentSchedule.satDay ? ', Sat' : appointmentSchedule.satDay ? ' Sat' : ''} 
                </span>)}</span>)}</span>)}</span>
                </h5>
            <h5 className="card-text"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Available Time : </span> {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)}</h5>
            <div className="straight-line"></div>
            <p className='HP_SelectOneHallForPhysicalEvent_SettheEventTime'>Select Appoinment Date</p>
            <form onSubmit={fetchAppointmentBookingDetails}
            >
             <div className="name-group">
                    <div className="form-group">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="EventDate"
                                    placeholder="Event Date (Only Mondays allowed)"
                                    required
                                    value={date}
                                    min={minDate}
                                    onChange={handleDateChange}
                                />
                                  </div>
                            </div>
                {message && <p className="time_wrong_addEvent NU_SelectAppoinmentDateForAppoinmentInvalidDate">{message}</p>}
              <button
                type="button"
                className="btn btn-primary HP_HallAvailability_cancel_button eventCloseMessageCloseButton"
                onClick={canselDetailsClick}
                >
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
      {showPopup_3 && <NU_AppointmentBookingPaymentDetails show_4={showPopup_3} handleClose_4={togglePopup_3} appointmentSchedule={appointmentSchedule} appointmentDetails={appointmentDetails} selectedDate={date}/>}
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default NU_SelectAppoinmentDateForAppoinment;