import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../../resources/prosecing.gif';
import '../../../components/HP_HallAvailability.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css';
import '../../../components/HP_EventBookingClose.css';

interface HP_EventBookingCloseProps {
  show_3: boolean;
  handleClose_3: () => void;
  eventId: any;
}

const EM_EventBookingCloseForEventManager: React.FC<HP_EventBookingCloseProps> = ({ show_3, handleClose_3, eventId }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const handleCloseEventBooking = useCallback(async () => {
    try {
      setShowLoadingPopup(true);
      await axios.put(`http://localhost:15000/closeEventBookingForHp`, null, {
        params: { eventId }
      });
      handleClose_3();
      setShowLoadingPopup(false);
      navigate(`/EM_ViewOnePreviousPhysicalEvent/${eventId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setShowLoadingPopup(false);
    }
  }, [eventId, handleClose_3]);

  return (
    <div className={`popup ${show_3 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
            <h5 className="card-title title_HP_HallAvailability">Close Event Booking</h5>
            <div className="straight-line"></div>
            <div className='HP_HallAvailability_div'>
              <p className='eventCloseMessagePara_1'>After closing event bookings, you can't reopen it.</p>
              <p className='eventCloseMessagePara_2'>Also, you can't delete the event and participants can't delete or book tickets.</p>
              {error && <p className="text-danger">{error}</p>}
              <button
                type="button"
                className="btn btn-primary HP_HallAvailability_cancel_button eventCloseMessageCloseButton"
                onClick={handleClose_3}>
                <i className="bi bi-arrow-left-circle"></i> Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger HP_HallAvailability_cancel_button eventCloseMessageContinueButton"
                onClick={handleCloseEventBooking}>
                <i className="bi bi-power"></i> Close Event Booking
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLoadingPopup && <img className="loading eventBookingCloseForHPLoadingGif" src={loading_gif} alt="Loading..." />}
    </div>
  );
}

export default EM_EventBookingCloseForEventManager;
