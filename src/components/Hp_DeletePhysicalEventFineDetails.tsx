import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif';
import Hp_DeletePhysicalEventReasonAndContinue from '../components/Hp_DeletePhysicalEventReasonAndContinue';

interface Hp_DeletePhysicalEventFineDetailsProps {
  show: boolean;
  handleClose: () => void;
}

interface fineAmountData {
    today: string;
    eventDate: string;
    twoDaysBeforeDate: string;
    fineAmount: number;
    depositAmount: number;
    hallCharge: number;
    advancePayment: number;
    advancePaymentPercentage: number;
    fineAmountDetails: string; 
  }

const Hp_DeletePhysicalEventFineDetails: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show, handleClose}) => {
    const [fineAmountDetails, setFineAmountDetails] = useState<fineAmountData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();


    const fetchFineData = async () => {
        try {
          const response = await axios.get<fineAmountData>(`http://localhost:15000/viewFineAmountForHP`, {
            params: { eventId: eventId}
          });
          setFineAmountDetails(response.data);
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
}, []);
    


    return (
        <div className={`popup ${show ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical events</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {fineAmountDetails ? (
                    <div>
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> {fineAmountDetails.today} (Today)</p>
                      <p className="card-text detail"><i className="bi bi-calendar3"></i> {fineAmountDetails.eventDate} (Event Date)</p>
                      <p className="card-text detail"><i className='bi bi-calendar-week'></i> {fineAmountDetails.twoDaysBeforeDate} (Two Days Before Date From Event)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> Rs.{fineAmountDetails.hallCharge}/= (Total Charge for Hall)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i>  Rs.{fineAmountDetails.hallCharge}/= * {fineAmountDetails.advancePaymentPercentage}% = Rs.{fineAmountDetails.advancePayment}/= (Advance Payment)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> Rs.{fineAmountDetails.hallCharge}/= * 5% = Rs.{fineAmountDetails.fineAmount}/= (Fine Amount)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> Rs.{fineAmountDetails.advancePayment} - Rs.{fineAmountDetails.fineAmount} = Rs.{fineAmountDetails.depositAmount}/= (Deposit Amount)</p>
                      <div className='fine_details_Hp_DeletePhysicalEventFineDetails'><p className="card-text detail">{fineAmountDetails.fineAmountDetails}</p></div>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleClose}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={togglePopup_Deletereason}>
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Continue</span>
                        </button>
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
          <Hp_DeletePhysicalEventReasonAndContinue showPopup_Deletereason={showPopup_Deletereason} handleClose_Deletereason={togglePopup_Deletereason} fineAmountData={fineAmountDetails}/>
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
        </div>
      );
    };
    
    export default Hp_DeletePhysicalEventFineDetails;