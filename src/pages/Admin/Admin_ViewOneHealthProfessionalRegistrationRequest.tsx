import React, { useEffect, useState, FormEvent } from 'react';
import AdminSideBar from '../../components/Admin_Sidebar';
import '../HP/HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin_ViewOneHealthProfessionalRegistrationRequest.css';
import { parseISO, format } from 'date-fns';

interface Admin_ViewOneHealthProfessionalRegistrationRequestProps {
    show: boolean;
    handleClose: () => void;
    requestId: any;
}

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
    phoneNumber: string;
    organization: string;
    regNo: string;
    ownership: string;
    certificateImage: string;
    otherVerificationPdf: string;
    requestTime: string;
}

const Admin_ViewOneHealthProfessionalRegistrationRequest: React.FC<Admin_ViewOneHealthProfessionalRegistrationRequestProps> = ({ show, handleClose, requestId }) => {
    const [event, setEvent] = useState<HP_registrationRequestCard | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    const handleCancelPhysicalEvent = async (e: FormEvent) => {
        e.preventDefault();
        if (requestId) {
            navigate('/HP_LodingPage');
            try {
                await axios.put(`http://localhost:15000/acceptHealthProfessionalRegistrationRequest`, null, {
                    params: { requestId: Number(requestId) }
                });
                navigate('/AdminViewHealthProfessionalRegistrationRequest');
            } catch (error) {
                console.error(error);
            }
        }
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
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.profession} (Profession)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-award-fill'></i> {event?.email} (Email)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.phoneNumber} (Contact Number)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.organization} (Registered organization)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.regNo} (Registration Number)</p>
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {event?.ownership} (Ownership of organization)</p>
                        {event?.address2 === '' ? (
                            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-calendar2-week-fill'></i> {event?.address}, {event?.city}, {event?.district}, {event?.province} (Address)</p>
                        ) : (
                            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-calendar2-week-fill'></i> {event?.address}, {event?.address2}, {event?.city}, {event?.district}, {event?.province} (Address)</p>
                        )}
                        <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {formatRequestTime(event?.requestTime)} (Request Time)</p>
                        <a className="btn btn-outline-primary view_button" href={event.certificateImage}>Verification certificate</a>
                        <a className="btn btn-outline-primary view_button" href={event.otherVerificationPdf}>Other Verification Pdf</a>
                    </div>
                    <div className='button_div'>
                        <a href="/AdminViewHealthProfessionalRegistrationRequest" className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Go Back</a>
                        <a onClick={handleCancelPhysicalEvent} className="btn btn-success view_button"><i className='bi bi-chat-left-dots'></i> Accept Request</a>
                        <a href="HP_OneEvents" className="btn btn-danger book_button"><i className='bi bi-trash3'></i> Reject Request</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin_ViewOneHealthProfessionalRegistrationRequest;
