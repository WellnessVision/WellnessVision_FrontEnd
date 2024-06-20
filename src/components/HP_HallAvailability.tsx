import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';

interface HP_HallAvailabilityProps {
  show_2: boolean;
  handleClose_2: () => void;
  eventData: any;
  finalDuration: number;
  eventImage: File | null; 
}

const HP_HallAvailability: React.FC<HP_HallAvailabilityProps> = ({ show_2, handleClose_2, eventData, finalDuration, eventImage}) => {
  const [message, setMessage] = useState('');
  const [event_id, setEventId] = useState('');

  useEffect(() => {
    if (eventData && eventData.event_id) {
      setEventId(eventData.event_id);
    }
  }, [eventData]);

  const handleOrderPhysicalEvent = async (event: FormEvent) => {
    event.preventDefault();
    if (event_id) {
      try {

        if (!eventImage) {
          setMessage('Please select an image file');
          return;
      }

        const formData = new FormData();
        formData.append('file', eventImage);
        formData.append('event_id', event_id);

        await axios.post('http://localhost:15000/physicalEventImageUpload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        handleClose_2();
      } catch (error) {
        setMessage('Error registering event');
      }
    }
  };

  const handleCancelPhysicalEvent = async (event: FormEvent) => {
    event.preventDefault();
    if (event_id) {
      try {
        await axios.put('http://localhost:15000/physicalEvent', {
          event_id
        });
        handleClose_2();
      } catch (error) {
        setMessage('Error registering event');
      }
    }
  };

  return (
    <div className={`popup ${show_2 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
      <div className="popup-inner popup-inner_HP_HallAvailability">
        <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
          <div className="card-body">
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
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.{eventData.charge}/= *  {finalDuration}h = Rs.{parseInt(eventData.charge)*finalDuration}/= (Total Charge for Hall)</p>
                  
                  <div className='HP_HallAvailability_button_div'>
                <a className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCancelPhysicalEvent}>
                  <i className="bi bi-arrow-left-circle"></i> Cancel
                </a>
                <a href="HP_ViewEvents" className="btn btn-warning HP_HallAvailability_hallBook" onClick={handleOrderPhysicalEvent}>
                  <i className="bi bi-bag-plus-fill"></i><span className='HP_HallAvailability_hallBook_text'> Book Now</span>
                </a>
              </div>
                </div>
                
              ) : (
                <div>
                  <p className='Unfortunately_header_HP_HallAvailability'>Unfortunately, Not Available</p>
                  <p className='Unfortunately_text_HP_HallAvailability'>All halls that meet your specifications are already booked for that date.</p>
                  <div className='HP_HallAvailability_button_div'>
                <a className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleClose_2}>
                  <i className="bi bi-arrow-left-circle"></i> Go Back
                </a>
              </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HP_HallAvailability;
