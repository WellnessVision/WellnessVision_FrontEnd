import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NU_Sidebar from './NU_Sidebar'
import '../../HP/HP_ViewEvents.css';
import yoga01 from '../../../resources/yoga01.png';
import './NU_ViewEvents.css';

interface PhysicalEvent {
  event_id: number;
  hall_id: string;
  eventTitle: string;
  finalEventType: string;
  date: string;
  startTime: number;
  endTime: number;
  finalDuration: number;
  capacity: number;
  ticketPrice: number;
  eventImage: string;
  hall_capacity: number;
  total_hall_charge: number;
  advance_percentage: number;
  advance_payment: number;
  payment_id: number;
  language: string;
  event_description: string;
}

const formatTime = (hour: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};

interface NU_PhysicalEventCategoryProps {
    category : string;
  }


const NU_ViewPhysicalEvents: React.FC<NU_PhysicalEventCategoryProps> = ({category}) => {
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [oneEventDetails, setOneEventDetails] = useState<PhysicalEvent[] | null>([]);


  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      if(category === "All"){
        const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getPhysicalEvents`);
        setEvents(response.data);
      }
      if(category === "Booked"){
        const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getBookedPhysicalEventsByUserId`, {
            params: { userId: localStorage.getItem('nuId') }
        });
        setEvents(response.data);
      }

      
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

  const handleViewDetails = (eventId: number) => {
    setOneEventDetails(events.filter((event) => {
        if(event.event_id === eventId){
            return event;
        }
    }));
  };

  console.log(oneEventDetails);

  return (
    <div>
       <NU_Sidebar activeMenuItem={["PhysicalEvents"]} />
       {/* <NU_Sidebar activeMenuItem="PhysicalEvents" /> */}

      <div className={`blurBackground ${ oneEventDetails?.length ? 'blur' : ''}`} id='physicalEventBackground_NU'>
        <h3 className="header">Physical Events</h3>
        
        <div className="cardHang">
          {events.length > 0 ? (
            events.map(event => (
              <div className="card" style={{ width: '18rem' }} key={event.event_id}>
                <img src={event.eventImage || yoga01} className="card-img-top" alt="Event image" />
                <div className="card-body">
                
                  <h5 className="card-text detail EventIdSpecification_NU_ViewEvents event-id_NU_ViewEvents" data-tooltip={`${event.eventTitle} Id`}>{event.event_id}</h5>
                  <h5 className="card-title title">{event.eventTitle}</h5>
                  <div className="straight-line"></div>
                  <p className="card-text detail">
                    <i className="bi bi-bookmark-star-fill"></i> {event.finalEventType}
                  </p>
                  <p className="card-text detail">
                    <i className="bi bi-calendar2-week-fill"></i> {event.date}
                  </p>
                  <p className="card-text detail date">
                    <i className="bi bi-alarm-fill"></i> {formatTime(event.startTime)}
                  </p>
                  <p className="card-text detail">
                  <i className="bi bi-ticket"></i> {event.ticketPrice} Rs per Booking
                  </p>
                  <a onClick={() => handleViewDetails(event.event_id)} className="btn btn-primary">
                    <i className="bi bi-eye"></i> View Details
                  </a>
                </div>
              </div>
              
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>

      <div className='popupEvent_NU' style={{display: 'block'}} id='ViewEventPopupEvent_NU'>
      {oneEventDetails?.length && 
        <div className="cardHang_2">
        
         <div className="card" style={{ width: '95%' }}>
                <img src ={yoga01} className="image" alt="Card image" />
                <div className="card-body">
                <div className='base_details'>
                    <h5 className="card-title title">{oneEventDetails[0].eventTitle}</h5>
                    <div className="straight-line"></div>
                    <p className="card-text detail"><i className='bi bi-bookmark-star-fill'></i> {oneEventDetails[0].finalEventType}</p>
                    <p className="card-text detail physical"><i className='bi bi-soundwave'></i> {oneEventDetails[0].hall_id} (WellnessVision Hall)</p>
                    <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {oneEventDetails[0].date}</p>
                    <p className="card-text detail date"><i className='bi bi-alarm-fill'></i> {formatTime(oneEventDetails[0].startTime)}</p> 
                    <p className="card-text detail duration"><i className='bi bi-hourglass-split'></i> {oneEventDetails[0].finalDuration} hour duration</p> 
                    <p className="card-text detail price"><i className='bi bi-cash-stack'></i> Rs.{oneEventDetails[0].ticketPrice}/= (Per participant)</p> 
                    <p className="card-text detail seats"><i className='bi bi-person-workspace'></i> {oneEventDetails[0].hall_capacity} Seats</p> 
                    <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> 540 Bookings</p> 
                    <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> {oneEventDetails[0].language} Language</p> 
                    </div>
                    <div>
                        <h5 className='description'>Description</h5>
                        <p>{oneEventDetails[0].event_description}</p>
                    </div>
                    <div className='button_div'>
                    <a onClick={() => setOneEventDetails([])} className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Back to Events</a>
                    <a className="btn btn-danger book_button"><i className="bi bi-person-plus"></i> Enroll Event</a>
                    </div>
                </div> 
                </div>
        </div>}
      
    
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

    </div>
  );
};

export default NU_ViewPhysicalEvents;
