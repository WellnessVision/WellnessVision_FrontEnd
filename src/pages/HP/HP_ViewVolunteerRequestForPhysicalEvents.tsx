import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../components/Admin_Sidebar';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css'
import { useToggle } from '../../pages/HP/useToggle';
import HP_ViewOneVolunteerRequestForPhysicalEvents from '../../components/HP_ViewOneVolunteerRequestForPhysicalEvents';
import HPSideBar from '../../components/HP_SideBar';
import { useParams } from 'react-router-dom';

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

const HP_ViewVolunteerRequestForPhysicalEvents: React.FC = () => {
    const [events, setEvents] = useState<HP_VolunteerRequestForPhysicalEventCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedrequestId, setSelectedRequestId] = useState<number | null>(null);
    const { eventId } = useParams<{ eventId: string }>();

    const fetchEvents = async () => {
        try {
            const response = await axios.get<HP_VolunteerRequestForPhysicalEventCard[]>(`http://localhost:15000/getVolunteerRequestForPhysicalEventsForHealthProfessionals`, {
              params: { eventId }
            });
            setEvents(response.data);
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
    }, []);

    const handleViewDetails = (requestId: number) => {
        setSelectedRequestId(requestId);
        togglePopup();
      };

    return (
        <div>
            <HPSideBar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
            <div className="cardHang">
            <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Volunteer Requests for Event Id {eventId}</p>
                {events.length > 0 ? (
                    events.map(event => (
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.requestId}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={event.profilePicture} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="Event image" />
                            <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">RequestId: {event.requestId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{event.firstName} {event.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{event.requestPosition}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{event.email}</h5>
                                <a onClick={() => handleViewDetails(event.requestId)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore">
                                    <i className="bi bi-eye"></i> View Details
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Volunteer Requests are available</p>
                )}
            </div>
            {selectedrequestId && 
        <HP_ViewOneVolunteerRequestForPhysicalEvents 
          show={showPopup} 
          handleClose={togglePopup} 
          requestId={selectedrequestId} 
          eventId={eventId}
        />}
        </div>
    );
};

export default HP_ViewVolunteerRequestForPhysicalEvents;
