import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import '../../../pages/HP/HP_AddPhysicalEvent.css';
import '../../../components/HP_HallAvailability.css';
import '../../../pages/HP/HP_OneEvent.css';
import '../../../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../../pages/HP/useToggle';
import loading_gif from '../../../resources/prosecing.gif'

interface Nu_ViewModifyMoneyReceiptsDetailsProps {
  show_4: boolean;
  handleClose_4: () => void;
  toggleEditAttachmentPopup: any;
  workCollectionId: any;
}

const Volunteer_EditAttachmentInWorkCollection: React.FC<Nu_ViewModifyMoneyReceiptsDetailsProps> = ({ show_4, handleClose_4, toggleEditAttachmentPopup, workCollectionId }) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const VolunteerEmail = localStorage.getItem('volunteerEmail');

    const resetMoneyReceiptsDetails = () => {
        handleClose_4()
        setAttachment(null);
        setIsButtonDisabled(true);
        toggleEditAttachmentPopup(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachment(e.target.files[0]);
        }
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(attachment != null){
        try {
            navigate('/HP_LodingPage');
            const formData = new FormData();
            formData.append('workCollectionId', String(workCollectionId));
            formData.append('attachment', attachment);
            formData.append('userEmail', String(VolunteerEmail));
          await axios.post('http://localhost:15000/editAttachmentInWorkCollectionForVolunteer', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          navigate('/Volunteer_MyCollection');
        } 
        catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
      }
    }
    };

return (
        <div className={`popup ${show_4 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Edit attachment of work</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                <form onSubmit={handleSubmit}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="previousWorksPdf"><i className='bi bi-shop'></i> Attachment</label>
                        <input
                        type="file"
                        className="form-control"
                        id="attachment"
                        name="attachment"
                        required
                        onChange={handleFileChange}
                        />
                    </div>
          <div className='HP_HallAvailability_button_div'>
            <button
              type="button"
              className="btn btn-primary HP_HallAvailability_cancel_button"
              onClick={resetMoneyReceiptsDetails}>
              <i className="bi bi-arrow-left-circle"></i> Cancel
            </button>

            <button type="submit" className="btn btn-warning HP_HallAvailability_hallBook">
              <i className="bi bi-floppy-fill"></i> 
                 <span className='HP_HallAvailability_hallBook_text'> Save</span>
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

export default Volunteer_EditAttachmentInWorkCollection;