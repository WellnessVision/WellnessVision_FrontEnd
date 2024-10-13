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
import Hp_GetDateRangAppointmentUnavailableDates from './Hp_GetDateRangAppointmentUnavailableDates';

interface Hp_DeletePhysicalEventFineDetailsProps {
  show_5: boolean;
  handleClose_5: () => void;
  appointmentSchedule: any;
  setUnavailableDatePeriodState: any;
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

const Hp_UpdateTheAppointmentUnavailableDates: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_5, handleClose_5, appointmentSchedule, setUnavailableDatePeriodState}) => {
    const [fineAmountDetails, setFineAmountDetails] = useState<fineAmountData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));
    const [dateInput, setDateInput] = useState(false);
    const [showPopup_6, togglePopup_6] = useToggle();

const fetchFineData = async () => {
    try {
        const response = await axios.get<fineAmountData>(`http://localhost:15000/calculateRestPaymentTillLastPaymentDateToYesterdayForAppointmentSchedule`, {
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


const handleDateInput = () => {
        setDateInput(true);
        togglePopup_6();
      };

const handleCloseDelete = () => {
    setUnavailableDatePeriodState(false);
    handleClose_5();
  };
    


    return (
        <div className={`popup ${show_5 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`} style={{ zIndex: '3' }}>
          <div className="popup-inner popup-inner_HP_HallAvailability" style={{ width: '650px' }}>
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical events</h5>
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
                      <p className="card-text detail" style={{ color: 'red' }}>You have to pay this Remaining Payment before change the Appointment State And after change the state you can't change it until tomorrow</p>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDelete}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={handleDateInput}>
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Continue</span>
                        </button>
                      </div>
                      </div>) : <div>
                      <p className="card-text detail" style={{ color: 'red' }}>After change the state to unavailable, you can't change it until tomorrow</p>
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDelete}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button className="btn btn-danger HP_HallAvailability_hallBook" onClick={handleDateInput}>
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
          {dateInput && <Hp_GetDateRangAppointmentUnavailableDates show_6={showPopup_6} handleClose_6={togglePopup_6} appointmentSchedule={appointmentSchedule} setDateInput={setDateInput} fineAmountDetails={fineAmountDetails}/>}
        </div>
      );
    };
    
    export default Hp_UpdateTheAppointmentUnavailableDates;