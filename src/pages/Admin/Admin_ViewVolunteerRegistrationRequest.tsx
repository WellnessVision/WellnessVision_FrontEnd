import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from './Admin_components/Admin_Sidebar';
import '../HP/HP_ViewEvents.css';
import './Admin_ViewHealthProfessionalRegistrationRequest.css'
import { useToggle } from '../../pages/HP/useToggle';
import Admin_ViewOneVolunteerRegistrationRequest from './Admin_ViewOneVolunteerRegistrationRequest';

interface HP_registrationRequestCard {
    requestId: number;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    district: string;
    province: string;
    zip: string;
    email: string;
    profilePicture: string;
    password: string;
    experiences: string;
    previousWorksPdf: string;
    requestTime: string;
}

const Admin_ViewVolunteerRegistrationRequest: React.FC = () => {
    const [events, setEvents] = useState<HP_registrationRequestCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedrequestId, setSelectedRequestId] = useState<number | null>(null);

    const fetchEvents = async () => {
        try {
            const response = await axios.get<HP_registrationRequestCard[]>(`http://localhost:15000/viewVolunteerRegistrationRequestForAdmin`);
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
            <AdminSideBar activeMenuItem={["VolunteerRegistretionRequest", "RegistretionRequest"]}/>
            <div className="cardHang">
            <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Volunteer RegistretionRequest</p>
                {events.length > 0 ? (
                    events.map(event => (
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.requestId}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={event.profilePicture} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="Event image" />
                            <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Request Id: </span>{event.requestId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Name: </span>{event.firstName} {event.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Email: </span>
                                {event.email.length > 26
                                    ? `${event.email.substring(0, 26)}...`
                                    : event.email}</h5>
                                <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleViewDetails(event.requestId)}}>
                                <i className="bi bi-eye"></i> View Details</a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Registration Requests are available</p>
                )}
            </div>
            {selectedrequestId && 
        <Admin_ViewOneVolunteerRegistrationRequest 
          show={showPopup} 
          handleClose={togglePopup} 
          requestId={selectedrequestId} 
        />}
        </div>
    );
};

export default Admin_ViewVolunteerRegistrationRequest;
