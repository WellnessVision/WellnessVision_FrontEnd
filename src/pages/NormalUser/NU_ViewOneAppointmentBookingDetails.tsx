import React, { useEffect, useState, useCallback } from 'react';
import NU_Sidebar from '../../pages/NormalUser/NU_components/NU_Sidebar';
import '../HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Hp_DeletePhysicalEventFineDetailsProps from '../../components/Hp_DeletePhysicalEventFineDetails';
import { useToggle } from '../../pages/HP/useToggle';
import Hp_ViewModifyMoneyReceiptsDetails from '../../components/Hp_ViewModifyMoneyReceiptsDetails'
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../resources/prosecing.gif'
import HP_EventBookingCloseProps from '../../components/HP_EventBookingClose';
import HP_ViewBookingParticipationDetailsProps from '../../components/HP_ViewBookingParticipationDetails';
import '../HP/HP_ViewOneAppointmentScheduleDetails.css'
import Hp_ViewModifyMoneyReceiptsDetailsAppointmentSchedule from '../../components/Hp_ViewModifyMoneyReceiptsDetailsAppointmentSchedule';
import './NU_ViewOneAppointmentBookingDetails.css'
import NU_ViewModifyMoneyReceiptsDetailsAppointmentBooking from './NU_components/NU_ViewModifyMoneyReceiptsDetailsAppointmentBooking';
import NU_DeleteAppointmentBookingFineDetails from './NU_components/NU_DeleteAppointmentBookingFineDetails';

interface AppointmentSchedule {
    appointmentId: number;
    roomId: number;
    title: string;
    roomType: string;
    sunDay: number;
    monDay: number;
    tueDay: number;
    wedDay: number;
    thuDay: number;
    friDay: number;
    satDay: number;
    startTime: number;
    endTime: number;
    duration: number;
    capacity: number;
    bookingPrice: number;
    dailyState: string;
    totalHallCharge: number;
    advancePercentage: number;
    advancePayment: number;
    paymentId: number;
    hpId: number;
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
    bookingCount: number;
}

interface AppointmentBooking{
    bookingId: number;
    bookingDate: string;
    bookingTime: string;
    bookedAppointmentId: number;
    userId: number;
    appointmentNumber: number;
    bookingState: string;
    appointmentState: string;
    participantId: string;
    participantState: string;
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
}


const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const NU_ViewOneAppointmentBookingDetails: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const [showPopup_4, togglePopup_4] = useToggle();
  const { bookingId } = useParams<{ bookingId: string }>();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointmentSchedule, setAppointmentSchedule] = useState<AppointmentSchedule | null>(null);
  const [appointmentBookingsDetails, setAppointmentBookingsDetails] = useState<AppointmentBooking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    const fetchAppointmentScheduleDetails = async () => {
      try {
        const response = await axios.get<AppointmentSchedule>(`http://localhost:15000/viewOneAppointmentScheduleDetailsForHp?`,{
            params: { appointmentId: appointmentId }
        });
        setAppointmentSchedule(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchAppointmentScheduleDetails();
  }, [appointmentId]);

  useEffect(() => {
    const fetchAppointmentBookingDetails = async () => {
      try {
        const response = await axios.get<AppointmentBooking>(`http://localhost:15000/getOneAppointmentBookingsDetailsOfUserForNu?`,{
            params: { bookingId: bookingId }
        });
        setAppointmentBookingsDetails(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchAppointmentBookingDetails();
  }, [bookingId]);

  const handleDeleteEventBooking = () => {
    setDeleteState(true);
    togglePopup();
  };

 if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!appointmentSchedule || !appointmentBookingsDetails) {
    return <div>Loading...</div>;
  }


    return (
        <div>
            <NU_Sidebar activeMenuItem={["UpcomingAppointment", "MyAppointment"]}/>
            <div className="cardHang_2">
            <div className="card HP_ViewOneAppointmentScheduleDetailsCard NU_ViewOneAppointmentBookingDetails_cardHang">
           <div className="card-body">
            <h5 className='card-title'>Bookind Details</h5>
            <div className="straight-line"></div>
           <h5 className="card-title HP_ViewOneAppointmentScheduleDetails_appointmentId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Booking Id :  </span> {appointmentBookingsDetails.bookingId}</h5>
            <h5 className="card-text NU_ViewOneAppointmentBookingDetails_bookingDate"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Date : </span>{appointmentBookingsDetails.bookingDate}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_time NU_ViewOneAppointmentBookingDetails_date"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Time : </span> {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_duration NU_ViewOneAppointmentBookingDetails_duration"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Durartion : </span> {appointmentSchedule.duration} hours</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_price NU_ViewOneAppointmentBookingDetails_price"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Channeling Fee: </span> Rs.{appointmentSchedule.bookingPrice}/=</h5>
            <h5 className='card-title NU_ViewOneAppointmentBookingDetails_participantDetails'>Participant Details</h5>
            <div className="straight-line"></div>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_maxP NU_ViewOneAppointmentBookingDetails_appointmentNumber"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Appointment Number: </span> {appointmentBookingsDetails.appointmentNumber}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_todayP NU_ViewOneAppointmentBookingDetails_participantId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Participant Id : </span> {appointmentBookingsDetails.participantId}</h5>
            <h5 className="card-text NU_ViewOneAppointmentBookingDetails_participantSate"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Participant State : </span> {appointmentBookingsDetails.participantState}</h5>
            <h5 className='card-title NU_ViewOneAppointmentBookingDetails_participantDetails'>Location Details (In WellnessVision Premises)</h5>
            <div className="straight-line"></div>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_maxP NU_ViewOneAppointmentBookingDetails_appointmentNumber"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Room Number: </span> {appointmentSchedule.roomId}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_todayP NU_ViewOneAppointmentBookingDetails_participantId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Room Type : </span> {appointmentSchedule.roomType == 'Discussion' ? ('Discussion Room') : ('') }</h5>
            </div>
               <div className='button_div NU_ViewOneAppointmentBookingDetails_buttonHang'>
                    <a href="/NU_ViewAllBookedUpcomingAppointments" className="btn btn-primary back_button HP_ViewOneAppointmentScheduleDetailsBackButton"><i className='bi bi-arrow-left-circle'></i> Back to Appointments</a>
                    <a className="btn btn-warning View_Modify_Money_receipts_details_hp_one_physical_event NU_ViewOneAppointmentBookingDetails_moneyReceptsButton" onClick={togglePopup_2}><i className='bi bi-info-circle'></i> Money receipts details</a>
                    <a className="btn btn-danger book_button" onClick={handleDeleteEventBooking}><i className='bi bi-trash3'></i> Delete Appointment</a>
                </div>
            </div>
        </div>
        { deleteState && <NU_DeleteAppointmentBookingFineDetails show={showPopup} handleClose={togglePopup} AppointmentBookingsDetails={appointmentBookingsDetails} setDeleteStateFun={setDeleteState}/>}
            <NU_ViewModifyMoneyReceiptsDetailsAppointmentBooking show_2={showPopup_2} handleClose_2={togglePopup_2} MoneyReceiptsDetails={appointmentBookingsDetails}/>
        </div>
    );
}

export default NU_ViewOneAppointmentBookingDetails;
