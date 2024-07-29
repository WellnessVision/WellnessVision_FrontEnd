import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css';
import { useToggle } from '../HP/useToggle';
import NU_Sidebar from './NU_components/NU_Sidebar';
import { parseISO, format } from 'date-fns';
import '../HP/HP_Notification.css'
import HP_ViewOnePhysicalEventPayment from '../../components/HP_ViewOnePhysicalEventPayment';
import '../HP/HP_ViewPhysicalEventPayment.css'
import NU_ViewOnePhysicalEventBookingPayment from './NU_components/NU_ViewOnePhysicalEventBookingPayment';

interface physicalEventBookingPayment {
    paymentId: number;
    bookingId: number;
    paymentDate: string;
    amount: number;
    paymentState: string;
    paymentDescription: string;
}

const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};

const NU_ViewPhysicalEventBookingPayment: React.FC = () => {
    const [events, setEvents] = useState<physicalEventBookingPayment[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const userId = Number(localStorage.getItem('userId'));

    const fetchEvents = async () => {
        try {
            const response = await axios.get<physicalEventBookingPayment[]>(`http://localhost:15000/viewNormalUserPhysicalEventBookingPaymentForNU`, {
                params: { userId: userId }
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
            <NU_Sidebar activeMenuItem={["Payments"]} />
            <div className="cardHang">
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Physical Event Booking Payments</p>
                {events ? (
                    events.length > 0 ? (
                        events.map(event => (
                            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody" style={{ width: '100%' }} key={event.paymentId}>
                                <div className="card-body card-body participantDetailsFlexContainer">
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Payment Id : {event.paymentId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Booking Id : {event.bookingId}</h5>
                                    <h5 className={`card-title Admin_ViewHealthProfessionalRegistrationRequest_name
                                    ${event.paymentState === ('Payment' || 'payment' ) ? 'HP_ViewPhysicalEventPayment_payment' : 'HP_ViewPhysicalEventPayment_receipts'}`}>
                                        <span className='HP_ViewPhysicalEventPayment_PaymentState'>Payment State : </span>{event.paymentState}</h5>
                                    <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{formatRequestTime(event.paymentDate)}</h5>
                                    <a onClick={() => handleViewDetails(event.paymentId, event.bookingId)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore HP_ViewPhysicalEventPayment_viewMore">
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
            <NU_ViewOnePhysicalEventBookingPayment 
                show={showPopup} 
                handleClose={togglePopup} 
                paymentId={selectedPaymentId} 
                BookingId={selectedEventId} 
                />}
        </div>
    );
};

export default NU_ViewPhysicalEventBookingPayment;
