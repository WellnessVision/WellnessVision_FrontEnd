import React, { useEffect, useState, useCallback } from 'react';
import HPSideBar from '../../components/HP_SideBar';
import '../HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png'
import { useParams } from 'react-router-dom';
import NU_Sidebar from './NU_components/NU_Sidebar'
import axios from 'axios';
import Hp_DeletePhysicalEventFineDetailsProps from '../../components/Hp_DeletePhysicalEventFineDetails';
import { useToggle } from '../../pages/HP/useToggle';
import Hp_ViewModifyMoneyReceiptsDetails from '../../components/Hp_ViewModifyMoneyReceiptsDetails'
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../resources/prosecing.gif'
import HP_EventBookingCloseProps from '../../components/HP_EventBookingClose';
import HP_ViewBookingParticipationDetailsProps from '../../components/HP_ViewBookingParticipationDetails';
import './NU_ViewOneUpcomingPhysicalEvent.css'
import UserPhysicalEventBookingPaymentSlipProps from './NU_components/UserPhysicalEventBookingPaymentSlip'
import './NU_ViewOneHealthProfessional.css'
import NU_SelectAppoinmentDateForAppoinment from './NU_components/NU_SelectAppoinmentDateForAppoinment';

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
    startUnavailableDate: string;
    endUnavailableDate: string;
    appointmentBookingCloseDate: string;
    dalyUnavailableDate: string;
    appointmentBookingCloseState: string; 
}

  interface HpDetails {
    firstName: string
    lastName: string
    email: string
    profilePicture: string
    profession: string
  }

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const NU_ViewOneHealthProfessional: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const { hpId } = useParams<{ hpId: string }>();
  const [oneHpDetails, setOneHpDetails] = useState<HpDetails | null>(null);
  const [appointmentScheduleDetails, setAppointmentScheduleDetails] = useState<AppointmentSchedule[]>([]);
  const [selectedAppointmentSchedule, setSelectedAppointmentSchedule] = useState<AppointmentSchedule | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const userId = localStorage.getItem('userId');
  const [checkBookingStateValue, setCheckBookingStateValue] = useState('');

  useEffect(() => {
    const automaticallyUpdateTheAppointmentDalyState = async () => {
      try {
        await axios.put('http://localhost:15000/automaticallyUpdateTheAppointmentDalyState');
      } 
      catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
  
    automaticallyUpdateTheAppointmentDalyState();
  }, []);

  const fetchEvents = async () => {
    try {
        const response = await axios.get<AppointmentSchedule[]>(`http://localhost:15000/viewAllAppointmentScheduleForHp`, {
            params: { hpId: hpId }
        });
        setAppointmentScheduleDetails(response.data);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
    }
};

useEffect(() => {
    fetchEvents();
}, [setAppointmentScheduleDetails, setError]);

  useEffect(() => {
  const fetchHpDetails = async () => {
    try {
      const response = await axios.get<HpDetails>(`http://localhost:15000/healthProfessionalDashboardProfileDetails?`,{
          params: { hpId: hpId }
      });
      setOneHpDetails(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  fetchHpDetails();
}, [hpId]);


// useEffect(() => {
//     const checkBookingState = async () => {
//       try {
//         const response = await axios.get(`http://localhost:15000/checkBookingStateOfOnePhysicalEventDetailForUser?`,{
//             params: { hpId, userId }
//         });
//         setCheckBookingStateValue(response.data);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError('An unknown error occurred');
//         }
//       }
//     };

//     checkBookingState();
//   }, [hpId, userId, setCheckBookingStateValue, setError]);

const handleViewDetailsClick = (appointmentSchedule: AppointmentSchedule) => {
    setSelectedAppointmentSchedule(appointmentSchedule);
    togglePopup();
  };

const handleUserPhysicalEventTemporaryBooking = useCallback(async (eventId: number) => {
    try {
        const response = await axios.put(`http://localhost:15000/userPhysicalEventTemporaryBooking`, null, {
        params: { eventId }
      });
      if(response.data === "Booked"){
        togglePopup();
      }else if(response.data === "CloseBooking"){
        navigate(`/HP_LodingPage`);
        setTimeout(() => {
          navigate(`/NU_ViewOnePreviousPhysicalEvent/${eventId}`);
          alert("Sorry, Ticket booking closed");
        }, 100);
      }else{
        navigate(`/HP_LodingPage`);
        setTimeout(() => {
          navigate(`/NU_ViewOneUpcomingPhysicalEvent/${eventId}`);
          alert("Sorry, All Tickets are Sold Out");
        }, 100);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      navigate(`/HP_LodingPage`);
        alert("Sorry, The event was deleted already");
        setTimeout(() => {
          navigate('/NU_ViewUpcomingPhysicalEvents');
        }, 100);
    }
  }, [navigate, setError]);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

//   if (!event) {
//     return <div>
//         <NU_Sidebar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
//         <img className='NU_ViewOneUpcomingPhysicalEvent_logingImage' src={loading_gif} alt="" /></div>;
//   }

  if (!oneHpDetails) {
    return <div>  
      <NU_Sidebar activeMenuItem={["MakeAnAppointment", "MyAppointment"]}/>
      <img className='NU_ViewOneUpcomingPhysicalEvent_logingImage' src={loading_gif} alt="" /></div>;
  }

  return (
        <div>
            <NU_Sidebar activeMenuItem={["MakeAnAppointment", "MyAppointment"]}/>
            <div className="cardHang_2">
            <div className="card NU_ViewOneAppointmentScheduleDetails_mainCard" style={{ width: '95%' }}>
                <div className="card-body">
                        <h5 className="card-title title">Health Professional Details</h5>
                        <img src ={oneHpDetails.profilePicture} className="NU_ViewOneUpcomingPhysicalEvent_hp_profile_pic" alt="Card image"/>
                        <button className="btn btn-primary book_button NU_ViewOneUpcomingPhysicalEvent_hpViewMoreButton"> View More </button>
                        <h5 className="card-text detail NU_ViewOneUpcomingPhysicalEvent_hpName"><i className="bi bi-person-check"></i> {oneHpDetails.firstName} {oneHpDetails.lastName}</h5>
                        <h5 className="card-text detail NU_ViewOneUpcomingPhysicalEvent_profession"><i className="bi bi-clipboard-pulse"></i> {oneHpDetails.profession}</h5>
                        <h5 className="card-text detail NU_ViewOneUpcomingPhysicalEvent_email"><i className="bi bi-envelope-at"></i> {oneHpDetails.email}</h5>
                </div> 
                <div className='NU_ViewOneHealthProfessional_AppoinmentHeading'>
                   <h5>Appointment Schedules</h5>
                  </div>
           {appointmentScheduleDetails ? (
                    appointmentScheduleDetails.length > 0 ? (
                        appointmentScheduleDetails.map(appointmentSchedule => (
         <div className="card HP_ViewOneAppointmentScheduleDetailsCard NU_ViewOneHealthProfessional_AppoinmentCard">
           <div className="card-body">
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_appointmentId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Title : </span>{appointmentSchedule.title}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_Date"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Available Days :</span> 
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
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_time"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Available Time : </span> {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_duration NU_ViewOneAppointmentScheduleDetails_duration"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Durartion : </span> {appointmentSchedule.duration} hours</h5>
            { (appointmentSchedule.dailyState === "Available") && (appointmentSchedule.appointmentBookingCloseState === 'No') ? <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_dailyState NU_ViewOneAppointmentScheduleDetails_dailyState"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>State : </span> <span className='HP_ViewAllAppointmentSchedule_todayStateColour'>{appointmentSchedule.dailyState}</span></h5>
            : <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_dailyState NU_ViewOneAppointmentScheduleDetails_dailyState"><span className='HP_ViewAllAppointmentSchedule_todayStateColour'>Unavailable for today</span></h5>}
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_maxP"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Max Patient Count : </span> {appointmentSchedule.capacity}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_todayP"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Today Booking Count : </span> {appointmentSchedule.bookingCount}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_price"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Channeling Fee Per Patient: </span> Rs.{appointmentSchedule.bookingPrice}/=</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_roomId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Room Id : </span> {appointmentSchedule.roomId}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_roomType"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Room Type : </span> {appointmentSchedule.roomType == 'Discussion' ? ('Discussion Room') : ('') }</h5>
            { (appointmentSchedule.startUnavailableDate != null) && (appointmentSchedule.endUnavailableDate != null) ? <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_dailyState NU_ViewOneAppointmentScheduleDetails_unavailableTimePeriod"><span className='HP_ViewAllAppointmentSchedule_todayStateColour'>Unavailable from {appointmentSchedule.startUnavailableDate} to  {appointmentSchedule.endUnavailableDate}</span></h5>
            : ''}
            { (appointmentSchedule.startUnavailableDate != null) && (appointmentSchedule.endUnavailableDate == null) ? <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_dailyState NU_ViewOneAppointmentScheduleDetails_unavailableTimePeriod_withStartTime"><span className='HP_ViewAllAppointmentSchedule_todayStateColour'>Unavailable from {appointmentSchedule.startUnavailableDate} towards</span></h5>
            : ''}
            <div className='button_div'>
                    <a className="btn btn-warning back_button NU_ViewOneAppointmentScheduleDetails_appoinmentBotton" onClick={() => handleViewDetailsClick(appointmentSchedule)}><i className="bi bi-building-check"></i> Make an Appoinment </a>
            </div>
         </div>
        </div>
                ))
            ) : (
                <p className='NU_ViewOneAppointmentScheduleDetails_NoAppointmentSchedule'>Appointment schedules are currently unavailable</p>
            )
            ) : (
            <p>Loading Payments...</p>
            )}
            <div className='button_div'>
                    <a href="/NU_ViewHealthProfessionals" className="btn btn-primary back_button NU_ViewOneAppointmentScheduleDetails_backButton"><i className='bi bi-arrow-left-circle'></i> Back </a>
                  </div>
          </div>
          { selectedAppointmentSchedule &&
            <NU_SelectAppoinmentDateForAppoinment 
            show_2={showPopup} 
            handleClose_2={togglePopup} 
            appointmentSchedule={selectedAppointmentSchedule}/>}
        </div>
        </div>
    );
}

export default NU_ViewOneHealthProfessional;
