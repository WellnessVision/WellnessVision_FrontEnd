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
import '../pages/HP/HP_ViewPhysicalEventPayment.css'
import './HP_ViewOnePhysicalEventPayment.css'
import { parseISO, format } from 'date-fns';

interface HP_ViewOnePhysicalEventPaymentProps {
  show: boolean;
  handleClose: () => void;
  paymentId: any;
  EventId: any;
}

interface physicalEventPayment {
    payment_id: number;
    physical_event_id: number;
    payment_date: string;
    payment_time: string;
    amount: number;
    payment_state: string;
    payment_description: string;
    event_state: string;
}

interface ReceiptsData {
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
}

const HP_ViewOnePhysicalEventPayment: React.FC<HP_ViewOnePhysicalEventPaymentProps> = ({ show, handleClose, paymentId, EventId}) => {
    const [physicalEventPaymentDetails, setPhysicalEventPaymentDetails] = useState<physicalEventPayment | null>(null);
    const [receiptsDataDetails, setReceiptsDataDetails] = useState<ReceiptsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();


    const fetchFineData = async () => {
        try {
          const response = await axios.get<physicalEventPayment>(`http://localhost:15000/viewOneHealthProfessionalPhysicalEventPaymentForHP`, {
            params: { paymentId: paymentId}
          });
          setPhysicalEventPaymentDetails(response.data);
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
}, [paymentId, setPhysicalEventPaymentDetails, setError]);

const fetchReceiptsData = async () => {
    try {
      const response = await axios.get<ReceiptsData>(`http://localhost:15000/viewOneDeleteHealthProfessionalPhysicalEventForHP`, {
        params: { eventId: EventId}
      });
      setReceiptsDataDetails(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

useEffect(() => {
    fetchReceiptsData();
}, [EventId, setReceiptsDataDetails, setError]);

const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};
    

    return (
        <div className={`popup ${show ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize">
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Payment Id : {physicalEventPaymentDetails?.payment_id}</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {physicalEventPaymentDetails ? (
                    <div>
                    <p className={`card-text detail
                                    ${physicalEventPaymentDetails.payment_state === ('Payments' || 'payments' ) ? 'HP_ViewPhysicalEventPayment_payment' : 'HP_ViewPhysicalEventPayment_receipts'}`}>
                                        <span className='HP_ViewPhysicalEventPayment_PaymentState'>Payment State : </span>{physicalEventPaymentDetails.payment_state}</p>
                    <p className="card-text detail">Event Id : {physicalEventPaymentDetails.physical_event_id}</p>
                    <p className="card-text detail">Amoumt : Rs.{physicalEventPaymentDetails.amount}/=</p>
                    <p className="card-text detail">Event Status : <span className={`${physicalEventPaymentDetails.event_state === 'Unavailable' ? 'HP_ViewOnePhysicalEventPayment_eventStatus_Unavailable' : 'HP_ViewOnePhysicalEventPayment_eventStatus_Available'}`}>{physicalEventPaymentDetails.event_state}</span></p>
                      <p className="card-text detail">Description : {physicalEventPaymentDetails.payment_description}</p>
                      {physicalEventPaymentDetails.payment_state === 'Receipts' ? ( <div>
                        <p className="card-text detail">Diosited Account Number : {receiptsDataDetails?.accountNumber}</p>
                        <p className="card-text detail">Account Owner Name : {receiptsDataDetails?.accountOwnerName}</p>
                        <p className="card-text detail">Account Branch : {receiptsDataDetails?.branchName}</p>
                        <p className="card-text detail">Account Bank : {receiptsDataDetails?.bankName}</p>
                        <p className="card-text detail">{formatRequestTime(physicalEventPaymentDetails.payment_time)}</p> 
                        </div>
                      ) : (
                        <div>
                              <p className="card-text detail">{formatRequestTime(physicalEventPaymentDetails.payment_time)}</p>
                        </div>
                      )}
                      <div className='HP_HallAvailability_button_div HP_ViewOnePhysicalEventPayment_backButton'>
                        <button className="btn btn-primary " onClick={handleClose}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
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
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
        </div>
      );
    };
    
    export default HP_ViewOnePhysicalEventPayment;