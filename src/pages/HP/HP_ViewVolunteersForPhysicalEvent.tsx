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
import HP_AddVolunteerRequestForPhysicalEvent from '../../components/HP_AddVolunteerRequestForPhysicalEvent';
import HP_ViewOneVolunteerDetailsForPhysicalEvent from '../../components/HP_ViewOneVolunteerDetailsForPhysicalEvent';
import { Badge } from 'react-bootstrap';


interface VolunteerDetails {
    volunteerId: number;
    bookingId: number;
    eventId: number;
    participantId: string;
    bookingState: string;
    participantState: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    district: string;
    province: string;
    zip: string;
    email: string;
    phoneNumber: string;
    profilePicture: string;
    requestPosition: string;
    experiences: string;
    previousWorksPdf: string;
    requestTime: string;
    acceptTime: string;
    unreadMessageCount: number;
  }

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const HP_ViewVolunteersForPhysicalEvent: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const { eventId } = useParams<{ eventId: string }>();
  const [participants, setParticipants] = useState<VolunteerDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number>(0);
  const [selectedBookingIdFlag, toggleSelectedBookingIdFlag] = useState(false);


const fetchParticipants = useCallback(async () => {
    try {
      const response = await axios.get<VolunteerDetails[]>(`http://localhost:15000/getAllVolunteersForPhysicalEventsForHealthProfessionals`, {
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

const handleMarkAsParticipate = useCallback(async (bookingId: number, participantState: string) => {
    try {
      toggleLoadingPopup(true);
      await axios.put(`http://localhost:15000/updateTheVolunteerParticipateStateForVolunteer`, null, {
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

  const handleViewDetailsClick = (selectrdBookingId: number) => {
    setSelectedBookingId(selectrdBookingId);
    toggleSelectedBookingIdFlag(true);
    togglePopup();
  };

  const handleChatBox = (eventId: number, VolunteerId: number) => {
    navigate(`/HP_ChatWithVolunteer/${eventId}/${VolunteerId}`);
  };


  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

return (
        <div>
            <HPSideBar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
            <div className="cardHang particepationMarkListDiv" style={{marginTop: '100px'}}>
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
              <p className='participationListHeading'>Volunteer List</p>
          {participants.length > 0 ? (
            participants.map(participant => (
              <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={participant.bookingId}>
                <div className="card-body participantDetailsFlexContainer">
                <img src={participant.profilePicture} className="participantDetailsuserProfile" alt="Event image" />
                  <span className="card-text detail participantDetailuserName">
                   <i className="bi bi-award-fill"></i> {participant.firstName} {participant.lastName}
                  </span>
                  <span className="card-text detail participantDetailuserName">
                    <i className="bi bi-award-fill"></i> {participant.participantId} (Participation ID)
                  </span>
                   { participant.bookingState === 'Booked' ? (
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
                  <span> <a className="btn btn-success participantDetailsviewMoreButton" style={{width: '150px'}}
                   onClick={() => handleChatBox(participant.eventId, participant.volunteerId)}>
                    <i className="bi bi-chat"></i> Chat Box
                    {participant.unreadMessageCount > 0 && (
                            <Badge
                            pill
                            bg="danger"
                            style={{
                                left: '10px',
                            }}
                            >
                            {participant.unreadMessageCount}
                            </Badge>
                        )}
                  </a></span>
                  <span> <a className="btn btn-primary participantDetailsviewMoreButton" style={{width: '150px'}}
                   onClick={() => handleViewDetailsClick(participant.bookingId)}>
                    <i className="bi bi-eye"></i> View Details
                  </a></span>
                </div>
              </div>
            ))
          ) : (
            <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={0}>
                <div className="card-body participantDetailsFlexContainer noParticipentFoundParticipentSearchHpOneEventDiv">
                  <p className='noParticipentFoundParticipentSearchHpOneEventPara'>No Participent Found</p>
                  </div>
                  </div>
          )}
        </div>
        {selectedBookingIdFlag && 
        <HP_ViewOneVolunteerDetailsForPhysicalEvent 
          show={showPopup} 
          handleClose={togglePopup} 
          bookingId={selectedBookingId} 
        />}
        </div>
    );
}

export default HP_ViewVolunteersForPhysicalEvent;
