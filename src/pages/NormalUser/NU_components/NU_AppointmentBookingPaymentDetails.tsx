import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../../pages/HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif'
import NU_AddMoneyReseptsDetailsForAppointment from './NU_AddMoneyReseptsDetailsForAppointment';

interface NU_AppointmentBookingPaymentDetailsProps {
  show_4: boolean;
  handleClose_4: () => void;
  appointmentSchedule: any;
  appointmentDetails: any;
  selectedDate: string;
}

const formatTime = (hour: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};

const NU_AppointmentBookingPaymentDetails: React.FC<NU_AppointmentBookingPaymentDetailsProps> = ({ show_4, handleClose_4, appointmentSchedule, appointmentDetails, selectedDate }) => {
  const [message, setMessage] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [totalCharge, setTotalCharge] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const userId = String(localStorage.getItem('userId'));
  const hpEmail = String(localStorage.getItem('hpEmail'));
  const [showPopup_5, togglePopup_5] = useToggle();

  useEffect(() => {
    if (appointmentDetails && appointmentDetails.bookingId) {
      setBookingId(appointmentDetails.bookingId);
    }
  }, [appointmentDetails]);

  const handleCancelAppointmentBooking= async (event: FormEvent) => {
    event.preventDefault();
    if (bookingId) {
      try {
        await axios.put('http://localhost:15000/cancelTemporarilyBookAppointmentBookingForNu', {
          event_id: bookingId
        });
        handleClose_4();
      } catch (error) {
        setMessage('Error registering event');
      }
    }
  };

  return (
    <div className={`popup ${show_4 ? 'show HP_HallAvailabilityPopupForIt' : ''} `}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body HP_HallAvailabilityMainDivCard">
            <h5 className="card-title title_HP_HallAvailability">Hall Availability (In WellnessVision Premises)</h5>
            <div className="straight-line"></div>
            <div className='HP_HallAvailability_div'>
              {appointmentSchedule && appointmentDetails && appointmentDetails.bookingSate == "Booked" ? (
                <div>
                  <p className="card-text detail Hall_ID_HP_HallAvailability"><i className="bi bi-award-fill"></i> {appointmentDetails.appointmentNumber} (Appointment Number)</p>
                  <p className="card-text detail seats_HP_HallAvailability"><i className='bi bi-person-workspace'></i> {selectedDate} (Appointment Date)</p>
                  <p className="card-text detail price_HP_HallAvailability"><i className='bi bi-cash-stack'></i> {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)} (Time)</p>
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.{appointmentSchedule.bookingPrice}/= (Booking Fee)</p>
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-cash-stack'></i> {appointmentSchedule.roomId} (Room Id)</p>
                  <div className='HP_HallAvailability_button_div'>
                    <button className="btn btn-primary HP_HallAvailability_cancel_button" 
                    onClick={handleCancelAppointmentBooking}
                    >
                      <i className="bi bi-arrow-left-circle"></i> Cancel
                    </button>
                    <button className="btn btn-warning HP_HallAvailability_hallBook" onClick={togglePopup_5}>
                      <i className="bi bi-bag-plus-fill"></i><span className='HP_HallAvailability_hallBook_text'> Book Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className='Unfortunately_header_HP_HallAvailability'>Sorry, Booking Fail</p>
                  <p className='Unfortunately_text_HP_HallAvailability'>{appointmentDetails?.bookingSate}</p>
                  <div className='HP_HallAvailability_button_div'>
                    <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleClose_4}>
                      <i className="bi bi-arrow-left-circle"></i> Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopup_5 && 
            <NU_AddMoneyReseptsDetailsForAppointment 
            show_5={showPopup_5} 
            handleClose_5={togglePopup_5} 
            appointmentDetails={appointmentDetails}
            appointmentSchedule={appointmentSchedule}
            />}
      <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
    </div>
  );
};

export default NU_AppointmentBookingPaymentDetails;