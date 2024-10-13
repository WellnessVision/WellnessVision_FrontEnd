import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Volunteer_Sidebar from './Volunteer_components/Volunteer_Sidebar';
import '../HP/HP_ViewEvents.css';
import yoga01 from '../../resources/yoga01.png';
import AddEvent from '../HP/HP_AddPhysicalEvent';
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
}

const formatTime = (hour: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};


const Volunteer_UpcomingVolunteerEvents: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const volunteerId = localStorage.getItem("volunteerId");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getVolunteerUpcomingPhysicalEventsForVolunteers`, {
        params: { volunteerId, bookingState: "Booked", eventState: "Available" }
      });
      setEvents(response.data);
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

  const handleViewDetails = (eventId: number, hpId: number) => {
    navigate(`/Volunteer_ViewOneUpcomingVolunteerEvents/${eventId}/${hpId}`);
  };

  return (
    <div>
    <Volunteer_Sidebar activeMenuItem={["VolunteerUpcomingEvents", "VolunteerEvent"]}/>
      <div className={`blurBackground ${showPopup ? 'blur' : ''}`}>
        <h3 className="header">Volunteer Upcoming Events</h3>
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
                    <i className="bi bi-soundwave"></i> {event.hall_id} (WellnessVision Hall)
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

export default Volunteer_UpcomingVolunteerEvents;
