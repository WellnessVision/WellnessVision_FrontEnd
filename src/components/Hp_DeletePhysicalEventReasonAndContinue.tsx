import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif'
import './Hp_DeletePhysicalEventReasonAndContinue.css'

interface Hp_DeletePhysicalEventReasonAndContinueProps {
    showPopup_Deletereason: boolean;
    handleClose_Deletereason: () => void;
    fineAmountData: any;
}

const Hp_DeletePhysicalEventReasonAndContinue: React.FC<Hp_DeletePhysicalEventReasonAndContinueProps> = ({ showPopup_Deletereason, handleClose_Deletereason, fineAmountData}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const eventId = String(localStorage.getItem('eventId'));
    const [deleteReason, setDeleteReason] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          handleClose_Deletereason();
          toggleLoadingPopup(true);
          await axios.put(`http://localhost:15000/deletePhysicalEventForHP`, null, {
            params: {
              eventId: eventId,
              fineAmount: fineAmountData.fineAmount,
              depositAmount: fineAmountData.depositAmount,
              deleteReason
            }
          });
          navigate('/HP_ViewEvents');
          toggleLoadingPopup(false);
        } 
        catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
      }
    };

return (
        <div className={`popup ${showPopup_Deletereason ? 'show popup_Hp_DeletePhysicalEventReasonAndContinue' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Confirmation of deletion of the physical event</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                { fineAmountData ? ( <div>
                <p>Fine Amount : Rs.{fineAmountData.fineAmount}/=</p>
                <p>Receipts Amount : Rs.{fineAmountData.depositAmount}/=</p> </div> )  : (<div></div>) }
                <form onSubmit={handleSubmit}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="accountNumber"><i className='bi bi-chat-square-text'></i> Reason for Deletion</label>
                        <textarea
                        className="form-control"
                        id="deleteReason"
                        name="deleteReason"
                        required
                        placeholder='What is the reason for deletion?'
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        />
                    </div>
          <div className='HP_HallAvailability_button_div'>
            <button
              type="button"
              className="btn btn-primary HP_HallAvailability_cancel_button"
              onClick={() => { handleClose_Deletereason(); setDeleteReason(''); }}>
              <i className="bi bi-arrow-left-circle"></i> Go Back
            </button>

            <button type="submit" className="btn btn-danger HP_HallAvailability_hallBook">
              <i className="bi bi-trash3"></i> 
                 <span className='HP_HallAvailability_hallBook_text'> Delete</span>
            </button>
          </div>
        </div>
      </form>
    </div>
            </div>
        </div>
        </div>
        <div className={`${showLoadingPopup ? 'showLoading_div_view_Hp_DeletePhysicalEventReasonAndContinue' : 'showLoading_div_hide_Hp_DeletePhysicalEventReasonAndContinue'}`}>
        <img className={`${showLoadingPopup ? 'showLoading showLoading_Hp_DeletePhysicalEventReasonAndContinue' : 'showLoading_2'}`} src={loading_gif}/></div>
    </div>
    );
};
    
    export default Hp_DeletePhysicalEventReasonAndContinue;