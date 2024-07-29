import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css';
import { useToggle } from '../../pages/HP/useToggle';
import HPSideBar from '../../components/HP_SideBar';
import { parseISO, format } from 'date-fns';
import './HP_Notification.css'
import HP_ViewOnePhysicalEventPayment from '../../components/HP_ViewOnePhysicalEventPayment';
import './HP_ViewPhysicalEventPayment.css'

interface physicalEventPayment {
    payment_id: number;
    physical_event_id: number;
    payment_date: string;
    payment_time: string;
    amount: number;
    payment_state: string;
    payment_description: string;
    event_state: string;
}

const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};

const HP_ViewPhysicalEventPayment: React.FC = () => {
    const [events, setEvents] = useState<physicalEventPayment[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const hpId = Number(localStorage.getItem('hpId'));

    const fetchEvents = async () => {
        try {
            const response = await axios.get<physicalEventPayment[]>(`http://localhost:15000/viewHealthProfessionalPhysicalEventPaymentForHP`, {
                params: { hpId: hpId }
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
    }, [setEvents, setError]);

    const handleViewDetails = (NotificationId: number, EventId: number) => {
        setSelectedPaymentId(NotificationId);
        setSelectedEventId(EventId);
        togglePopup();
    };

    return (
        <div>
            <HPSideBar activeMenuItem={["Payments"]} />
            <div className="cardHang">
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Physical Event Payments</p>
                {events ? (
                    events.length > 0 ? (
                        events.map(event => (
                            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody" style={{ width: '100%' }} key={event.payment_id}>
                                <div className="card-body card-body participantDetailsFlexContainer">
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Payment Id : {event.payment_id}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Event Id : {event.physical_event_id}</h5>
                                    <h5 className={`card-title Admin_ViewHealthProfessionalRegistrationRequest_name
                                    ${event.payment_state === ('Payment' || 'payment' ) ? 'HP_ViewPhysicalEventPayment_payment' : 'HP_ViewPhysicalEventPayment_receipts'}`}>
                                        <span className='HP_ViewPhysicalEventPayment_PaymentState'>Payment State : </span>{event.payment_state}</h5>
                                    <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{formatRequestTime(event.payment_time)}</h5>
                                    <a onClick={() => handleViewDetails(event.payment_id, event.physical_event_id)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore HP_ViewPhysicalEventPayment_viewMore">
                                        <i className="bi bi-eye"></i> View Details
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Payments are available</p>
                    )
                ) : (
                    <p>Loading Payments...</p>
                )}
            </div>
            {selectedPaymentId && 
            <HP_ViewOnePhysicalEventPayment 
                show={showPopup} 
                handleClose={togglePopup} 
                paymentId={selectedPaymentId} 
                EventId={selectedEventId} 
                />}
        </div>
    );
};

export default HP_ViewPhysicalEventPayment;
