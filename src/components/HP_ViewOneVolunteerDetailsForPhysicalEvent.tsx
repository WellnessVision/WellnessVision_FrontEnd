import React, { useEffect, useState, FormEvent, useCallback } from 'react';
import '../pages/HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Admin/Admin_ViewOneHealthProfessionalRegistrationRequest.css';
import { parseISO, format } from 'date-fns';
import { Badge } from 'react-bootstrap';

interface HP_VolunteerRequestForPhysicalEventCardProps {
    show: boolean;
    handleClose: () => void;
    bookingId: any;
}

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

const HP_ViewOneVolunteerDetailsForPhysicalEvent: React.FC<HP_VolunteerRequestForPhysicalEventCardProps> = ({ show, handleClose, bookingId }) => {
    const [event, setEvent] = useState<VolunteerDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<VolunteerDetails>(`http://localhost:15000/getOneVolunteerDetailsForPhysicalEventsForHealthProfessionals`, {
                    params: { bookingId }
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
    }, [bookingId]);

    const handleMarkAsParticipate = useCallback(async (bookingId: number, participantState: string, eventId: number) => {
        try {
          navigate('/HP_LodingPage');
          await axios.put(`http://localhost:15000/updateTheVolunteerParticipateStateForVolunteer`, null, {
            params: { bookingId, participantState }
          });
          navigate(`/HP_ViewVolunteersForPhysicalEvent/${eventId}`);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      }, []);

    const formatRequestTime = (time: string): string => {
        const parsedDate = parseISO(time);
        return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
    };

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!event) {
        return <div>Loading...</div>;
    }

    const handleViewPreviousWorks = (volunteerId: number, eventId: number) => {
        navigate(`/HP_ViewAcceptedVolunteerPreviousWorks/${volunteerId}/${eventId}`);
      };

      const handleChatBox = (eventId: number, VolunteerId: number) => {
        navigate(`/HP_ChatWithVolunteer/${eventId}/${VolunteerId}`);
      };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner hpViewParticipantUserDetails_popup_inner">
                <div className="card hpViewParticipantUserDetails_card" style={{ width: '100%', height: '100%' }}>
                    <a href={event?.profilePicture}>
                        <img src={event?.profilePicture} className="hpViewParticipantUserDetailsImage Admin_ViewOneHealthProfessionalRegistrationRequestImage" alt="Card image" />
                    </a>
                    <div className="card-body Admin_ViewOneHealthProfessionalRegistrationRequestdiv">
                        <p className="card-text hpViewParticipantUserDetails_style Admin_ViewOneHealthProfessionalRegistrationRequestId"><i className='bi bi-award-fill'></i> {bookingId} (Booking ID)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-award-fill'></i>{event?.firstName} {event?.lastName} (Full Name)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.requestPosition} (Profession)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-award-fill'></i> {event?.email} (Email)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.phoneNumber} (Contact Number)</p>
                        {event?.address2 === '' ? (
                            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-calendar2-week-fill'></i> {event?.address}, {event?.city}, {event?.district}, {event?.province} (Address)</p>
                        ) : (
                            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-calendar2-week-fill'></i> {event?.address}, {event?.address2}, {event?.city}, {event?.district}, {event?.province} (Address)</p>
                        )}
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {formatRequestTime(event?.requestTime)} (Request Time)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.experiences} (experiences)</p>
                        <a className="btn btn-outline-primary view_button" href={event.previousWorksPdf}>verification Details</a>
                        <a className="btn btn-outline-primary view_button" onClick={() => handleViewPreviousWorks(event.volunteerId, event.eventId)}>Previous Works</a>
                    </div>
                    <div className='button_div'>
                        <a onClick={handleClose} className="btn btn-primary" style={{width: '200px'}}><i className='bi bi-arrow-left-circle'></i> Go Back</a>
                        { event.bookingState === 'Booked' ? (
                        <span> 
                        <a
                    className={`btn participantDetailsParticipationMarkButton ${
                        event.participantState === 'NotParticipate' ? 'btn btn-outline-secondary participantDetailsMarkasParticepateShow' : 'btn-success participantDetailsMarkasNotParticepateShow'
                    }`} style={{marginLeft: '50px'}}
                    onClick={() =>
                    handleMarkAsParticipate(event.bookingId, event.participantState === 'NotParticipate' ? 'Participated' : 'NotParticipate', event.eventId)
                    }
                >
                    <i className={event.participantState === 'NotParticipate' ? 'Mark as Participate' : 'bi bi-check-lg'}></i>{' '}
                    {event.participantState === 'NotParticipate' ? 'Mark as Participate' : 'Participated'}
                </a>
                        </span> ) : (
                            <p className='deleteUserHpParticipentMark'>Canceled Event Booking</p>
                        )}
                        <a onClick={() => handleChatBox(event.eventId, event.volunteerId)} className="btn btn-success" style={{width: '200px', marginLeft: '50px'}}><i className="bi bi-chat"></i> Chat Box
                        {event.unreadMessageCount > 0 && (
                            <Badge
                            pill
                            bg="danger"
                            style={{
                                left: '15px',
                            }}
                            >
                            {event.unreadMessageCount}
                            </Badge>
                        )}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HP_ViewOneVolunteerDetailsForPhysicalEvent;
