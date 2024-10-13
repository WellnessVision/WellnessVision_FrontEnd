import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NU_Sidebar from '../NormalUser/NU_components/NU_Sidebar'
import '../HP/HP_ViewEvents.css';
import yoga01 from '../../resources/yoga01.png';
import AddEvent from '../HP/HP_AddPhysicalEvent';
import { useToggle } from '../HP/useToggle';
import '../NormalUser/NU_ViewUpcomingPhysicalEvents.css'
import Volunteer_Sidebar from './Volunteer_components/Volunteer_Sidebar';
import './Volunteer_UpcomingPhysicalEventsForVolunteering.css'

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
  hp_id: number;
  volunteerType: string;
}

const suggestionsList: string[] = [
  "Designer",
  "Instructor",
  "Event Planner",
  "Photographer/Videographer"
];

const formatTime = (hour: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};


const Volunteer_UpcomingPhysicalEventsForVolunteering: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchTitleCode, setSearchTitleCode] = useState('');
  const [searchVolunteerCode, setSearchVolunteerCode] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getVolunteerNeedUpcomingPhysicalEventsForVolunteer`, {
        params: { eventState: "Upcoming", searchTitleCode, searchVolunteerCode }
      });
      setEvents(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [searchTitleCode, searchVolunteerCode]);
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitleCode(e.target.value);
  };

  const handleSearchVolunteerCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVolunteerCode(e.target.value);
  };

  const handleViewDetails = (eventId: number, hpId: number) => {
    navigate(`/Volunteer_ViewOneUpcomingVolunteeringEvent/${eventId}/${hpId}`);
  };

  const handleSearchChange_2 = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchVolunteerCode(input);

  if (input.length > 0) {
    const filteredSuggestions = suggestionsList.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  } else {
    setSuggestions([]);
  }
};

const handleSuggestionClick = (suggestion: string) => {
  setSearchVolunteerCode(suggestion);
  setSuggestions([]);
};

  return (
    <div>
    <Volunteer_Sidebar activeMenuItem={["UpcomingEventsForVolunteering", "EventsForVolunteering"]}/>
      <div className={`blurBackground ${showPopup ? 'blur' : ''}`}>
        <h3 className="header">Upcoming Events</h3>
        <form className="d-flex search NU_ViewUpcomingPhysicalEvents_search" role="search">
             <input 
                 className="form-control me-2 Volunteer_UpcomingPhysicalEventsForVolunteering_searchByEventName" 
                 type="search" 
                 placeholder="Search By Event Name" 
                 aria-label="Search"
                 value={searchTitleCode}
                 onChange={handleSearchChange}/>
              <button className="btn btn-outline-success" type="submit" disabled>Search</button>
              <input 
                 className="form-control me-2 Volunteer_UpcomingPhysicalEventsForVolunteering_searchByVolunteerType" 
                 type="search" 
                 placeholder="Search By Volunteer Type" 
                 aria-label="Search"
                 value={searchVolunteerCode}
                 onChange={handleSearchChange_2}
            />
            <button className="btn btn-outline-success" type="submit" disabled>Search</button> 
            {suggestions.length > 0 && (
                <ul className="list-group position-absolute top-100 start-0 w-100 bg-white border">
                {suggestions.map((suggestion, index) => (
                    <li 
                    key={index} 
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick(suggestion)}
                    >
                    {suggestion}
                    </li>
                ))}
                </ul>
            )}
            </form>
        <div className="cardHang">
          {events.length > 0 ? (
            events.map(event => (
              <div className="card" style={{ width: '18rem' }} key={event.event_id}>
                <img src={event.eventImage || yoga01} className="card-img-top" alt="Event image" />
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
                    <i className="bi bi-person-raised-hand"></i> {event.volunteerType.length > 30
                      ? `${event.volunteerType.substring(0, 27)}...`
                      : event.volunteerType}
                  </p>
                  <p className="card-text detail">
                    <i className="bi bi-calendar2-week-fill"></i> {event.date}
                  </p>
                  <p className="card-text detail date">
                    <i className="bi bi-alarm-fill"></i> {formatTime(event.startTime)}
                  </p>
                  <a onClick={() => handleViewDetails(event.event_id, event.hp_id)} className="btn btn-primary">
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
  );
};

export default Volunteer_UpcomingPhysicalEventsForVolunteering;
