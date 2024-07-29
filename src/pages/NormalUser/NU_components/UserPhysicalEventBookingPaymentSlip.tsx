import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif';

interface UserPhysicalEventBookingPaymentSlipProps {
  show: boolean;
  handleClose: () => void;
  PhysicalEvent : any;
}

const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

const UserPhysicalEventBookingPaymentSlip: React.FC<UserPhysicalEventBookingPaymentSlipProps> = ({ show, handleClose, PhysicalEvent}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const [accountNumber, setAccountNumber] = useState('');
    const [accountOwnerName, setAccountOwnerName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [bankName, setBankName] = useState('');
    const userId = localStorage.getItem('userId');


    const makePhysicalEventBooking = useCallback(async (eventId: number, ticketPrice: number) => {
        try{
            navigate('/HP_LodingPage');
            await axios.put(`http://localhost:15000/userPhysicalEventBooking`, null, {
            params: { eventId, userId, ticketPrice, accountNumber, accountOwnerName, branchName, bankName}
          });
          handleClose();
          navigate('/NU_ViewBookedUpcomingphysicalEvents');
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
    }, [navigate, handleClose, setError, userId, accountNumber, accountOwnerName, branchName, bankName ]);

const handleUserPhysicalEventTemporaryBookingCancel = useCallback(async (eventId: number, hpId: number) => {
    try {
        await axios.put(`http://localhost:15000/userPhysicalEventTemporaryBookingCancel`, null, {
        params: { eventId }
      });
        handleClose();
        navigate(`/NU_ViewOneUpcomingPhysicalEvent/${eventId}/${hpId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [navigate, handleClose, setError]);
    


    return (
        <div className={`popup ${show ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Physical EventBooking Payment Slip</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {PhysicalEvent ? (
                    <div>
                      <p className="card-text detail"><i className="bi bi-calendar3"></i> {PhysicalEvent.date} (Event Date)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> {formatTime(PhysicalEvent.startTime)} (Start Time)</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i>  {PhysicalEvent.finalDuration} hour duration</p>
                      <p className="card-text detail"><i className='bi bi-cash-stack'></i> Rs.{PhysicalEvent.ticketPrice}/= (Ticket Price)</p>
                      <div className='HP_HallAvailability_button_div'>
                      <p className="card-text detail">Cash Receipts Details (When delete ticket or event)</p>
                      <form onSubmit={() => makePhysicalEventBooking(PhysicalEvent.event_id, PhysicalEvent.ticketPrice)}>
                    <div>
                    <div className="name-group">
                    <div className="form-group">
                        <label htmlFor="accountNumber"><i className='bi bi-safe2'></i> Account Number</label>
                        <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        name="accountNumber"
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountOwnerName"><i className="bi bi-person-check"></i> Account Owner Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="accountOwnerName"
                        name="accountOwnerName"
                        required
                        value={accountOwnerName}
                        onChange={(e) =>setAccountOwnerName(e.target.value)}
                        />
                    </div> </div>
                    <div className="name-group">
                    <div className="form-group">
                        <label htmlFor="branchName"><i className='bi bi-shop'></i> Branch Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="branchName"
                        name="branchName"
                        required
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bankName"><i className='bi bi-bank2'></i> Bank Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="bankName"
                        name="bankName"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value) }
                        />
                    </div> </div>
                    <div className='HP_HallAvailability_button_div'>
                    <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={() => handleUserPhysicalEventTemporaryBookingCancel(PhysicalEvent.event_id, PhysicalEvent.hp_id)}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                    <button type="submit" className="btn btn-danger HP_HallAvailability_hallBook">
                    <i className="bi bi-cart-check"></i> 
                    <span className='HP_HallAvailability_hallBook_text'> Book a Ticket</span>
                    </button>
                        </div>
                        </div>
                    </form>
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
    
    export default UserPhysicalEventBookingPaymentSlip;