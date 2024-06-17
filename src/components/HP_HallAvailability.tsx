import React, { useState } from 'react';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';

interface HP_HallAvailabilityProps {
  show_2: boolean;
  handleClose_2: () => void;
  eventData: any; // Adjust type as per your actual data structure
}

const HP_HallAvailability: React.FC<HP_HallAvailabilityProps> = ({ show_2, handleClose_2, eventData }) => {
  const [message, setMessage] = useState('');

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
                  <p className="card-text detail Hall_type_HP_HallAvailability"><i className="bi bi-bookmark-star-fill"></i> {eventData.hall_type}</p>
                  <p className="card-text detail seats_HP_HallAvailability"><i className='bi bi-person-workspace'></i> {eventData.capacity} Seats (Maximum Participant Capacity)</p>
                  <p className="card-text detail price_HP_HallAvailability"><i className='bi bi-cash-stack'></i> Rs.{eventData.charge} (Per Hour (2h))</p>
                  <p className="card-text detail duration_HP_HallAvailability"><i className='bi bi-hourglass-split'></i> {eventData.charge} * 2h = Rs.{parseInt(eventData.charge)*2} (Total Charge for Hall)</p>
                </div>
              ) : (
                <p>No event data available</p>
              )}
              <div>
                <a href="HP_OneEvent" className="btn btn-primary HP_HallAvailability_cancel">
                  <i className="bi bi-arrow-left-circle"></i> Cancel
                </a>
                <a href="HP_OneEvent" className="btn btn-warning HP_HallAvailability_hallBook">
                  <i className="bi bi-bag-plus-fill"></i><span className='HP_HallAvailability_hallBook_text'> Book Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HP_HallAvailability;
