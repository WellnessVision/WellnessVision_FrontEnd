import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Volunteer_Sidebar from './Volunteer_components/Volunteer_Sidebar';
import '../HP/HP_ViewEvents.css';
import pdfIcon from '../../resources/pdfIcon.jpg';
import AddEvent from '../HP/HP_AddPhysicalEvent';
import { useToggle } from '../HP/useToggle';
import { parseISO, format } from 'date-fns';
import Volunteer_AddNewWorkToCollection from './Volunteer_components/Volunteer_AddNewWorkToCollection';
import './Volunteer_MyCollection.css'
import Volunteer_EditTextInWorkCollection from './Volunteer_components/Volunteer_EditTextInWorkCollection';
import Volunteer_EditAttachmentInWorkCollection from './Volunteer_components/Volunteer_EditAttachmentInWorkCollection';

interface oneCollection {
   workCollectionId: number;
   volunteerId: number;
   attachment: string;
   subject: string;
   description: string;
   modifiedTime: string;
}

const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};


const Volunteer_MyCollection: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const [showPopup_4, togglePopup_4] = useToggle();
  const [showEditTextPopup, toggleEditTextPopup] = useState(false);
  const [showEditAttachmentPopup, toggleEditAttachmentPopup] = useState(false);
  const [workCollectionId, setWorkCollectionId] = useState<Number>(0);
  const [previousDescription, setPreviousDescription] = useState('');
  const [previousSubject, setPreviousSubject] = useState('');
  const [oneCollectionDetails, setOneCollectionDetails] = useState<oneCollection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const volunteerId = localStorage.getItem("volunteerId");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get<oneCollection[]>(`http://localhost:15000/getOneVolunteerWorkCollectionForVolunteer`, {
        params: { volunteerId }
      });
      setOneCollectionDetails(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const callEditTextPopup = (workCollectionId:Number, oldSubject:string, oldDecoration: string) => {
     setWorkCollectionId(workCollectionId);
     setPreviousSubject(oldSubject);
     setPreviousDescription(oldDecoration);
     toggleEditTextPopup(true);
     togglePopup_3();
  };

  const callEditAttachmentPopup = (workCollectionId:Number) => {
    setWorkCollectionId(workCollectionId);
    toggleEditAttachmentPopup(true);
    togglePopup_4();
 };

 const deleteWorkCollection =  useCallback(async (deletedWorkCollectionId: number) => {
      try {
        navigate('/HP_LodingPage');
        await axios.put(`http://localhost:15000/deleteWorkInWorkCollectionForVolunteer`, null, {
          params: { deletedWorkCollectionId }
        });
        navigate('/Volunteer_MyCollection');
      } catch (error) {
        alert("Error registering event");
      }
}, []);


 return (
    <div>
    <Volunteer_Sidebar activeMenuItem={["MyCollection"]}/>
      <div className={`blurBackground ${showPopup ? 'blur' : ''}`}>
        <div className="header" style={{marginTop: '-85px'}}>
        <h3>My Collection</h3>
        <p style={{marginTop: '10px', fontSize: '18px'}}>When you requesting or volunteering a physical event, the health professional can view this page. 
            You can use this page to show your skils !</p>
        <a onClick={togglePopup_2} className="btn btn-success" style={{marginTop: '-180px', marginLeft: '1120px'}}>
          <i className="bi bi-plus-lg"></i> New Work
        </a>
        </div>
        <div className="cardHang" style={{marginTop: '170px'}}>
          {oneCollectionDetails.length > 0 ? (
            oneCollectionDetails.map(oneCollectionDetail => (
                <a className="Volunteer_MyCollection_main_A_tag" style={{textDecoration: 'none'}}><div className="card" style={{ width: '18rem' }} key={oneCollectionDetail.workCollectionId}>
                <div className={'btn-group'}>
                  <button type="button" className={'btn btn-warning dropdown-toggle Volunteer_MyCollection_dropDownButtonSet'} style={{width: '35px', height: '25px', position: 'absolute', padding: '1px 5px 5px 5px', marginLeft: '251px', borderRadius: ' 0 5px 0 5px', zIndex: '1'}} data-bs-toggle="dropdown" aria-expanded="false"></button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item" onClick={() => callEditTextPopup(oneCollectionDetail.workCollectionId, oneCollectionDetail.subject, oneCollectionDetail.description)}>Edit Text</li>
                    <li className="dropdown-item" onClick={() => callEditAttachmentPopup(oneCollectionDetail.workCollectionId)}>Edit Attachment </li>
                    <li className="dropdown-item" onClick={() => deleteWorkCollection(oneCollectionDetail.workCollectionId)}>Delete </li>
                  </ul>
                </div>
                <a href={oneCollectionDetail.attachment} className='Volunteer_MyCollection_image_A_tag'>
                <img src={oneCollectionDetail.attachment.split('.').map(item => item.trim()).pop() === "pdf" ? pdfIcon : oneCollectionDetail.attachment} className="card-img-top" alt="Event image" /></a>
                <div className="card-body">
                  <h5 className="card-title title">{oneCollectionDetail.subject}</h5>
                  <div className="straight-line"></div>
                  <p className="card-text detail">
                  <i className="bi bi-text-paragraph"></i> {oneCollectionDetail.description}
                  </p>
                  <p className="card-text detail">
                    <i className="bi bi-alarm-fill"></i> {formatRequestTime(oneCollectionDetail.modifiedTime)}
                  </p>
                  {/* <a onClick={() => handleViewDetails(oneCollectionDetail.event_id, oneCollectionDetail.hp_id)} className="btn btn-primary">
                    <i className="bi bi-eye"></i> View Details
                  </a> */}
                </div>
              </div></a>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
      <Volunteer_AddNewWorkToCollection show_2={showPopup_2} handleClose_2={togglePopup_2}/>
      {showEditTextPopup && <Volunteer_EditTextInWorkCollection show_3={showPopup_3} handleClose_3={togglePopup_3} toggleEditTextPopup={toggleEditTextPopup} workCollectionId={workCollectionId} previousSubject={previousSubject} previousDescription={previousDescription}/>}
      {showEditAttachmentPopup && <Volunteer_EditAttachmentInWorkCollection show_4={showPopup_4} handleClose_4={togglePopup_4} toggleEditAttachmentPopup={toggleEditAttachmentPopup} workCollectionId={workCollectionId}/>}
    </div>
  );
};

export default Volunteer_MyCollection;
