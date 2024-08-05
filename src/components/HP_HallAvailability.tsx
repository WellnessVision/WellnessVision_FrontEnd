import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif'
import HP_AddPhysicalEventOtherDetails from './HP_AddPhysicalEventOtherDetails';

interface HP_HallAvailabilityProps {
  show_3: boolean;
  handleClose_3: () => void;
  eventData: any;
  finalDuration: number;
}

const HP_HallAvailability: React.FC<HP_HallAvailabilityProps> = ({ show_3, handleClose_3, eventData, finalDuration }) => {
  const [message, setMessage] = useState('');
  const [event_id, setEventId] = useState('');
  const [totalCharge, setTotalCharge] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const hpId = String(localStorage.getItem('hpId'));
  const hpEmail = String(localStorage.getItem('hpEmail'));
  const [showPopup_4, togglePopup_4] = useToggle();

  useEffect(() => {
    if (eventData && eventData.event_id) {
      setEventId(eventData.event_id);
      const charge = parseInt(eventData.charge);
      const advancePercentage = parseFloat(eventData.advance_percentage);
      const calculatedTotalCharge = charge * finalDuration;
      const calculatedAdvancePayment = calculatedTotalCharge * advancePercentage / 100.0;

      setTotalCharge(calculatedTotalCharge);
      setAdvancePayment(calculatedAdvancePayment);
    }
  }, [eventData, finalDuration]);

  const handleCancelPhysicalEvent = async (event: FormEvent) => {
    event.preventDefault();
    if (event_id) {
      try {
        await axios.put('http://localhost:15000/physicalEvent', {
          event_id
        });
        handleClose_3();
      } catch (error) {
        setMessage('Error registering event');
      }
    }
  };

  return (
    <div className={`popup ${show_3 ? 'show HP_HallAvailabilityPopupForIt' : ''} `}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body HP_HallAvailabilityMainDivCard">
            <h5 className="card-title title_HP_HallAvailability">Hall Availability (In WellnessVision Premises)</h5>
            <div className="straight-line"></div>
            <div className='HP_HallAvailability_div'>
              {eventData ? (
                <div>
                  <p className="card-text detail Hall_ID_HP_HallAvailability"><i className="bi bi-award-fill"></i> {eventData.hall_id} (Hall ID)</p>
                  {eventData.hall_type === 'Lecture' && (
                    <p className="card-text detail Hall_type_HP_HallAvailability">
                      <i className="bi bi-bookmark-star-fill"></i> {eventData.hall_type} Hall (Tables and Chairs)
                    </p>
                  )}
                  {eventData.hall_type === 'Therapy' && (
                    <p className="card-text detail Hall_type_HP_HallAvailability">
                      <i className="bi bi-bookmark-star-fill"></i> {eventData.hall_type} Hall (Therapy Beds)
                    </p>
                  )}
                  {eventData.hall_type === 'Free Space' && (
                    <p className="card-text detail Hall_type_HP_HallAvailability">
                      <i className="bi bi-bookmark-star-fill"></i> {eventData.hall_type} Hall (Yoga Mats)
                    </p>
                  )}
                  <p className="card-text detail seats_HP_HallAvailability"><i className='bi bi-person-workspace'></i> {eventData.capacity} Seats (Maximum Participant Capacity)</p>
                  <p className="card-text detail price_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.{eventData.charge}/= (Per Hour (1h))<span className="card-text detail duration_HP_HallAvailability"><i className='bi bi-hourglass-split'></i> {finalDuration} hour duration</span></p>
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.{eventData.charge}/= *  {finalDuration}h = Rs.{totalCharge}/= (Total Charge for Hall)</p>
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-cash-stack'></i> {eventData.advance_percentage}% (Advance percentage)</p>
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.{totalCharge}/= *  {eventData.advance_percentage}% = Rs.{advancePayment}/= (Advance Payment)</p>
                  <div className='HP_HallAvailability_button_div'>
                    <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCancelPhysicalEvent}>
                      <i className="bi bi-arrow-left-circle"></i> Cancel
                    </button>
                    <button className="btn btn-warning HP_HallAvailability_hallBook" onClick={togglePopup_4}>
                      <i className="bi bi-bag-plus-fill"></i><span className='HP_HallAvailability_hallBook_text'> Book Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className='Unfortunately_header_HP_HallAvailability'>Unfortunately, Not Available</p>
                  <p className='Unfortunately_text_HP_HallAvailability'>All halls that meet your specifications are already booked for that date.</p>
                  <div className='HP_HallAvailability_button_div'>
                    <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleClose_3}>
                      <i className="bi bi-arrow-left-circle"></i> Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopup_4 && 
                        <HP_AddPhysicalEventOtherDetails 
                        show_4={showPopup_4} 
                        handleClose_4={togglePopup_4} 
                        eventData={eventData}
                        advancePayment={advancePayment}
                        totalCharge={totalCharge}
                        />}
      <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
    </div>
  );
};

export default HP_HallAvailability;