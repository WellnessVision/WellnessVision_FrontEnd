import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HPSideBar from '../../components/HP_SideBar';
import '../HP/HP_ViewEvents.css';

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
    profession: string;
    organization: string;
    regNo: string;
    ownership: string;
    certificateImage: string;
    otherVerificationPdf: string;
    requestTime: string;
}

const HP_registrationRequest: React.FC = () => {
    const [events, setEvents] = useState<HP_registrationRequestCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await axios.get<HP_registrationRequestCard[]>(`http://localhost:15000/viewHealthProfessionalRegistrationRequest`);
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
        navigate(`/AdminViewOneHealthProfessionalRegistrationRequest/${requestId}`);
      };

    return (
        <div>
            <HPSideBar activeMenuItem="Events" />
            <div className="cardHang">
                {events.length > 0 ? (
                    events.map(event => (
                        <div className="card" style={{ width: '18rem' }} key={event.requestId}>
                            <img src={event.profilePicture} className="card-img-top" alt="Event image" />
                            <div className="card-body">
                                <h5 className="card-title title">{event.firstName}</h5>
                                <div className="straight-line"></div>
                                <p className="card-text detail">
                                    <i className="bi bi-bookmark-star-fill"></i> {event.lastName}
                                </p>
                                <p className="card-text detail">
                                    <i className="bi bi-soundwave"></i> {event.requestId} (WellnessVision Hall)
                                </p>
                                <p className="card-text detail">
                                    <i className="bi bi-calendar2-week-fill"></i> {event.requestTime}
                                </p>
                                <a onClick={() => handleViewDetails(event.requestId)} className="btn btn-primary">
                                    <i className="bi bi-eye"></i> View Details
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Registration Requests are available</p>
                )}
            </div>
        </div>
    );
};

export default HP_registrationRequest;
