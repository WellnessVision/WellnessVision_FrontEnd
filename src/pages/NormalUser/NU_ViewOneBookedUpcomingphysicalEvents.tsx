import React, { useEffect, useState, useCallback } from 'react';
import HPSideBar from '../../components/HP_SideBar';
import '../HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png'
import { useParams } from 'react-router-dom';
import NU_Sidebar from './NU_components/NU_Sidebar'
import axios from 'axios';
import NU_DeletePhysicalEventBookingProps from './NU_components/NU_DeletePhysicalEventBooking';
import { useToggle } from '../../pages/HP/useToggle';
import NU_ViewModifyMoneyReceiptsDetails from './NU_components/NU_ViewModifyMoneyReceiptsDetails'
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../resources/prosecing.gif'
import ParticipationDetailsPic from '../../resources/ParticipationDetailsPic.jpg'
import HP_EventBookingCloseProps from '../../components/HP_EventBookingClose';
import HP_ViewBookingParticipationDetailsProps from '../../components/HP_ViewBookingParticipationDetails';
import './NU_ViewOneUpcomingPhysicalEvent.css'
import UserPhysicalEventBookingPaymentSlipProps from './NU_components/UserPhysicalEventBookingPaymentSlip'
import './NU_ViewOneBookedUpcomingphysicalEvents.css'

interface PhysicalEvent {
    event_id: number;
    hall_id: string;
    eventTitle: string;
    finalEventType: string;
    date: string;
    startTime: number;
    endTime: number;
    finalDuration: number;
    capacity: number;
    ticketPrice: number;
    eventImage: string;
    hall_capacity: number;
    total_hall_charge: number;
    advance_percentage: number;
    advance_payment: number;
    payment_id: number;
    language: string;
    event_description: string;
    hp_id: number;
    event_state: string;
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
    ticketBookingCount: number;
  }

  interface ParticipationDetails {
    user_id: number;
    firstName: string;
    lastName: string;
    profilePic: string;
    participantId: string;
    participantState: string;
    bookingId: number;
    bookingState: string;
    eventState: string;
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
  }

  interface HpDetails {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    profession: string;
  }

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const NU_ViewOneBookedUpcomingphysicalEvents: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const { eventId } = useParams<{ eventId: string }>();
  const { hpId } = useParams<{ hpId: string }>();
  localStorage.setItem('eventId', String(eventId));
  localStorage.setItem('hpId', String(hpId));
  const [event, setEvent] = useState<PhysicalEvent | null>(null);
  const [oneHpDetails, setOneHpDetails] = useState<HpDetails | null>(null);
  const [participants, setParticipants] = useState<ParticipationDetails | null>(null);;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const userId = localStorage.getItem('userId');
  const [checkBookingStateValue, setCheckBookingStateValue] = useState('');
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<PhysicalEvent>(`http://localhost:15000/viewOnePhysicalEventDetail?`,{
            params: { eventId: eventId }
        });
        setEvent(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchEvent();
  }, [eventId]);

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

const handleDeleteEventBooking = () => {
  setDeleteState(true);
  togglePopup_3();
};


useEffect(() => {
    const fetchParticipationDetails = async () => {
      try {
        const response = await axios.get<ParticipationDetails>(`http://localhost:15000/getBookingDetailsBookedUpcomingPhysicalEventsForUsers?`,{
            params: { userId , eventId }
        });
        setParticipants(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchParticipationDetails();
  }, [ userId, eventId, setCheckBookingStateValue, setError]);

 if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!event || !oneHpDetails || !participants) {
    return <div>
        <NU_Sidebar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
        <img src={loading_gif} alt="" className='NU_ViewOneBookedUpcomingphysicalEvents_loading_gif' /></div>;
  }

  return (
        <div>
         <NU_Sidebar activeMenuItem={["PhysicalBooked_Events", "UpcomingBooked_Events", "Booked_Events"]}/>
            <div className="cardHang_2">
            <div className="card" style={{ width: '95%' }}>
                <img src ={event.eventImage} className="image" alt="Card image" />
                <div className="card-body">
                <div className='base_details'>
                    <h5 className="card-title title">{event.eventTitle}</h5>
                    <div className="straight-line"></div>
                    <p className="card-text detail"><i className='bi bi-award-fill'></i> {event.event_id} (Event ID)<span className='event_id_span_hp_one_event'><i className='bi bi-bookmark-star-fill'></i> {event.finalEventType}</span></p>
                    <p className="card-text detail physical"><i className='bi bi-soundwave'></i> {event.hall_id} (WellnessVision Hall)</p>
                    <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {event.date}</p>
                    <p className="card-text detail date"><i className='bi bi-alarm-fill'></i> {formatTime(event.startTime)}</p> 
                    <p className="card-text detail duration"><i className='bi bi-hourglass-split'></i> {event.finalDuration} hour duration</p> 
                    <p className="card-text detail price"><i className='bi bi-cash-stack'></i> Rs.{event.ticketPrice}/= (Per participant)</p> 
                    <p className="card-text detail seats"><i className='bi bi-person-workspace'></i> {event.hall_capacity} Seats</p> 
                    <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> {event.ticketBookingCount} Bookings</p> 
                    <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> {event.language} Language</p> 
                    </div>
                    <div>
                        <h5 className='description'>Description</h5>
                        <p>{event.event_description}</p>
                    </div>
                    <div>
                        <div className="straight-line"></div>
                        <h5 className="card-title title">Health Professional Details</h5>
                        <img src ={oneHpDetails.profilePicture} className="NU_ViewOneUpcomingPhysicalEvent_hp_profile_pic" alt="Card image"/>
                        <button className="btn btn-primary book_button NU_ViewOneUpcomingPhysicalEvent_hpViewMoreButton"> View More </button>
                        <h5 className="card-text detail NU_ViewOneUpcomingPhysicalEvent_hpName"><i className="bi bi-person-check"></i> {oneHpDetails.firstName} {oneHpDetails.lastName}</h5>
                        <h5 className="card-text detail NU_ViewOneUpcomingPhysicalEvent_profession"><i className="bi bi-clipboard-pulse"></i> {oneHpDetails.profession}</h5>
                        <h5 className="card-text detail NU_ViewOneUpcomingPhysicalEvent_email"><i className="bi bi-envelope-at"></i> {oneHpDetails.email}</h5>
                    </div>
                    <div>
                        <div className="straight-line NU_ViewOneBookedUpcomingPhysicalEvent_ParticipationDetailsLine"></div>
                        <h5 className="card-title title">Participation Details</h5>
                        <img src ={ParticipationDetailsPic} className="NU_ViewOneUpcomingPhysicalEvent_hp_profile_pic NU_ViewOneBookedUpcomingPhysicalEvent_ParticipationDetailsPic" alt="Card image"/>
                        <h5 className="card-text detail NU_ViewOneBookedUpcomingPhysicalEvent_participantId"><i className="bi bi-award-fill"></i> {participants.participantId} (Your Participant Id)</h5>
                        <h5 className="card-text detail NU_ViewOneBookedUpcomingPhysicalEvent_participantState"><i className="bi bi-people-fill"></i> {participants.participantState} (Your Current participation State)</h5>
                        <h5 className="card-text detail NU_ViewOneBookedUpcomingPhysicalEvent_eventState"><i className="bi bi-award-fill"></i> Booking Id : {participants.bookingId}<span><i className="bi bi-calendar-check NU_ViewOneBookedUpcomingPhysicalEvent_EventState"></i> {participants.eventState} (Event State)</span></h5>
                    </div>
                    <div className='button_div'>
                    <a href="/NU_ViewBookedUpcomingphysicalEvents" className={`btn btn-primary back_button NU_ViewOneBookedUpcomingPhysicalEvent_back ${participants.participantState == 'NotParticipate' && event.event_state == 'Upcoming' ? '' : 'NU_ViewOneBookedUpcomingPhysicalEvent_back_hidden'}`}><i className='bi bi-arrow-left-circle'></i> Back to Events</a>
                    <a className="btn btn-warning back_button NU_ViewOneBookedUpcomingPhysicalEvent_receipts" onClick={togglePopup_2}><i className='bi bi-info-circle'></i> Money receipts details</a>
                    <a className={`btn btn-danger book_button ${participants.participantState == 'NotParticipate' && event.event_state == 'Upcoming' ? 'NU_ViewOneBookedUpcomingPhysicalEvent_delete' : 'NU_ViewOneBookedUpcomingPhysicalEvent_delete_hidden'}`}
                        onClick={handleDeleteEventBooking} >
                        <i className='bi bi-trash3'></i> Delete Booking
                    </a>
                       

                    </div>
                </div> 
                </div>
        </div>
            <UserPhysicalEventBookingPaymentSlipProps show={showPopup} handleClose={togglePopup} PhysicalEvent={event}/>
            <NU_ViewModifyMoneyReceiptsDetails show_2={showPopup_2} handleClose_2={togglePopup_2} MoneyReceiptsDetails={participants} userId={userId} eventId={eventId} hpId={hpId}/>
            {deleteState && <NU_DeletePhysicalEventBookingProps show_3={showPopup_3} handleClose_3={togglePopup_3} MoneyReceiptsDetails={participants} eventId={eventId} setDeleteStateFun={setDeleteState}/>}
        </div>
    );
}

export default NU_ViewOneBookedUpcomingphysicalEvents;
