import React, { useEffect, useState, FormEvent } from 'react';
import HPSideBar from '../../components/HP_SideBar';
import '../HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const HP_viewOneRegistrationRequest: React.FC = () => {
    const { requestId } = useParams<{ requestId: string }>();
    const [event, setEvent] = useState<HP_registrationRequestCard | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get<HP_registrationRequestCard>(`http://localhost:15000/viewOneHealthProfessionalRegistrationRequest`, {
                    params: { requestId: requestId }
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

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!event) {
        return <div>Loading...</div>;
    }

    const handleCancelPhysicalEvent = async (e: FormEvent) => {
        e.preventDefault();
        if (requestId) {
            try {
                await axios.put(`http://localhost:15000/acceptHealthProfessionalRegistrationRequest`, null, {
                    params: { requestId: Number(requestId) }
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <HPSideBar activeMenuItem="Events" />
            <div className="cardHang_2">
                <div className="card" style={{ width: '95%' }}>
                    <img src={event.profilePicture} className="image" alt="Card image" />
                    <div className="card-body">
                        <div className='base_details'>
                            <h5 className="card-title title">{event.firstName}</h5>
                            <div className="straight-line"></div>
                            <p className="card-text detail"><i className='bi bi-bookmark-star-fill'></i> {event.lastName}</p>
                            <p className="card-text detail physical"><i className='bi bi-soundwave'></i> {event.requestId} (WellnessVision Hall)</p>
                            <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {event.requestTime}</p>
                            <p className="card-text detail date"><i className='bi bi-alarm-fill'></i> {event.regNo}</p> 
                            <p className="card-text detail duration"><i className='bi bi-hourglass-split'></i> {event.organization} hour duration</p> 
                            <p className="card-text detail price"><i className='bi bi-cash-stack'></i> Rs.{event.otherVerificationPdf}/= (Per participant)</p> 
                            <p className="card-text detail seats"><i className='bi bi-person-workspace'></i> {event.address} Seats</p> 
                            <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> 540 Bookings</p> 
                            <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> {event.profession} Language</p> 
                        </div>
                        <div>
                            <h5 className='description'>Description</h5>
                            <p>{event.city}</p>
                        </div>
                        <div className='button_div'>
                            <a href="/HP_ViewEvents" className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Back to Events</a>
                            <a onClick={handleCancelPhysicalEvent} className="btn btn-success view_button"><i className='bi bi-chat-left-dots'></i> Accept Request</a>
                            <a href="HP_OneEvents" className="btn btn-danger book_button"><i className='bi bi-trash3'></i> Reject Request</a>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default HP_viewOneRegistrationRequest;
