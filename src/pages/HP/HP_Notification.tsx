import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css';
import { useToggle } from '../../pages/HP/useToggle';
import HPSideBar from '../../components/HP_SideBar';
import { parseISO, format } from 'date-fns';
import './HP_Notification.css'
import ViewOneNotification from '../../components/ViewOneNotification';

interface Notification {
    notification_id: number;
    owner_id: number;
    subject: string;
    message: string;
    read_state: string;
    notification_time: string;
}

const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};

const HP_Notification: React.FC = () => {
    const [events, setEvents] = useState<Notification[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
    const hpId = Number(localStorage.getItem('hpId'));

    const fetchEvents = async () => {
        try {
            const response = await axios.get<Notification[]>(`http://localhost:15000/getAllNotificationsForAnyUser`, {
                params: { ownerId: hpId }
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

    const handleViewDetails = (NotificationId: number) => {
        setSelectedNotificationId(NotificationId);
        togglePopup();
    };

    const handleMarkAsParticipate = useCallback(async (notificationId: number, readState: string) => {
        try {
          await axios.put(`http://localhost:15000/updateNotificationReadStatus`, null, {
            params: { notificationId, readState }
          });
          fetchEvents();
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      }, [fetchEvents]);

    return (
        <div>
            <HPSideBar activeMenuItem={["Notification"]} />
            <div className="cardHang">
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Notifications</p>
                {events ? (
                    events.length > 0 ? (
                        events.map(event => (
                            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody" style={{ width: '100%' }} key={event.notification_id}>
                                <div className="card-body card-body participantDetailsFlexContainer">
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">Id: {event.notification_id}</h5>
                                    <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_NotificationSubject">Subject: {event.subject}</h5>
                                    <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_Notification_notificationTime">{formatRequestTime(event.notification_time)}</h5>
                                    <span> 
                                    <a
                                className={`btn participantDetailsParticipationMarkButton HP_Notification_markButton ${
                                    event.read_state === 'Unread' ? 'btn btn-outline-secondary participantDetailsMarkasParticepateShow' : 'btn-success participantDetailsMarkasNotParticepateShow'
                                }`}
                                onClick={() =>
                                handleMarkAsParticipate(event.notification_id, event.read_state === 'Unread' ? 'Read' : 'Unread')
                                }
                            >
                                <i className={event.read_state === 'Unread' ? 'Mark as Participate' : 'bi bi-check-lg'}></i>{' '}
                                {event.read_state === 'Read' ? 'Read' : 'Mark as Read'}
                            </a>
                                    </span>
                                    <a onClick={() => handleViewDetails(event.notification_id)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore HP_Notification_viewMore">
                                        <i className="bi bi-eye"></i> View Details
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Registration Requests are available</p>
                    )
                ) : (
                    <p>Loading notifications...</p>
                )}
            </div>
            {selectedNotificationId && 
            <ViewOneNotification 
                show={showPopup} 
                handleClose={togglePopup} 
                NotificationId={selectedNotificationId} 
                />}
        </div>
    );
};

export default HP_Notification;
