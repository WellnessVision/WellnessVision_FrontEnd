import React, { useEffect, useState, FormEvent } from 'react';
import '../pages/HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Admin/Admin_ViewOneHealthProfessionalRegistrationRequest.css';
import { parseISO, format } from 'date-fns';

interface HP_VolunteerRequestForPhysicalEventCardProps {
    show: boolean;
    handleClose: () => void;
    requestId: any;
    eventId: any;
}

interface HP_VolunteerRequestForPhysicalEventCard {
    volunteerId: number;
    requestId: number;
    eventId: number;
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
}

const HP_ViewOneVolunteerRequestForPhysicalEvents: React.FC<HP_VolunteerRequestForPhysicalEventCardProps> = ({ show, handleClose, requestId, eventId }) => {
    const [event, setEvent] = useState<HP_VolunteerRequestForPhysicalEventCard | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<HP_VolunteerRequestForPhysicalEventCard>(`http://localhost:15000/getOneVolunteerRequestForPhysicalEventsForHealthProfessionals`, {
                    params: { requestId }
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
    }, [requestId]);

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

    const handleAcceptVolunteerRequest = async (e: FormEvent) => {
        e.preventDefault();
        if (requestId) {
            navigate('/HP_LodingPage');
            try {
                await axios.put(`http://localhost:15000/acceptVolunteerPhysicalEventRequestForHP`, null, {
                    params: { requestId: Number(requestId) }
                });
                navigate(`/HP_ViewVolunteerRequestForPhysicalEvents/${eventId}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleViewPreviousWorks = (volunteerId: number) => {
        navigate(`/HP_ViewVolunteerPreviousWorks/${volunteerId}/${eventId}`);
      };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner hpViewParticipantUserDetails_popup_inner">
                <div className="card hpViewParticipantUserDetails_card" style={{ width: '100%', height: '100%' }}>
                    <a href={event?.profilePicture}>
                        <img src={event?.profilePicture} className="hpViewParticipantUserDetailsImage Admin_ViewOneHealthProfessionalRegistrationRequestImage" alt="Card image" />
                    </a>
                    <div className="card-body Admin_ViewOneHealthProfessionalRegistrationRequestdiv">
                        <p className="card-text hpViewParticipantUserDetails_style Admin_ViewOneHealthProfessionalRegistrationRequestId"><i className='bi bi-award-fill'></i> {requestId} (Request ID)</p>
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
                        <a className="btn btn-outline-primary view_button" onClick={() => handleViewPreviousWorks(event.volunteerId)}>Previous Works</a>
                    </div>
                    <div className='button_div'>
                        <a onClick={handleClose} className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Go Back</a>
                        <a onClick={handleAcceptVolunteerRequest} className="btn btn-success view_button"><i className='bi bi-chat-left-dots'></i> Accept Request</a>
                        <a href="HP_OneEvents" className="btn btn-danger book_button"><i className='bi bi-trash3'></i> Reject Request</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HP_ViewOneVolunteerRequestForPhysicalEvents;
