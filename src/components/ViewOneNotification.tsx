import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif';
import './ViewOneNotification.css'

interface ViewOneNotificationProps {
  show: boolean;
  handleClose: () => void;
  NotificationId: any;
}

interface Notification {
    notification_id: number;
    owner_id: number;
    subject: string;
    message: string;
    read_state: string;
    notification_time: string;
}

const ViewOneNotification: React.FC<ViewOneNotificationProps> = ({ show, handleClose, NotificationId}) => {
    const [notificationDetails, setNotificationDetails] = useState<Notification | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();


    const fetchFineData = async () => {
        try {
          const response = await axios.get<Notification>(`http://localhost:15000/getOneNotificationsForAnyUser`, {
            params: { notificationId: NotificationId}
          });
          setNotificationDetails(response.data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };

useEffect(() => {
fetchFineData();
}, [NotificationId, setNotificationDetails, setError]);
    
const handleMarkAsParticipate = useCallback(async (notificationId: number, readState: string) => {
    try {
      navigate('/HP_LodingPage');
      await axios.put(`http://localhost:15000/updateNotificationReadStatus`, null, {
        params: { notificationId, readState }
      });
      navigate(`/HP_Notification`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [navigate]);

    return (
        <div className={`popup ${show ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability ViewOneNotification_popup">
            <div className="card HP_HallAvailability_fontSize">
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Notification Id : {notificationDetails?.notification_id}</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {notificationDetails ? (
                    <div>
                      <p className="card-text detail"><i className="bi bi-clipboard2-check-fill"></i> Subject : {notificationDetails.subject}</p>
                      <p className="card-text detail"> {notificationDetails.message}</p>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleClose}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <span> 
                            <a
                            className={`btn participantDetailsParticipationMarkButton HP_HallAvailability_hallBook ${
                            notificationDetails.read_state === 'Unread' ? 'btn btn-outline-secondary participantDetailsMarkasParticepateShow' : 'btn-success participantDetailsMarkasNotParticepateShow'
                            }`}
                            onClick={() =>
                            handleMarkAsParticipate(notificationDetails.notification_id, notificationDetails.read_state === 'Unread' ? 'Read' : 'Unread')
                            }>
                            <i className={notificationDetails.read_state === 'Unread' ? 'Mark as Participate' : 'bi bi-check-lg'}></i>{' '}
                            {notificationDetails.read_state === 'Read' ? 'Read' : 'Mark as Read'}
                            </a>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
        </div>
      );
    };
    
    export default ViewOneNotification;