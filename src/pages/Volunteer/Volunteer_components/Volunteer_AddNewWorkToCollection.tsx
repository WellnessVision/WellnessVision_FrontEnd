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
  show_2: boolean;
  handleClose_2: () => void;
}

const Volunteer_AddNewWorkToCollection: React.FC<Nu_ViewModifyMoneyReceiptsDetailsProps> = ({ show_2, handleClose_2 }) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const volunteerId = localStorage.getItem('volunteerId');
    const VolunteerEmail = localStorage.getItem('volunteerEmail');

    const resetMoneyReceiptsDetails = () => {
        handleClose_2()
        setDescription('');
        setSubject('');
        setAttachment(null);
        setIsButtonDisabled(true);
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
            formData.append('volunteerId', String(volunteerId));
            formData.append('subject', subject);
            formData.append('description', description);
            formData.append('attachment', attachment);
            formData.append('userEmail', String(VolunteerEmail));
          await axios.post('http://localhost:15000/addNewWorkToWorkCollectionForVolunteer', formData, {
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
        <div className={`popup ${show_2 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Request For volunteering</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                <form onSubmit={handleSubmit}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="requestPosition"><i className='bi bi-safe2'></i> Subject</label>
                        <input
                        type='text'
                        className="form-control"
                        id="Subject"
                        name="Subject"
                        placeholder="Subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="experiences"><i className="bi bi-person-check"></i> Description</label>
                        <textarea
                        className="form-control"
                        id="experiences"
                        name="experiences"
                        placeholder="Share your experiences..."
                        required
                        value={description}
                        maxLength={200}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
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
                 <span className='HP_HallAvailability_hallBook_text'> Submit</span>
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

export default Volunteer_AddNewWorkToCollection;