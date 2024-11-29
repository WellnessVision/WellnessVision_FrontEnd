import React, { useState, useEffect, FormEvent, useCallback } from 'react';
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
  show_7: boolean;
  handleClose_7: () => void;
  appointmentSchedule: any;
  setDeleteAppointmentScheduleState: any;
}

interface fineAmountData {
    remainingPayment: number;
    remainingPaymentState: string;
    newPaymentStartDate: string;
    income: number;
    totalRoomCharge: number;
    remainingAdvance: number;
    startDate: string;
    endDate: string;
  }

const Hp_DeleteTheAppointmentSchedule: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_7, handleClose_7, appointmentSchedule, setDeleteAppointmentScheduleState}) => {
    const [fineAmountDetails, setFineAmountDetails] = useState<fineAmountData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));


    const fetchFineData = async () => {
        try {
          const response = await axios.get<fineAmountData>(`http://localhost:15000/calculateRestPaymentWhenDeleteAppointmentScheduleForHp`, {
            params: { appointmentId: appointmentSchedule.appointmentId }
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

const handleChangeStateSubmit =  useCallback(async () => {
    try {
        navigate('/HP_LodingPage');
      await axios.put(`http://localhost:15000/deleteTheAppointmentScheduleForHp`, null, {
        params: {
            appointmentId: appointmentSchedule.appointmentId,
            hpId,
            remainingPayment: fineAmountDetails?.remainingPayment,
            remainingPaymentState: fineAmountDetails?.remainingPaymentState,
            remainingAdvancePayment: fineAmountDetails?.remainingAdvance,
            newPaymentStartDate: fineAmountDetails?.newPaymentStartDate,
            startDate: fineAmountDetails?.startDate,
            endDate: fineAmountDetails?.endDate
        }
      });
        navigate('/HP_ViewAllAppointmentSchedule');
    } 
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
  }
}, [appointmentSchedule, fineAmountDetails]);

const handleCloseDelete = () => {
    setDeleteAppointmentScheduleState(false);
    handleClose_7();
  };
    


    return (
        <div className={`popup ${show_7 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability" style={{ width: '650px' }}>
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of appointment schedule</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                  {fineAmountDetails ? (
                    <div>
                    {fineAmountDetails.remainingPaymentState === "NeedPayment" ? (<div> 
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> {fineAmountDetails.startDate} to {fineAmountDetails.endDate} (Date Period)</p>
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.totalRoomCharge}/= (Total Room Charge)</p>
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.income}/= (Total Appointment Booking Income)</p>
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.remainingAdvance}/= (Remaining Advance)</p>
                      <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.({fineAmountDetails.income} + {fineAmountDetails.remainingAdvance} - {fineAmountDetails.totalRoomCharge})/= : <span style={{ color: 'red' }}>Rs. - {fineAmountDetails.remainingPayment}/= (Remaining Payment)</span></p>
                      <p className="card-text detail" style={{ color: 'red' }}>You have to pay the Remaining Payment before deleting</p>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDelete}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={handleChangeStateSubmit} style={{ width: '200px' }}>
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Pay & Continue</span>
                        </button>
                      </div>
                      </div>) : <div>
                         {fineAmountDetails.remainingPaymentState === "OkWithAdvance" && fineAmountDetails.remainingPayment != 0 ? 
                         <div>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> {fineAmountDetails.startDate} to {fineAmountDetails.endDate} (Date Period)</p>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.totalRoomCharge}/= (Total Room Charge)</p>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.income}/= (Total Appointment Booking Income)</p>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.remainingAdvance}/= (Remaining Advance)</p>
                           <p className="card-text detail" style={{ color: 'green' }}><i className='bi bi-calendar2-heart'></i> Rs.({fineAmountDetails.income} + {fineAmountDetails.remainingAdvance} - {fineAmountDetails.totalRoomCharge})/= : Rs.{fineAmountDetails.remainingPayment}/= (Total Amount)</p>
                           <p className="card-text detail" style={{ color: 'red' }}>After deleting, The total amount will be deposited to your bank account</p>
                           </div> : <div>
                             {fineAmountDetails.remainingPaymentState === "Ok" && (fineAmountDetails.remainingPayment != 0 || fineAmountDetails.remainingAdvance != 0 ) ? <div>
                              <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> {fineAmountDetails.startDate} to {fineAmountDetails.endDate} (Date Period)</p>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.totalRoomCharge}/= (Total Room Charge)</p>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.income}/= (Total Appointment Booking Income)</p>
                                 <p className="card-text detail"><i className='bi bi-calendar2-heart'></i> Rs.{fineAmountDetails.remainingAdvance}/= (Remaining Advance)</p>
                              <p className="card-text detail" style={{ color: 'green' }}><i className='bi bi-calendar2-heart'></i> Rs.({fineAmountDetails.income} + {fineAmountDetails.remainingAdvance} - {fineAmountDetails.totalRoomCharge})/= : Rs.{fineAmountDetails.remainingAdvance + fineAmountDetails.remainingPayment}/= (Total Amount)</p>
                              <p className="card-text detail" style={{ color: 'red' }}>After deleting, The total amount will be deposited to your bank account</p></div> : <div></div>} </div> }
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDelete}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={handleChangeStateSubmit}>
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Continue</span>
                        </button>
                      </div></div>}
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
    
    export default Hp_DeleteTheAppointmentSchedule;