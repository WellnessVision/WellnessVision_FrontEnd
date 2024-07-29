import React, { useState, useEffect, FormEvent,useCallback } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../../pages/HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif';
import '../../../components/ViewOneNotification.css'
import '../../../pages/HP/HP_ViewPhysicalEventPayment.css'
import '../../../components/HP_ViewOnePhysicalEventPayment.css'
import { parseISO, format } from 'date-fns';
import './NU_ViewOnePhysicalEventBookingPayment.css'

interface NU_ViewOnePhysicalEventBookingPaymentProps {
  show: boolean;
  handleClose: () => void;
  paymentId: any;
  BookingId: any;
}

interface physicalEventBookingPayment {
    paymentId: number;
    bookingId: number;
    paymentDate: string;
    amount: number;
    paymentState: string;
    paymentDescription: string;
}

interface ReceiptsData {
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
    eventState: string;
    bookingState: string;
    eventId: number;
}

const NU_ViewOnePhysicalEventBookingPayment: React.FC<NU_ViewOnePhysicalEventBookingPaymentProps> = ({ show, handleClose, paymentId, BookingId}) => {
    const [physicalEventBookingPaymentDetails, setPhysicalEventBookingPaymentDetails] = useState<physicalEventBookingPayment | null>(null);
    const [receiptsDataDetails, setReceiptsDataDetails] = useState<ReceiptsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();


    const fetchFineData = async () => {
        try {
          const response = await axios.get<physicalEventBookingPayment>(`http://localhost:15000/viewOneNormalUserPhysicalEventBookingPaymentForNU`, {
            params: { paymentId: paymentId}
          });
          setPhysicalEventBookingPaymentDetails(response.data);
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
}, [paymentId, setPhysicalEventBookingPaymentDetails, setError]);

const fetchReceiptsData = async () => {
    try {
      const response = await axios.get<ReceiptsData>(`http://localhost:15000/viewMoneyReceiptsDetailsForOneNormalUserPhysicalEventBookingPaymentForNU`, {
        params: { bookingId: BookingId}
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
}, [BookingId, setReceiptsDataDetails, setError]);

const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};
    

    return (
        <div className={`popup ${show ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className={`popup-inner popup-inner_HP_HallAvailability ${physicalEventBookingPaymentDetails?.paymentState === 'Receipts' ? 'NU_ViewOnePhysicalEventBookingPaymentPopUp' : 'NU_ViewOnePhysicalEventBookingPaymentPopUp_2'}`}>
            <div className="card HP_HallAvailability_fontSize">
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Payment Id : {physicalEventBookingPaymentDetails?.paymentId}</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {physicalEventBookingPaymentDetails ? (
                    <div>
                    <p className={`card-text detail
                                    ${physicalEventBookingPaymentDetails.paymentState === ('Payments' || 'payments' ) ? 'HP_ViewPhysicalEventPayment_payment' : 'HP_ViewPhysicalEventPayment_receipts'}`}>
                                        <span className='HP_ViewPhysicalEventPayment_PaymentState'>Payment State : </span>{physicalEventBookingPaymentDetails.paymentState}</p>
                    <p className="card-text detail">Booking Id : {physicalEventBookingPaymentDetails.bookingId}</p>
                    <p className="card-text detail">Event Id : {receiptsDataDetails?.eventId}</p>
                    <p className="card-text detail">Amount : Rs.{physicalEventBookingPaymentDetails.amount}/=</p>
                    <p className="card-text detail">Event Status : <span className={`${receiptsDataDetails?.eventState === 'Unavailable' ? 'HP_ViewOnePhysicalEventPayment_eventStatus_Unavailable' : 'HP_ViewOnePhysicalEventPayment_eventStatus_Available'}`}>{receiptsDataDetails?.eventState}</span></p>
                    <p className="card-text detail">Booking Status : <span className={`${receiptsDataDetails?.bookingState === 'Canceled' ? 'HP_ViewOnePhysicalEventPayment_eventStatus_Unavailable' : 'HP_ViewOnePhysicalEventPayment_eventStatus_Available'}`}>{receiptsDataDetails?.bookingState}</span></p>
                      <p className="card-text detail">Description : {physicalEventBookingPaymentDetails.paymentDescription}</p>
                      {physicalEventBookingPaymentDetails.paymentState === 'Receipts' ? ( <div>
                        <p className="card-text detail">Diosited Account Number : {receiptsDataDetails?.accountNumber}</p>
                        <p className="card-text detail">Account Owner Name : {receiptsDataDetails?.accountOwnerName}</p>
                        <p className="card-text detail">Account Branch : {receiptsDataDetails?.branchName}</p>
                        <p className="card-text detail">Account Bank : {receiptsDataDetails?.bankName}</p>
                        <p className="card-text detail">{formatRequestTime(physicalEventBookingPaymentDetails.paymentDate)}</p> 
                        </div>
                      ) : (
                        <div>
                              <p className="card-text detail">{formatRequestTime(physicalEventBookingPaymentDetails.paymentDate)}</p>
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
    
    export default NU_ViewOnePhysicalEventBookingPayment;