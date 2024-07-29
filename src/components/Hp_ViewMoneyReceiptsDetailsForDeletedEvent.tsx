import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import './HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif'
import './Hp_ViewMoneyReceiptsDetailsForDeletedEvent.css'

interface Hp_ViewModifyMoneyReceiptsDetailsProps {
  show_2: boolean;
  handleClose_2: () => void;
  MoneyReceiptsDetails: any;
}

const Hp_ViewMoneyReceiptsDetailsForDeletedEvent: React.FC<Hp_ViewModifyMoneyReceiptsDetailsProps> = ({ show_2, handleClose_2, MoneyReceiptsDetails}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [accountNumber, setAccountNumber] = useState(MoneyReceiptsDetails.accountNumber);
    const [accountOwnerName, setAccountOwnerName] = useState(MoneyReceiptsDetails.accountOwnerName);
    const [branchName, setBranchName] = useState(MoneyReceiptsDetails.branchName);
    const [bankName, setBankName] = useState(MoneyReceiptsDetails.bankName);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

return (
        <div className={`popup ${show_2 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Money Receipts Details</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                <form>
                    <div>
                    <div className="form-group">
                        <label htmlFor="accountNumber"><i className='bi bi-safe2'></i> Account Number</label>
                        <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        name="accountNumber"
                        readOnly
                        value={accountNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountOwnerName"><i className="bi bi-person-check"></i> Account Owner Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="accountOwnerName"
                        name="accountOwnerName"
                        readOnly
                        value={accountOwnerName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branchName"><i className='bi bi-shop'></i> Branch Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="branchName"
                        name="branchName"
                        readOnly
                        value={branchName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bankName"><i className='bi bi-bank2'></i> Bank Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="bankName"
                        name="bankName"
                        readOnly
                        value={bankName}
                        />
                    </div>
          <div className='HP_HallAvailability_button_div'>
            <button
              type="button"
              className="btn btn-primary Hp_ViewMoneyReceiptsDetailsForDeletedEvent_cancelButton"
              onClick={handleClose_2}>
              <i className="bi bi-arrow-left-circle"></i> Cancel
            </button>
          </div>
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

export default Hp_ViewMoneyReceiptsDetailsForDeletedEvent;