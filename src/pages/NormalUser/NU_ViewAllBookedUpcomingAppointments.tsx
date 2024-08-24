import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css';
import { useToggle } from '../../pages/HP/useToggle';
import NU_Sidebar from '../../pages/NormalUser/NU_components/NU_Sidebar';
import { parseISO, format } from 'date-fns';
import '../../pages/HP/HP_Notification.css'
import HP_ViewOnePhysicalEventPayment from '../../components/HP_ViewOnePhysicalEventPayment';
import '../../pages/HP/HP_ViewPhysicalEventPayment.css'
import '../../pages/HP/HP_ViewAllAppointmentSchedule.css'
import HP_AddAppointmentSchedulesDateSelection from '../../pages/HP/HP_AddAppointmentSchedulesDateSelection';

interface AppointmentSchedule {
    appointmentId: number;
    roomId: number;
    title: string;
    roomType: string;
    sunDay: number;
    monDay: number;
    tueDay: number;
    wedDay: number;
    thuDay: number;
    friDay: number;
    satDay: number;
    startTime: number;
    endTime: number;
    duration: number;
    capacity: number;
    bookingPrice: number;
    dailyState: string;
}

interface AppointmentBooking{
    bookingId: number;
    bookingDate: string;
    bookingTime: string;
    bookedAppointmentId: number;
    userId: number;
    appointmentNumber: number;
    bookingState: string;
    appointmentState: string;
    participantId: string;
    participantState: string;
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
}

const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
};

const NU_ViewAllBookedUpcomingAppointments: React.FC = () => {
    const [appointmentSchedules, setAppointmentSchedules] = useState<AppointmentSchedule[] | null>(null);
    const [appointmentBookingsDetails, setAppointmentBookingsDetails] = useState<AppointmentBooking[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const userId = String(localStorage.getItem('userId'));

    const fetchEvents = async () => {
        try {
            const response = await axios.get<AppointmentBooking[]>(`http://localhost:15000/getAppointmentBookingsDetailsOfOneUserForNu`, {
                params: { userId, appointmentState: "Upcoming" }
            });
            setAppointmentBookingsDetails(response.data);
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
    }, [setAppointmentBookingsDetails, setError]);

    const handleViewDetails = (bookingId: number, appointmentId: number) => {
        navigate(`/NU_ViewOneAppointmentBookingDetails/${bookingId}/${appointmentId}`);
    };

    return (
        <div>
           <NU_Sidebar activeMenuItem={["UpcomingAppointment", "MyAppointment"]}/>
            <div className="cardHang">
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder HP_ViewAllAppointmentSchedule_mainHeader'>Your Appointment Schedules</p>
                {appointmentBookingsDetails ? (
                    appointmentBookingsDetails.length > 0 ? (
                        appointmentBookingsDetails.map(oneAppointmentBooking => (
                            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody HP_ViewAllAppointmentSchedule_cardBody" style={{ width: '100%' }} key={oneAppointmentBooking.bookingId}>
                                <div className="card-body card-body participantDetailsFlexContainer">
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Booking Id : {oneAppointmentBooking.bookingId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Date : {oneAppointmentBooking.bookingDate}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Appointment Number : {oneAppointmentBooking.appointmentNumber}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Participant Id : {oneAppointmentBooking.participantId}</h5>
                                <a onClick={() => handleViewDetails(oneAppointmentBooking.bookingId, oneAppointmentBooking.bookedAppointmentId)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore HP_ViewPhysicalEventPayment_viewMore">
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
        </div>
    );
};

export default NU_ViewAllBookedUpcomingAppointments;
