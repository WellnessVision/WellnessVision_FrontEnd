import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Volunteer_Sidebar from './Volunteer_components/Volunteer_Sidebar';
import yoga01 from '../../resources/yoga01.png';
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
    hp_id: number;
    volunteerType: string;
  }

  interface BookedPhysicalEvent {
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

const Volunteer_Dashboard = () => {

  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [bookedeEvents, setBookedEvents] = useState<BookedPhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchTitleCode, setSearchTitleCode] = useState('');
  const [searchVolunteerCode, setSearchVolunteerCode] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const volunteerId = localStorage.getItem("volunteerId");

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

  const fetchVolunteerEvents = async () => {
    try {
      const response = await axios.get<BookedPhysicalEvent[]>(`http://localhost:15000/getVolunteerUpcomingPhysicalEventsForVolunteers`, {
        params: { volunteerId, bookingState: "Booked", eventState: "Available" }
      });
      setBookedEvents(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchVolunteerEvents();
  }, []);

  const handleViewVolunteerDetails = (eventId: number, hpId: number) => {
    navigate(`/Volunteer_ViewOneUpcomingVolunteerEvents/${eventId}/${hpId}`);
  };


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

    
    return(
        <div>
            <Volunteer_Sidebar activeMenuItem={["Dashboard"]}/>
            <h3 className="HP_Dashboard_dashboard">Dashboard</h3>
            <div style={{ marginLeft: '310px', marginTop: '-110px', width: '500px', backgroundColor: '#b0c4de', borderRadius: '25px', height: '485px'}}>
        <h4 style={{position: 'absolute', marginLeft:'90px', marginTop: '10px'}}>Upcoming Events to Volunteer</h4>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ height: '485px', marginTop: '150px', borderRadius: '25px'}}
        >
          <div className="carousel-inner">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  style={{marginLeft: '110px', marginTop: '54px'}}
                  key={event.event_id}
                >
                  <div className="card" style={{ width: '18rem' }}>
                    <img
                      src={event.eventImage || yoga01}
                      className="card-img-top"
                      alt="Event image"
                    />
                    <div className="card-body">
                      <h5 className="card-title title">{event.eventTitle}</h5>
                      <div className="straight-line"></div>
                      <p className="card-text detail">
                        <i className="bi bi-award-fill"></i> {event.event_id} (Event ID)
                      </p>
                      <p className="card-text detail">
                        <i className="bi bi-bookmark-star-fill"></i>{' '}
                        {event.finalEventType}
                      </p>
                      <p className="card-text detail">
                          <i className="bi bi-person-raised-hand"></i>{' '}
                          {event.volunteerType.length > 30
                            ? `${event.volunteerType.substring(0, 27)}...`
                            : event.volunteerType}
                        </p>
                      <p className="card-text detail">
                        <i className="bi bi-calendar2-week-fill"></i> {event.date}
                      </p>
                      <p className="card-text detail date">
                        <i className="bi bi-alarm-fill"></i> {formatTime(event.startTime)}
                      </p>
                      <a
                        onClick={() => handleViewDetails(event.event_id, event.hp_id)}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-eye"></i> View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
              <p style={{marginTop: '210px', marginLeft: '175px', fontSize: '18px'}}>No events to volunteer</p>
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Volunteer Evengts */}
      <div style={{ marginLeft: '940px', marginTop: '-635px', width: '500px', backgroundColor: '#b0c4de', borderRadius: '25px', height: '485px'}}>
        <h4 style={{position: 'absolute', marginLeft:'115px', marginTop: '10px'}}>Your Volunteering Events</h4>
        <div
          id="carouselExample02"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ height: '485px', marginTop: '150px', borderRadius: '25px'}}
        >
          <div className="carousel-inner">
            {bookedeEvents.length > 0 ? (
              bookedeEvents.map((bookedeEvent, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  style={{marginLeft: '110px', marginTop: '54px'}}
                  key={bookedeEvent.event_id}
                >
                  <div className="card" style={{ width: '18rem' }}>
                    <img
                      src={bookedeEvent.eventImage || yoga01}
                      className="card-img-top"
                      alt="Event image"
                    />
                    <div className="card-body">
                      <h5 className="card-title title">{bookedeEvent.eventTitle}</h5>
                      <div className="straight-line"></div>
                      <p className="card-text detail">
                        <i className="bi bi-award-fill"></i> {bookedeEvent.event_id} (Event ID)
                      </p>
                      <p className="card-text detail">
                        <i className="bi bi-bookmark-star-fill"></i>{' '}
                        {bookedeEvent.finalEventType}
                      </p>
                      <p className="card-text detail">
                        <i className="bi bi-soundwave"></i> {bookedeEvent.hall_id} (WellnessVision Hall)
                      </p>
                      <p className="card-text detail">
                        <i className="bi bi-calendar2-week-fill"></i> {bookedeEvent.date}
                      </p>
                      <p className="card-text detail date">
                        <i className="bi bi-alarm-fill"></i> {formatTime(bookedeEvent.startTime)}
                      </p> 
                      <a
                        onClick={() => handleViewVolunteerDetails(bookedeEvent.event_id, bookedeEvent.hp_id)}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-eye"></i> View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
              <p style={{marginTop: '210px', marginLeft: '145px', fontSize: '18px'}}>No Volunteering events for you</p>
              <a href="/Volunteer_UpcomingPhysicalEventsForVolunteering" className="btn btn-outline-primary" style={{marginLeft: '185px'}}>Volunteering Event</a>
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample02"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample02"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
        </div>       

    );
};

export default Volunteer_Dashboard;