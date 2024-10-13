import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HPSideBar from '../../components/HP_SideBar';
import '../HP/HP_ViewEvents.css';
import pdfIcon from '../../resources/pdfIcon.jpg';
import AddEvent from '../HP/HP_AddPhysicalEvent';
import { useToggle } from '../HP/useToggle';
import { parseISO, format } from 'date-fns';
import { useParams } from 'react-router-dom';

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


const HP_ViewVolunteerPreviousWorks: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [oneCollectionDetails, setOneCollectionDetails] = useState<oneCollection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { volunteerId } = useParams<{ volunteerId: string }>();
  const { eventId } = useParams<{ eventId: string }>();
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

  const handleBackBotten = () => {
    navigate(`/HP_ViewVolunteerRequestForPhysicalEvents/${eventId}`);
  };


 return (
    <div>
     <HPSideBar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
      <div className={`blurBackground ${showPopup ? 'blur' : ''}`}>
        <div className="header" style={{marginTop: '-85px'}}>
        <h3>Volunteer previous works</h3>
        <p style={{marginTop: '10px', fontSize: '18px'}}>These are the previous works of the volunteer and those are added by themself.
        </p>
        <a onClick={handleBackBotten} className="btn btn-primary back_button" style={{marginTop: '-150px', marginLeft: '1090px', width: '150px'}}>
        <i className="bi bi-arrow-left-circle"></i> Go Back
        </a>
        </div>
        <div className="cardHang" style={{marginTop: '170px'}}>
          {oneCollectionDetails.length > 0 ? (
            oneCollectionDetails.map(oneCollectionDetail => (
                <a className="Volunteer_MyCollection_main_A_tag" style={{textDecoration: 'none'}}><div className="card" style={{ width: '18rem' }} key={oneCollectionDetail.workCollectionId}>
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
                </div>
              </div></a>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HP_ViewVolunteerPreviousWorks;
