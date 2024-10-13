import React, { useEffect, useState, useCallback } from 'react';
import HPSideBar from '../../components/HP_SideBar';
import './HP_OneEvent.css';
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
import HP_AddVolunteerRequestForPhysicalEvent from '../../components/HP_AddVolunteerRequestForPhysicalEvent';

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
    volunteerNeedState: string;
    volunteerType: string
    volunteerDescription: string
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

  const HP_OneEvent: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const [showPopup_4, togglePopup_4] = useToggle();
  const [showPopup_5, togglePopup_5] = useToggle();
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

  const fetchParticipants = useCallback(async () => {
    try {
      const response = await axios.get<ParticipationDetails[]>(`http://localhost:15000/viewPhysicalEventParticipationDetails`, {
        params: { eventId, searchCode },
      });
      setParticipants(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [eventId, searchCode]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchParticipants();
  };

  const handleViewVolunteerRequestForPhysicalEvents = () => {
    navigate(`/HP_ViewVolunteerRequestForPhysicalEvents/${eventId}`);
  };

  const handleViewAllVolunteerDewtailsForPhysicalEvents = () => {
    navigate(`/HP_ViewVolunteersForPhysicalEvent/${eventId}`);
  };

  const handleMarkAsParticipate = useCallback(async (bookingId: number, participantState: string) => {
    try {
      toggleLoadingPopup(true);
      await axios.put(`http://localhost:15000/updatePhysicalEventParticipationState`, null, {
        params: { bookingId, participantState }
      });
      toggleLoadingPopup(false);
      fetchParticipants();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toggleLoadingPopup(false);
    }
  }, [fetchParticipants]);

  const handleViewDetailsClick = (participant: ParticipationDetails) => {
    setSelectedParticipantId(participant);
    togglePopup_4();
  };

  const handleAddVolunteerNeed = () => {
    togglePopup_5();
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }


    return (
        <div>
            <HPSideBar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
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
                    {event.volunteerNeedState === 'Need' ? 
                     <div><div>
                     <h5 className='description'>Looking for Volunteers</h5>
                     <p>{event.volunteerType}</p>
                 </div>
                 <div>
                     <h5 className='description'>Volunteer Description</h5>
                     <p>{event.volunteerDescription}</p>
                 </div></div> : ''}
                    <div>
                        <h5 className='description'>Description</h5>
                        <p>{event.event_description}</p>
                    </div>
                    {event.volunteerNeedState === 'Need' ? 
                    <div className="btn-group HP_OneEvent_VolunteerDropDownMenuForHpChatAndRequest">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Volunteer
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" onClick={handleViewVolunteerRequestForPhysicalEvents}>Volunteer Requests</a></li>
                      <li><a className="dropdown-item" onClick={handleViewAllVolunteerDewtailsForPhysicalEvents}>Event Volunteers</a></li>
                    </ul>
                  </div> : 
                  <div className="btn-group HP_OneEvent_VolunteerDropDownMenuForHpChatAndRequest">
                  <button type="button" className="btn btn-success" style={{width: '250px', marginLeft: '-145px'}}
                  onClick={handleAddVolunteerNeed}>
                  Request for Volunteers
                  </button> </div>}
                    <div className='button_div'>
                    <a href="/HP_ViewEvents" className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Back to Events</a>
                    <a className="btn btn-warning View_Modify_Money_receipts_details_hp_one_physical_event" onClick={togglePopup_2}><i className='bi bi-info-circle'></i> Money receipts details</a>
                    <a href="HP_OneEvents" className="btn btn-success view_button"><i className='bi bi-chat-left-dots'></i> Contact Event Manager</a>
                    <a className="btn btn-danger book_button" onClick={togglePopup}><i className='bi bi-trash3'></i> Delete Event</a>
                    </div>
                </div> 
                </div>
            </div>
            <div className="cardHang particepationMarkListDiv">
          <a className={"btn btn-danger closeEventBookingHPOneEvent"} 
          onClick={togglePopup_3}> <i className={'bi bi-power'}></i> Close Event Bookings</a>
            <form className="d-flex search" role="search">
             <input 
                 className="form-control me-2" 
                 type="search" 
                 placeholder="Search By Participent Id" 
                 aria-label="Search"
                 value={searchCode}
                 onChange={handleSearchChange}/>
              <button className="btn btn-outline-success" type="submit" disabled>Search</button>
            </form>
              <p className='participationListHeading'>Participation List</p>
          {participants.length > 0 ? (
            participants.map(participant => (
              <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.event_id}>
                <div className="card-body participantDetailsFlexContainer">
                <img src={participant.profilePic} className="participantDetailsuserProfile" alt="Event image" />
                  <span className="card-text detail participantDetailuserName">
                   <i className="bi bi-award-fill"></i> {participant.firstName} {participant.lastName}
                  </span>
                  <span className="card-text detail participantDetailuserName">
                    <i className="bi bi-award-fill"></i> {participant.participantId} (Participation ID)
                  </span>
                   { participant.bookingState === 'Booking' ? (
                  <span> 
                  <a
            className={`btn participantDetailsParticipationMarkButton ${
              participant.participantState === 'NotParticipate' ? 'btn btn-outline-secondary participantDetailsMarkasParticepateShow' : 'btn-success participantDetailsMarkasNotParticepateShow'
            }`}
            onClick={() =>
              handleMarkAsParticipate(participant.bookingId, participant.participantState === 'NotParticipate' ? 'Participated' : 'NotParticipate')
            }
          >
            <i className={participant.participantState === 'NotParticipate' ? 'Mark as Participate' : 'bi bi-check-lg'}></i>{' '}
            {participant.participantState === 'NotParticipate' ? 'Mark as Participate' : 'Participated'}
          </a>
                  </span> ) : (
                    <p className='deleteUserHpParticipentMark'>Canceled Event Booking</p>
                  )}
                  <span> <a className="btn btn-primary participantDetailsviewMoreButton"
                   onClick={() => handleViewDetailsClick(participant)}>
                    <i className="bi bi-eye"></i> View Details
                  </a></span>
                </div>
              </div>
            ))
          ) : (
            <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.event_id}>
                <div className="card-body participantDetailsFlexContainer noParticipentFoundParticipentSearchHpOneEventDiv">
                  <p className='noParticipentFoundParticipentSearchHpOneEventPara'>No Participent Found</p>
                  </div>
                  </div>
          )}
        </div>
        {selectedParticipantId && 
        <HP_ViewBookingParticipationDetailsProps 
          show_4={showPopup_4} 
          handleClose_4={togglePopup_4} 
          ParticipationDetails={selectedParticipantId} 
        />}
            <Hp_DeletePhysicalEventFineDetailsProps show={showPopup} handleClose={togglePopup}/>
            <Hp_ViewModifyMoneyReceiptsDetails show_2={showPopup_2} handleClose_2={togglePopup_2} MoneyReceiptsDetails={event}/>
            <HP_EventBookingCloseProps show_3={showPopup_3} handleClose_3={togglePopup_3} eventId={eventId}/>
            <HP_AddVolunteerRequestForPhysicalEvent show_5={showPopup_5} handleClose_5={togglePopup_5} eventId={eventId}/>
        </div>
    );
}

export default HP_OneEvent;
