import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HPSideBar from '../../components/HP_SideBar';
import yoga01 from '../../resources/yoga01.png';
import './HP_ViewEvents.css';
import AddEvent from '../HP/HP_AddPhysicalEvent';
import HallAvailability from '../../components/HP_HallAvailability';
import { useToggle } from './useToggle';

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


const HP_ViewEvents: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const hpId = 1;
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/viewPhysicalEvent`, {
        params: { hp_id: hpId }
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

  const handleViewDetails = (eventId: number) => {
    navigate(`/HP_OneEvents/${eventId}`);
  };

  return (
    <div>
      <HPSideBar activeMenuItem="Events" />
      <div className={`blurBackground ${showPopup ? 'blur' : ''}`}>
        <h3 className="header">All Events</h3>
        <a onClick={togglePopup} className="btn btn-success add_physical">
          <i className="bi bi-plus-lg"></i> New Physical Event
        </a>
        <a className="btn btn-success add_online">
          <i className="bi bi-plus-lg"></i> New Online Event
        </a>
        <div className="cardHang">
          {events.length > 0 ? (
            events.map(event => (
              <div className="card" style={{ width: '18rem' }} key={event.event_id}>
                <img src={event.eventImage || yoga01} className="card-img-top" alt="Event image" />
                <div className="card-body">
                  <h5 className="card-title title">{event.eventTitle}</h5>
                  <div className="straight-line"></div>
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
      <AddEvent show={showPopup} handleClose={togglePopup} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default HP_ViewEvents;
