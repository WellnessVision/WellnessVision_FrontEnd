import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loading_gif from '../resources/prosecing.gif';
import './HP_HallAvailability.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css';
import '../components/HP_EventBookingClose.css';
import '../components/HP_ViewBookingParticipationDetails.css'

interface HP_ViewBookingParticipationDetailsProps {
  show_4: boolean;
  handleClose_4: () => void;
  ParticipationDetails: any;
}

interface participationUserDetails {
     user_id : number
     user_type : string
     email : string
     phone : string
     district : string
     city : string
     address : string
     address2 : string
     firstName : string
     lastName : string
     preferences : string
     province : string
     password : string
     profilePic : string
  }

  const HP_ViewBookingParticipationDetails: React.FC<HP_ViewBookingParticipationDetailsProps> = ({ show_4, handleClose_4, ParticipationDetails }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [userDetails, setUserDetails] = useState<participationUserDetails | null>(null);
  const [user_id, setUser_id] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [participantState, setParticipantState] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [bookingState, setBookingState] = useState('');
  const eventId = String(localStorage.getItem('eventId'));

  useEffect(() => {
    if (ParticipationDetails) {
        setUser_id(ParticipationDetails.user_id);
        setParticipantId(ParticipationDetails.participantId);
        setParticipantState(ParticipationDetails.participantState);
        setBookingId(ParticipationDetails.bookingId);
        setBookingState(ParticipationDetails.bookingState);
    }
  }, [ParticipationDetails]);

  const handleMarkAsParticipate = useCallback(async (bookingId: number, participantState: string) => {
    try {
      navigate('/HP_LodingPage');
      await axios.put(`http://localhost:15000/updatePhysicalEventParticipationState`, null, {
        params: { bookingId, participantState }
      });
      navigate(`/HP_OneEvents/${eventId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<participationUserDetails>(`http://localhost:15000/bookingParticipationUserDetailsForHp?`,{
            params: { userId: user_id }
        });
        setUserDetails(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchEvent();
  }, [user_id]);


  return (
    <div className={`popup ${show_4 ? 'show' : ''}`}>
      <div className="popup-inner hpViewParticipantUserDetails_popup_inner">
      <div className="card hpViewParticipantUserDetails_card" style={{ width: '100%', height: '100%' }}>
            <img src ={userDetails?.profilePic} className="hpViewParticipantUserDetailsImage" alt="Card image" />
            <div className="card-body">
            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-award-fill'></i> {participantId} (participant ID)</p>
            <div className="straight-line"></div>
            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-award-fill'></i>{userDetails?.firstName} {userDetails?.lastName} (Full Name)</p>
            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-award-fill'></i> {userDetails?.email} (Email)</p>
            <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-soundwave'></i> {userDetails?.phone} (Contact Number)</p>
            {userDetails?.address2 === '' ?  <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-calendar2-week-fill'></i> {userDetails?.address}, {userDetails?.city}, {userDetails?.district}, {userDetails?.province} (Address)</p> 
            : <p className="card-text hpViewParticipantUserDetails_style"><i className='bi bi-calendar2-week-fill'></i> {userDetails?.address}, {userDetails?.address2}, {userDetails?.city}, {userDetails?.district}, {userDetails?.province} (Address)</p>}
            <a className="btn btn-primary HP_ViewBookingParticipationDetails_closeButton" onClick={handleClose_4}>
                      <i className="bi bi-arrow-left-circle"></i> Go Back
                    </a>
            { bookingState === 'Booking' ? (
                  <span> 
                  <a
            className={`btn participantDetailsParticipationMarkButton ${
              participantState === 'NotParticipate' ? 'btn-outline-success participantDetailsMarkasParticepateShow' : 'btn-success participantDetailsMarkasNotParticepateShow'
            }`}
            onClick={() =>
              handleMarkAsParticipate(Number(bookingId), participantState === 'NotParticipate' ? 'Participated' : 'NotParticipate')
            }
          >
            <i className={participantState === 'NotParticipate' ? 'Mark as Participate' : 'bi bi-check-lg'}></i>{' '}
            {participantState === 'NotParticipate' ? 'Mark as Participate' : 'Participated'}
          </a>
                  </span> ) : (
                    <a className='deleteUserHpParticipentMark'>Canceled Event Booking</a>
                  )}
            </div>
         </div>
      </div>
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default HP_ViewBookingParticipationDetails;
