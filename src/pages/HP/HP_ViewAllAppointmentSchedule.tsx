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
import './HP_ViewAllAppointmentSchedule.css'
import HP_AddAppointmentSchedulesDateSelection from './HP_AddAppointmentSchedulesDateSelection';

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

const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
};

const HP_ViewAllAppointmentSchedule: React.FC = () => {
    const [appointmentSchedules, setAppointmentSchedules] = useState<AppointmentSchedule[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const hpId = Number(localStorage.getItem('hpId'));

    const fetchEvents = async () => {
        try {
            const response = await axios.get<AppointmentSchedule[]>(`http://localhost:15000/viewAllAppointmentScheduleForHp`, {
                params: { hpId: hpId }
            });
            setAppointmentSchedules(response.data);
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
    }, [setAppointmentSchedules, setError]);

    const handleViewDetails = (appointmentId: number) => {
        navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentId}`);
    };

    return (
        <div>
            <HPSideBar activeMenuItem={["My Appointments"]} />
            <div className="cardHang">
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder HP_ViewAllAppointmentSchedule_mainHeader'>Your Appointment Schedules</p>
                <a onClick={togglePopup} className="btn btn-success HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton">
                    <i className="bi bi-plus-lg"></i> New Appointment Schedule 
                 </a>
                {appointmentSchedules ? (
                    appointmentSchedules.length > 0 ? (
                        appointmentSchedules.map(appointmentSchedule => (
                            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody HP_ViewAllAppointmentSchedule_cardBody" style={{ width: '100%' }} key={appointmentSchedule.appointmentId}>
                                <div className="card-body card-body participantDetailsFlexContainer">
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_appointmentId">Appointment Id : {appointmentSchedule.appointmentId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title">Title : {appointmentSchedule.title}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time">Available Time : {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_roomId">Room Id : {appointmentSchedule.roomId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_roomType">Room Type : {appointmentSchedule.roomType == 'Discussion' ? ('Discussion Room') : ('') }</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_todayState">Daily State : <span className='HP_ViewAllAppointmentSchedule_todayStateColour'>{appointmentSchedule.dailyState}</span></h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Schedual">Available Days : 
                                <span>{appointmentSchedule.sunDay && appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && appointmentSchedule.satDay ? (' Every Day') : 
                                (<span> {appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && !appointmentSchedule.satDay && !appointmentSchedule.sunDay? (' Weekdays') : 
                                    (<span> {appointmentSchedule.satDay && appointmentSchedule.sunDay && !appointmentSchedule.monDay && !appointmentSchedule.tueDay && !appointmentSchedule.wedDay && !appointmentSchedule.thuDay && !appointmentSchedule.friDay? (' Weekend Days') :     
                                    (<span>
                                    {appointmentSchedule.sunDay ? (' Sun'):('')}
                                    {appointmentSchedule.sunDay && appointmentSchedule.monDay ? ', Mon' : appointmentSchedule.monDay ? ' Mon' : ''}
                                    {appointmentSchedule.monDay && appointmentSchedule.tueDay ? ', Tues': appointmentSchedule.tueDay ? ' Tues': ''}
                                    {appointmentSchedule.tueDay && appointmentSchedule.wedDay ? ', Wed' : appointmentSchedule.wedDay ? ' Wed' : ''}
                                    {appointmentSchedule.wedDay && appointmentSchedule.thuDay ? ', Thurs' : appointmentSchedule.thuDay ? ' Thurs' : ''}
                                    {appointmentSchedule.thuDay && appointmentSchedule.friDay ? ', Fri' : appointmentSchedule.friDay ? ' Fri' : ''}
                                    {appointmentSchedule.friDay && appointmentSchedule.satDay ? ', Sat' : appointmentSchedule.satDay ? ' Sat' : ''} 
                                    </span>)}</span>)}</span>)}</span>
                                    </h5>
                                <a onClick={() => handleViewDetails(appointmentSchedule.appointmentId)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore HP_ViewPhysicalEventPayment_viewMore HP_ViewAllAppointmentSchedule_viewMore">
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
            <HP_AddAppointmentSchedulesDateSelection show={showPopup} handleClose={togglePopup} />
        </div>
    );
};

export default HP_ViewAllAppointmentSchedule;
