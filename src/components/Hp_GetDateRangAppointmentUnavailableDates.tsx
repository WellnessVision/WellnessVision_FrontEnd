import React, { useState, useEffect, FormEvent, useCallback, ChangeEvent } from 'react';
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
  show_6: boolean;
  handleClose_6: () => void;
  appointmentSchedule: any;
  setDateInput: any;
  fineAmountDetails: any;
}


const Hp_GetDateRangAppointmentUnavailableDates: React.FC<Hp_DeletePhysicalEventFineDetailsProps> = ({ show_6, handleClose_6, appointmentSchedule, setDateInput, fineAmountDetails}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [showPopup_Deletereason, togglePopup_Deletereason] = useToggle();
    const hpId = Number(localStorage.getItem('hpId'));
    const [unavailableType, setUnavailableType] = useState('');
    const [unavailableTimeStartDate, setUnavailableTimeStartDate] = useState('');
    const [unavailableTimeEndDate, setUnavailableTimeEndDate] = useState('');
    const [minUnavailableTimeStartDate, setMinUnavailableTimeStartDate] = useState('');
    const [minUnavailableTimeEndDate, setMinUnavailableTimeEndDate] = useState('');
    const [message, setMessage] = useState('');


const handleChangeStateSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        navigate('/HP_LodingPage');
        if(unavailableTimeEndDate != ''){
          await axios.put(`http://localhost:15000/setTheAppointmentScheduleAvailableTimePeriodForHp`, null, {
            params: {
                appointmentId: appointmentSchedule.appointmentId,
                hpId,
                remainingPayment: fineAmountDetails?.remainingPayment,
                remainingPaymentState: fineAmountDetails?.remainingPaymentState,
                newPaymentStartDate: fineAmountDetails?.newPaymentStartDate,
                startDate: fineAmountDetails?.startDate,
                endDate: fineAmountDetails?.endDate,
                unavailableTimeStartDate: unavailableTimeStartDate,
                unavailableTimeEndDate: unavailableTimeEndDate,
                unavailableType: unavailableType
            }
          });
        }else{
      await axios.put(`http://localhost:15000/setTheAppointmentScheduleAvailableTimeWithOnlyStartDateForHp`, null, {
        params: {
            appointmentId: appointmentSchedule.appointmentId,
            hpId,
            remainingPayment: fineAmountDetails?.remainingPayment,
            remainingPaymentState: fineAmountDetails?.remainingPaymentState,
            newPaymentStartDate: fineAmountDetails?.newPaymentStartDate,
            startDate: fineAmountDetails?.startDate,
            endDate: fineAmountDetails?.endDate,
            unavailableTimeStartDate: unavailableTimeStartDate,
            unavailableType: unavailableType
        }
      });}
      navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentSchedule.appointmentId}`);
    } 
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
  }
};

const handleCloseDelete = () => {
    setDateInput(false);
    handleClose_6();
  };

  useEffect(() => {
    const setMinValueOfUnavailableStartDate = () => {
      const today = new Date();
         if((appointmentSchedule.dailyState === 'Unavailable') || (appointmentSchedule.appointmentBookingCloseState === 'Yes')){
             today.setDate(today.getDate()+2)
         }else{
             today.setDate(today.getDate()+1) 
         }
         const formattedDate = today.toISOString().split('T')[0];
         setMinUnavailableTimeStartDate(formattedDate);
         setMinUnavailableTimeEndDate(formattedDate);
  };
  setMinValueOfUnavailableStartDate();
  }, [appointmentSchedule]); 
  
  const handleUnavailableType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnavailableType(e.target.value);
    setUnavailableTimeStartDate('');
    setUnavailableTimeEndDate('');
};

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const endDate = new Date(e.target.value); 
    if(unavailableTimeStartDate == ''){
        setUnavailableTimeEndDate(e.target.value);
        setMessage('');
    }else{
      const startDate = new Date(unavailableTimeStartDate); 
        if (endDate >= startDate) {
            setUnavailableTimeEndDate(e.target.value);
            setMessage('');
        } else {
            setUnavailableTimeEndDate('');
            setMessage('End date must be greater than or equal to start date');
        }
  }
};

const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const startDate = new Date(e.target.value); 
  if(unavailableTimeEndDate == ''){
      setUnavailableTimeStartDate(e.target.value);
      setMessage('');
  }else{
      const endDate = new Date(unavailableTimeEndDate); 
      if (startDate <= endDate) {
          setUnavailableTimeStartDate(e.target.value);
          setMessage('');
      } else {
          setUnavailableTimeStartDate('');
          setMessage('Start date must be less than or equal to end date');
      }
  }
};

  
return (
        <div className={`popup ${show_6 ? 'show popup_Hp_DeletePhysicalEventFineDetails' : ''} popup_HP_HallAvailability_popup`} style={{ zIndex: 3 }}>
          <div className="popup-inner popup-inner_HP_HallAvailability" style={{ width: '600px' }}>
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Receipt for deletion of physical events</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                <p className="card-text detail" style={{ color: 'red' }}>Once the unavailable time period is set, all appointment bookings within that period will be canceled, and no new appointment bookings can be made during that time period.
                </p>
                <form onSubmit={handleChangeStateSubmit}>
                <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Set Unavailable Type</label>
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={unavailableType}
                                required
                                onChange={(e) => handleUnavailableType(e as any)}
                            >
                                <option value="" disabled>Profession</option>
                                <option value="OnlyStartDate">Consistently Unavailable With Start Date</option>
                                <option value="StartDateAndEndDare">Unavailable For Time Period</option>
                        </select>
                    </div>
                    {unavailableType === 'OnlyStartDate' && (
                        <div className="form-group">
                             <label htmlFor="exampleFormControlFile1">Set Start Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="otherProfession" 
                                required
                                placeholder="Please specify your profession" 
                                value={unavailableTimeStartDate}
                                min={minUnavailableTimeStartDate}
                                onChange={(e) => setUnavailableTimeStartDate(e.target.value)}
                            />
                        </div>
                    )}
                    {unavailableType === 'StartDateAndEndDare' && (
                            <div className="name-group">
                        <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Set Start Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="otherProfession" 
                                required
                                placeholder="Please specify your profession" 
                                value={unavailableTimeStartDate}
                                min={minUnavailableTimeStartDate}
                                onChange={(e) => handleStartTimeChange(e as any)}
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Set End Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="otherProfession" 
                                required
                                placeholder="Please specify your profession" 
                                value={unavailableTimeEndDate}
                                min={minUnavailableTimeStartDate}
                                onChange={(e) => handleEndTimeChange(e as any)}
                            />
                        </div>
                        </div>
                    )}
                      {message && <p className="time_wrong_addEvent" style={{ width: '500px', marginLeft: '30px' }}>{message}</p>}
                      <div className='HP_HallAvailability_button_div'>
                        <button className="btn btn-primary HP_HallAvailability_cancel_button" onClick={handleCloseDelete}>
                          <i className="bi bi-arrow-left-circle"></i> Go Back
                        </button>
                        <button type="submit" className="btn btn-danger HP_HallAvailability_hallBook">
                          <i className="bi bi-check2-square"></i><span className='HP_HallAvailability_hallBook_text'> Continue</span>
                        </button>
                      </div>
                      </form>
                      </div>
                      </div>
                      </div>
                      </div>
          <img className={`${showLoadingPopup ? 'showLoading' : 'showLoading_2'}`} src={loading_gif}/>
        </div>
      );
    };
    
    export default Hp_GetDateRangAppointmentUnavailableDates;