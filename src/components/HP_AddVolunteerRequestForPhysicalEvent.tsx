import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import '../pages/HP/HP_AddPhysicalEvent.css';
import '../components/HP_HallAvailability.css';
import '../pages/HP/HP_OneEvent.css';
import '../components/Hp_DeletePhysicalEventFineDetails.css'
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../pages/HP/useToggle';
import loading_gif from '../resources/prosecing.gif'

interface Nu_ViewModifyMoneyReceiptsDetailsProps {
  show_5: boolean;
  handleClose_5: () => void;
  eventId: any;
}

const HP_AddVolunteerRequestForPhysicalEvent: React.FC<Nu_ViewModifyMoneyReceiptsDetailsProps> = ({ show_5, handleClose_5, eventId}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [volunteerType, setVolunteerType] = useState('');
    const [volunteerDescription, setVolunteerDescription] = useState('');
    const [previousWorksPdf, setPreviousWorksPdf] = useState<File | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const resetMoneyReceiptsDetails = () => {
        handleClose_5()
        setVolunteerType('');
        setVolunteerDescription('');
        setPreviousWorksPdf(null);
        setIsButtonDisabled(true);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPreviousWorksPdf(e.target.files[0]);
        }
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            try {
                navigate('/HP_LodingPage');
                toggleLoadingPopup(true);
                await axios.put(`http://localhost:15000/addNewVolunteerNeedRequestForHP`, null, {
                  params: { eventId, volunteerType, volunteerDescription }
                });
                navigate(`/HP_OneEvents/${eventId}`);
              } catch (error) {
                alert("Error registering event");
              }
    };

return (
        <div className={`popup ${show_5 ? 'show' : ''} popup_HP_HallAvailability_popup`}>
          <div className="popup-inner popup-inner_HP_HallAvailability">
            <div className="card HP_HallAvailability_fontSize" style={{ width: '100%' }}>
              <div className="card-body fine_details_card__Hp_DeletePhysicalEventFineDetails">
                <h5 className="card-title title_HP_HallAvailability">Request For volunteering</h5>
                <div className="straight-line"></div>
                <div className='HP_HallAvailability_div'>
                <form onSubmit={handleSubmit}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="volunteerType"><i className="bi bi-person-check"></i> Volunteer Types</label>
                        <input
                        type='text'
                        className="form-control"
                        id="volunteerType"
                        name="volunteerType"
                        placeholder="Comma separated (Designer, Event Planner, ...)"
                        required
                        value={volunteerType}
                        onChange={(e) => setVolunteerType(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="volunteerDescription"><i className="bi bi-person-check"></i> Volunteer Description</label>
                        <textarea
                        className="form-control"
                        id="volunteerDescription"
                        name="volunteerDescription"
                        placeholder="Volunteer Description..."
                        required
                        value={volunteerDescription}
                        onChange={(e) => setVolunteerDescription(e.target.value)}
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

export default HP_AddVolunteerRequestForPhysicalEvent;