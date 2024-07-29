import React, { useEffect, useState, useCallback } from 'react';
import HPSideBar from '../../components/HP_SideBar';
import './HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Hp_DeletePhysicalEventFineDetailsProps from '../../components/Hp_DeletePhysicalEventFineDetails';
import { useToggle } from '../../pages/HP/useToggle';
import Hp_ViewMoneyReceiptsDetailsForDeletedEvent from '../../components/Hp_ViewMoneyReceiptsDetailsForDeletedEvent'
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../resources/prosecing.gif'
import HP_EventBookingCloseProps from '../../components/HP_EventBookingClose';
import HP_ViewBookingParticipationDetailsProps from '../../components/HP_ViewBookingParticipationDetails';
import './HP_ViewOneDeletedEvents.css'

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
    hp_id: number,
    event_state: string,
    accountNumber: string,
    accountOwnerName: string,
    branchName: string,
    bankName: string
    ticketBookingCount: number
  }

  interface ParticipationDetails {
    user_id: number
    firstName: string
    lastName: string
    profilePic: string
    participantId: string
    participantState: string
    bookingId: number
    bookingState: string
  }

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const HP_ViewOneDeletedEvents: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const [showPopup_4, togglePopup_4] = useToggle();
  const { eventId } = useParams<{ eventId: string }>();
  localStorage.setItem('eventId', String(eventId));
  const [event, setEvent] = useState<PhysicalEvent | null>(null);
  const [participants, setParticipants] = useState<ParticipationDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<ParticipationDetails | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<PhysicalEvent>(`http://localhost:15000/viewOneDeleteHealthProfessionalPhysicalEventForHP?`,{
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

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }


    return (
        <div>
             <HPSideBar activeMenuItem={["PhysicalDeleted_Events", "Deleted_Events"]}/>
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
                    <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> All Bookings were cancelled</p> 
                    <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> {event.language} Language</p> 
                    </div>
                    <div>
                        <h5 className='description'>Description</h5>
                        <p>{event.event_description}</p>
                    </div>
                    <div className='button_div'>
                    <a href="/HP_ViewDeletedEvents" className="btn btn-primary back_button HP_ViewOneDeletedEvents_backBotton"><i className='bi bi-arrow-left-circle'></i> Back to Events</a>
                    <a className="btn btn-warning View_Modify_Money_receipts_details_hp_one_physical_event" onClick={togglePopup_2}><i className='bi bi-info-circle'></i> Money receipts details</a>
                    </div>
                </div> 
                </div>
            </div>
            <Hp_ViewMoneyReceiptsDetailsForDeletedEvent show_2={showPopup_2} handleClose_2={togglePopup_2} MoneyReceiptsDetails={event}/>
        </div>
    );
}

export default HP_ViewOneDeletedEvents;
