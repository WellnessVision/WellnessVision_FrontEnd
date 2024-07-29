import React, { useState, useEffect, FormEvent,useCallback } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif';
import './ViewOneNotification.css'
import success_gif from'../resources/success_gif.gif'
import success_image from'../resources/success_image.gif'
import './SuccessMessage.css'

interface SuccessMessageProps {
  show: boolean;
  handleClose: () => void;
  message: any;
  successState: any;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ show, handleClose, message, successState}) => {
    const navigate = useNavigate();
    const [showGif, setShowGif] = useState(true);
    const gifDuration = 1500; 

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGif(false);
        }, gifDuration);
    
        return () => clearTimeout(timer);
    }, []);

    const handleViewDetails = () => {
        navigate(`/`);
    };



return (
        <div className={`popup ${show ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability ViewOneNotification_popup SuccessMessage_popup">
            <div className="card HP_HallAvailability_fontSize">
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <div className='HP_HallAvailability_div'>
                  {successState === "Success" ? (
                    <div>
                        {showGif ? (
                            <img src={success_gif} alt="animated GIF" />
                              ) : (
                            <img src={success_image} alt="static image" />
                        )}
                    </div>
                  ) : (
                    <div>
                    </div>
                  )}
                <h5 className="card-title title_HP_HallAvailability SuccessMessage_message">{message}</h5>
                <button className="btn btn-primary HP_HallAvailability_cancel_button SuccessMessage_gotItButton" onClick={handleViewDetails}>
                          <i className="bi bi-hand-thumbs-up"></i> Thanks! Got it
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default SuccessMessage;