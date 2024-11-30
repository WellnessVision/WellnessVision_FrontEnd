import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HPSideBar from '../../components/HP_SideBar';
import yoga01 from '../../resources/yoga01.png';
import appointmentScheduleImage from '../../resources/appointmentSchedule.png';
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
  volunteerNeedState: string;
  volunteerType: string;
}

interface AppointmentSchedule {
  appointmentId: number;
  roomId: number;
  title: string;
  roomType: string;
  sunDay: number;
  monDay: number;
  tueDay: number;
  wedDay: number;
  thuDay: number;
  friDay: number;
  satDay: number;
  startTime: number;
  endTime: number;
  duration: number;
  capacity: number;
  bookingPrice: number;
  dailyState: string;
}

const formatTime = (hour: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};

const HP_Dashboard: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const hpId = Number(localStorage.getItem('hpId'));
  sessionStorage.setItem('hpid', localStorage.getItem('hpId') || '0');
  const navigate = useNavigate();
  const [searchCode, setSearchCode] = useState('');
  const [appointmentSchedules, setAppointmentSchedules] = useState<AppointmentSchedule[]>([]);

  useEffect(() => {
    const autoUpdateThePhysicalEventStateToPrevious = async () => {
      try {
        await axios.put(
          'http://localhost:15000/autoUpdateThePhysicalEventStateToPrevious'
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    autoUpdateThePhysicalEventStateToPrevious();
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get<PhysicalEvent[]>(
        `http://localhost:15000/viewPhysicalEvent`,
        {
          params: { hp_id: hpId, eventState: 'Upcoming', searchCode },
        }
      );
      setEvents(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [hpId, searchCode]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleViewDetails = (eventId: number) => {
    navigate(`/HP_OneEvents/${eventId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
  };

  useEffect(() => {
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
      new (window as any).bootstrap.Carousel(carouselElement);
    }
  }, [events]);

  useEffect(() => {
    const automaticallyUpdateTheAppointmentDalyState = async () => {
      try {
        await axios.put('http://localhost:15000/automaticallyUpdateTheAppointmentDalyState');
      } 
      catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
  
    automaticallyUpdateTheAppointmentDalyState();
  }, []);

const fetchAppointment = async () => {
    try {
        const response = await axios.get<AppointmentSchedule[]>(`http://localhost:15000/viewAllAppointmentScheduleForHp`, {
            params: { hpId: hpId }
        });
        setAppointmentSchedules(response.data);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
    }
};

useEffect(() => {
  fetchAppointment();
}, [setAppointmentSchedules, setError]);

const handleViewDetailsAppointment = (appointmentId: number) => {
    navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentId}`);
};

  return (
    <div>
      <HPSideBar activeMenuItem={['Dashboard']} />
      <h3 className="HP_Dashboard_dashboard">Dashboard</h3>
      <div style={{ marginLeft: '310px', marginTop: '-120px', width: '500px', backgroundColor: '#b0c4de', borderRadius: '25px', height: '515px'}}>
        <h4 style={{position: 'absolute', marginLeft:'150px', marginTop: '10px'}}>Upcoming Events</h4>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ height: '515px', marginTop: '150px', borderRadius: '25px'}}
        >
          <div className="carousel-inner">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  style={{marginLeft: '110px', marginTop: '50px'}}
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
                        <i className="bi bi-soundwave"></i> {event.hall_id} (WellnessVision Hall)
                      </p>
                      <p className="card-text detail">
                        <i className="bi bi-calendar2-week-fill"></i> {event.date}
                      </p>
                      <p className="card-text detail date">
                        <i className="bi bi-alarm-fill"></i> {formatTime(event.startTime)}
                      </p>
                      {event.volunteerNeedState === 'NoNeed' ? (
                        <p className="card-text detail" style={{ color: 'red' }}>
                          <i className="bi bi-person-raised-hand" style={{ color: 'black' }}></i>{' '}
                          No Need
                        </p>
                      ) : (
                        <p className="card-text detail">
                          <i className="bi bi-person-raised-hand"></i>{' '}
                          {event.volunteerType.length > 30
                            ? `${event.volunteerType.substring(0, 27)}...`
                            : event.volunteerType}
                        </p>
                      )}
                      <a
                        onClick={() => handleViewDetails(event.event_id)}
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
              <p style={{marginTop: '210px', marginLeft: '175px', fontSize: '18px'}}>No events available</p>
              <a href="/HP_ViewEvents" className="btn btn-outline-primary" style={{marginLeft: '185px'}}>Add New Event</a>
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
      {/* Appointment */}
      <div style={{ marginLeft: '940px', marginTop: '-660px', width: '500px', backgroundColor: '#b0c4de', borderRadius: '25px', height: '515px'}}>
        <h4 style={{position: 'absolute', marginLeft:'125px', marginTop: '10px'}}>Appointment Schedules</h4>
        <div
          id="carouselExample02"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ height: '515px', marginTop: '150px', borderRadius: '25px'}}
        >
          <div className="carousel-inner">
            {appointmentSchedules.length > 0 ? (
              appointmentSchedules.map((appointmentSchedule, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  style={{marginLeft: '110px', marginTop: '52px'}}
                  key={appointmentSchedule.appointmentId}
                >
                  <div className="card" style={{ width: '18rem' }}>
                    <img
                      src={appointmentScheduleImage}
                      className="card-img-top"
                      alt="Event image"
                    />
                    <div className="card-body">
                      <h5 className="card-title title">{appointmentSchedule.title}</h5>
                      <div className="straight-line"></div>
                      <p className="card-text detail">
                        <i className="bi bi-award-fill"></i> {appointmentSchedule.appointmentId} (Appointment ID)
                      </p>
                      <p className="card-text detail">
                        <i className="bi bi-soundwave"></i> {appointmentSchedule.roomId} (WellnessVision Room)
                      </p>
                      <p className="card-text detail">
                      <i className="bi bi-speedometer"></i> {appointmentSchedule.capacity} (Capacity)
                      </p>
                      <p className="card-text detail date">
                        <i className="bi bi-alarm-fill"></i> {formatTime(appointmentSchedule.startTime)}
                      </p>
                      <p className="card-text detail">
                      <i className="bi bi-calendar2-week-fill"></i>
                      <span>{appointmentSchedule.sunDay && appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && appointmentSchedule.satDay ? (' Every Day') : 
                                (<span> {appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && !appointmentSchedule.satDay && !appointmentSchedule.sunDay? (' Weekdays') : 
                                    (<span> {appointmentSchedule.satDay && appointmentSchedule.sunDay && !appointmentSchedule.monDay && !appointmentSchedule.tueDay && !appointmentSchedule.wedDay && !appointmentSchedule.thuDay && !appointmentSchedule.friDay? (' Weekend Days') :     
                                    (<span>
                                    {appointmentSchedule.sunDay ? (' Sun'):('')}
                                    {appointmentSchedule.sunDay && appointmentSchedule.monDay ? ' | Mon' : appointmentSchedule.monDay ? ' Mon' : ''}
                                    {(appointmentSchedule.sunDay || appointmentSchedule.monDay) && appointmentSchedule.tueDay ? ' | Tues': appointmentSchedule.tueDay ? ' Tues': ''}
                                    {(appointmentSchedule.sunDay || appointmentSchedule.monDay || appointmentSchedule.tueDay) && appointmentSchedule.wedDay ? ' | Wed' : appointmentSchedule.wedDay ? ' Wed' : ''}
                                    {(appointmentSchedule.sunDay || appointmentSchedule.monDay || appointmentSchedule.tueDay || appointmentSchedule.wedDay) && appointmentSchedule.thuDay ? ' | Thurs' : appointmentSchedule.thuDay ? ' Thurs' : ''}
                                    {(appointmentSchedule.sunDay || appointmentSchedule.monDay || appointmentSchedule.tueDay || appointmentSchedule.wedDay || appointmentSchedule.thuDay) && appointmentSchedule.friDay ? ' | Fri' : appointmentSchedule.friDay ? ' Fri' : ''}
                                    {(appointmentSchedule.sunDay || appointmentSchedule.monDay || appointmentSchedule.tueDay || appointmentSchedule.wedDay || appointmentSchedule.thuDay || appointmentSchedule.friDay) && appointmentSchedule.satDay ? ' | Sat' : appointmentSchedule.satDay ? ' Sat' : ''} 
                                    </span>)}</span>)}</span>)}</span> (Days)</p>
                      <a
                        onClick={() => handleViewDetailsAppointment(appointmentSchedule.appointmentId)}
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
              <p style={{marginTop: '210px', marginLeft: '115px', fontSize: '18px'}}>No appointment schedules available</p>
              <a href="/HP_ViewAllAppointmentSchedule" className="btn btn-outline-primary" style={{marginLeft: '135px'}}>Add New Appointment Schedule</a>
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

export default HP_Dashboard;
