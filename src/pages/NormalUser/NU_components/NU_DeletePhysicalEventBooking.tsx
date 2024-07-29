import React, { useState, useEffect, FormEvent , useCallback} from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../../pages/HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif';
import './NU_DeletePhysicalEventBooking.css';

interface NU_DeletePhysicalEventBookingProps {
  show_3: boolean;
  handleClose_3: () => void;
  MoneyReceiptsDetails: any;
  eventId: any;
  setDeleteStateFun: any;
}

interface fineAmountData {
    today: string;
    eventDate: string;
    twoDaysBeforeDate: string;
    ticketPrice: number;
    fineAmount: number;
    depositAmount: number;
    finePercentage: number;
    fineAmountDetails: string; 
    twoDaysBeforeState: string;
  }

const NU_DeletePhysicalEventBooking: React.FC<NU_DeletePhysicalEventBookingProps> = ({ show_3, handleClose_3, MoneyReceiptsDetails, eventId, setDeleteStateFun}) => {
    const [fineAmountDetails, setFineAmountDetails] = useState<fineAmountData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const userId = localStorage.getItem('userId');
    const [bookingId, setBookingId] = useState(MoneyReceiptsDetails?.bookingId);
    const [twoDaysBeforeState, setTwoDaysBeforeState] = useState(MoneyReceiptsDetails.twoDaysBeforeState);
  

    const fetchFineData = async () => {
      setFineAmountDetails(null);
        try {
          const response = await axios.get<fineAmountData>(`http://localhost:15000/getFineAmountForNU`, {
            params: { eventId: eventId, bookingId: bookingId }
          });
          setFineAmountDetails(response.data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
          navigate(`/HP_LodingPage`);
          setTimeout(() => {
          navigate('/NU_ViewBookedUpcomingphysicalEvents');
          alert("Sorry, The event was deleted already");
        }, 100);
        }
      };

useEffect(() => {
fetchFineData();
}, []);

const handleCloseDeleteEventBooking = () => {
  setDeleteStateFun(false);
  handleClose_3();
};

const eventBookingDeletion = useCallback(async (fineAmount: number, depositAmount: number, twoDaysBeforeState: string) => {
    try {
      toggleLoadingPopup(true);
      await axios.put(`http://localhost:15000/deletePhysicalEventBookingForNU`, null, {
        params: {
            eventId,
            userId,
            bookingId,
            fineAmount,
            depositAmount,
            twoDaysBeforeState
        }
      });
      navigate('/NU_ViewBookedUpcomingphysicalEvents');
      toggleLoadingPopup(false);
    } 
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
  }
  }, [eventId, userId, bookingId, navigate, setError]);
    


    return (
        <div className={`popup ${show_3 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical event Booking</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {fineAmountDetails ? (
                    <div>
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> {fineAmountDetails.today} (Today)</p>
                      <p className="card-text detail"><i className="bi bi-calendar3"></i> {fineAmountDetails.eventDate} (Event Date)</p>
                      <p className="card-text detail"><i className='bi bi-calendar-week'></i> {fineAmountDetails.twoDaysBeforeDate} (Two Days Before Date From Event)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> Rs.{fineAmountDetails.ticketPrice}/= (Ticket Price)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> {fineAmountDetails.finePercentage}% (Fine Percentage)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i>  Rs.{fineAmountDetails.ticketPrice} * {fineAmountDetails.finePercentage}% = Rs.{fineAmountDetails.fineAmount}/= (fine Amount)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> Rs.{fineAmountDetails.ticketPrice} - Rs.{fineAmountDetails.fineAmount} = Rs.{fineAmountDetails.depositAmount}/= (Deposit Amount)</p>
                      <div className='fine_details_Hp_DeletePhysicalEventFineDetails'><p className="card-text detail">{fineAmountDetails.fineAmountDetails}</p></div>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDeleteEventBooking}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={() => eventBookingDeletion(fineAmountDetails.fineAmount, fineAmountDetails.depositAmount, fineAmountDetails.twoDaysBeforeState)}>
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Continue</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                        <p className="card-text detail">Sorry, You are already participated to the event Or, </p>
                        <p className="card-text detail">Event booking closed, please "Refresh" your browser</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <img className={`${showLoadingPopup ? 'showLoading NU_DeletePhysicalEventBooking_showLoadingPopup' : 'showLoading_2'}`} src={loading_gif}/>
        </div>
      );
    };
    
    export default NU_DeletePhysicalEventBooking;