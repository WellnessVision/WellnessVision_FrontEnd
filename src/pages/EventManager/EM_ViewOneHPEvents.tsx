import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EM_Sidebar from './EM_components/EM_Sidebar';
import { useToggle } from '../HP/useToggle';

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

interface OnlineEvents{
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


const EM_ViewOneHPEvents: React.FC = () => {
  const type = localStorage.getItem("eventtype");
  const [eventType, setEventType] = useState(type ? type :"Physical");
  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[] | OnlineEvents[]>([]);
  const [error, setError] = useState<string | null>(null);
  const hpId = Number(localStorage.getItem('hpid'));
  const navigate = useNavigate();
  const [searchCode, setSearchCode] = useState('');
  const hp_name = localStorage.getItem('hp_name')

  const fetchEvents =  useCallback(async () => {
    try {
      if (eventType == "Physical"){
        const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getAllPhysicalEventsForEM?`, {
          params: { hpId: hpId, searchCode: searchCode}
        });
        setEvents(response.data);
      }
      // if (eventType == "Online"){
      //   const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getAllPhysicalEventsForEM?`, {
      //     params: { hpId: hpId, searchCode: searchCode}
      //   });
      //   setEvents(response.data);
      // }
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [searchCode]);

 
  const handleViewDetails = (eventId: number) => {
    navigate(`/EM_OneEvent/${eventId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
    
  };

  const openOnlineTab = () => {
    setEventType("Online");
    localStorage.setItem("eventtype", "Online");
    navigate('/EM_ViewOneHPEvents');
    window.location.reload();
  }

  const openPhysicalTab = () => {
    setEventType("Physical");
    localStorage.setItem("eventtype", "Physical");
    navigate('/EM_ViewOneHPEvents');
    window.location.reload();
  }

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);


  return (
    <div>
      <EM_Sidebar activeMenuItem={["HealthProfessionals"]}/>

      <div className='smallNavInEM' style={{top:'100px', left:'300px', position:'absolute'}}>
      <div className='smallNavInEM_Fixed' style={{position:'fixed'}}>
      <h5>All Events from {hp_name} </h5>

      <form className="d-flex search HP_ViewEvents_searchByEventName EM_SearchEvent" role="search" style={{marginLeft: '1280px', marginTop: '-40px'}}>
             <input 
                 className="form-control me-2" 
                 type="search" 
                 placeholder="Search By Event Name" 
                 aria-label="Search"
                 value={searchCode}
                 onChange={handleSearchChange}/>
              <button className="btn btn-outline-success" type="submit" disabled>Search</button>
            </form>
        {/* <a onClick={togglePopup} className="btn btn-success add_physical">
          <i className="bi bi-plus-lg"></i> New Physical Event
        </a> */}

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={`nav-link ${eventType == "Physical" ? 'active' : ''}`} aria-current="page" onClick={() => openPhysicalTab()}>Physical Events</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${eventType == "Online" ? 'active' : ''}`} aria-current="page" onClick={() => openOnlineTab()}>Online Events</a>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact Dr.{hp_name}</a>
            </li> */}
            
          </ul>
          </div>

          <div className='EM_ViewsEventsinoneHP'>
            {eventType === "Physical" ? 
            <a className="btn btn-success" style={{height: '40px', position: 'absolute', marginTop: '-57px', marginLeft: '1015px', width: '200px'}}>
            <i className="bi bi-plus-lg"></i> New Physical Event
          </a> : 
          <a className="btn btn-success" style={{height: '40px', position: 'absolute', marginTop: '-57px', marginLeft: '1015px', width: '200px'}}>
          <i className="bi bi-plus-lg"></i> New Online Event
        </a>}
          <div className="cardHang EM_ViewsEventsinoneHPcardbody" style={{marginTop: '155px'}}>
          {events.length > 0 ? (
            events.map(event => (
              <div className="card" style={{ width: '18rem' }} key={event.event_id}>
                <img src={event.eventImage} className="card-img-top" alt="Event image" />
                <div className="card-body">
                  <h5 className="card-title title">{event.eventTitle}</h5>
                  <div className="straight-line"></div>
                  <p className="card-text detail">
                    <i className="bi bi-award-fill"></i> {event.event_id} (Event ID)
                  </p>
                  <p className="card-text detail">
                    <i className="bi bi-bookmark-star-fill"></i> {event.finalEventType}
                  </p>
                  <p className="card-text detail">
                    <i className="bi bi-soundwave"></i> {event.hall_id} (WellnessVision Hall)
                  </p>
                  <p className="card-text detail">
                    <i className="bi bi-calendar2-week-fill"></i> {event.date}
                  </p>
                  <p className="card-text detail date">
                    <i className="bi bi-alarm-fill"></i> {formatTime(event.startTime)}
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
      </div>
    
    </div>
  );
};

export default EM_ViewOneHPEvents;
