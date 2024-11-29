import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HPSideBar from '../../components/HP_SideBar';
import { Calendar, Clock, Activity, Users, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import './HP_Dashboard.css';

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

const formatDays = (schedule: AppointmentSchedule): string => {
  if (schedule.sunDay && schedule.monDay && schedule.tueDay && 
      schedule.wedDay && schedule.thuDay && schedule.friDay && schedule.satDay) {
    return 'Every Day';
  }
  if (schedule.monDay && schedule.tueDay && schedule.wedDay && 
      schedule.thuDay && schedule.friDay && !schedule.satDay && !schedule.sunDay) {
    return 'Weekdays';
  }
  if (schedule.satDay && schedule.sunDay && !schedule.monDay && !schedule.tueDay && 
      !schedule.wedDay && !schedule.thuDay && !schedule.friDay) {
    return 'Weekend Days';
  }
  
  const days = [];
  if (schedule.sunDay) days.push('Sun');
  if (schedule.monDay) days.push('Mon');
  if (schedule.tueDay) days.push('Tue');
  if (schedule.wedDay) days.push('Wed');
  if (schedule.thuDay) days.push('Thu');
  if (schedule.friDay) days.push('Fri');
  if (schedule.satDay) days.push('Sat');
  return days.join(' | ');
};

export default function Dashboard() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [appointmentSchedules, setAppointmentSchedules] = useState<AppointmentSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const hpId = Number(localStorage.getItem('hpId'));

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
        { params: { hp_id: hpId, eventState: 'Upcoming' } }
      );
      setEvents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
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
      const response = await axios.get<AppointmentSchedule[]>(
        `http://localhost:15000/viewAllAppointmentScheduleForHp`,
        { params: { hpId } }
      );
      setAppointmentSchedules(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  // useEffect(() => {
  //   fetchEvents();
  //   fetchAppointments();
  // }, [fetchEvents]);

  useEffect(() => {
    fetchAppointment();
  }, [setAppointmentSchedules, setError]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HPSideBar activeMenuItem={['Dashboard']} />
      <div className="HP_Dashboard_dashboard">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events Section */}
          {/* <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Events</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentEventIndex(i => Math.max(0, i - 1))}
                    disabled={currentEventIndex === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentEventIndex(i => Math.min(events.length - 1, i + 1))}
                    disabled={currentEventIndex >= events.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              {events.length > 0 ? (
                <div key={events[currentEventIndex].event_id} className="space-y-4">
                  <img
                    src={events[currentEventIndex].eventImage}
                    alt={events[currentEventIndex].eventTitle}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold">{events[currentEventIndex].eventTitle}</h3>
                  <div className="grid gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Event ID: {events[currentEventIndex].event_id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{events[currentEventIndex].finalEventType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{events[currentEventIndex].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(events[currentEventIndex].startTime)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <p className="text-gray-500">No events available</p>
                  <a 
                    href="/HP_ViewEvents"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add New Event
                  </a>
                </div>
              )}
            </CardContent>
            {events.length > 0 && (
              <CardFooter>
                <button
                  onClick={() => navigate(`/HP_OneEvents/${events[currentEventIndex].event_id}`)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </CardFooter>
            )}
          </Card> */}
          {/* Updated Events Section */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Upcoming Events</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentEventIndex((i) => Math.max(0, i - 1))}
                  disabled={currentEventIndex === 0}
                  className="card-button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentEventIndex((i) => Math.min(events.length - 1, i + 1))}
                  disabled={currentEventIndex >= events.length - 1}
                  className="card-button"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="card-content min-h-[400px]">
              {events.length > 0 ? (
                <div key={events[currentEventIndex].event_id} className="space-y-4">
                  <img
                    src={events[currentEventIndex].eventImage}
                    alt={events[currentEventIndex].eventTitle}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {events[currentEventIndex].eventTitle}
                  </h3>
                  <p className="text-gray-600">
                    {events[currentEventIndex].finalEventType} - {formatTime(events[currentEventIndex].startTime)} to {formatTime(events[currentEventIndex].endTime)}
                  </p>
                  <p className="text-gray-600">Capacity: {events[currentEventIndex].capacity}</p>
                </div>
              ) : (
                <p className="text-gray-500">No upcoming events.</p>
              )}
            </div>
          </div>

          {/* Appointments Section */}
          {/* <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Appointment Schedules</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentAppointmentIndex(i => Math.max(0, i - 1))}
                    disabled={currentAppointmentIndex === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentAppointmentIndex(i => Math.min(appointmentSchedules.length - 1, i + 1))}
                    disabled={currentAppointmentIndex >= appointmentSchedules.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              {appointmentSchedules.length > 0 ? (
                <div key={appointmentSchedules[currentAppointmentIndex].appointmentId} className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-24 w-24 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {appointmentSchedules[currentAppointmentIndex].title}
                  </h3>
                  <div className="grid gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Appointment ID: {appointmentSchedules[currentAppointmentIndex].appointmentId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Room {appointmentSchedules[currentAppointmentIndex].roomId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDays(appointmentSchedules[currentAppointmentIndex])}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(appointmentSchedules[currentAppointmentIndex].startTime)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <p className="text-gray-500">No appointment schedules available</p>
                  <a 
                    href="/HP_ViewAllAppointmentSchedule"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add New Appointment Schedule
                  </a>
                </div>
              )}
            </CardContent>
            {appointmentSchedules.length > 0 && (
              <CardFooter>
                <button
                  onClick={() => navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentSchedules[currentAppointmentIndex].appointmentId}`)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </CardFooter>
            )}
          </Card> */}
          {/* Updated Appointment Schedules Section */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Appointment Schedules</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentAppointmentIndex((i) => Math.max(0, i - 1))}
                  disabled={currentAppointmentIndex === 0}
                  className="card-button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentAppointmentIndex((i) =>
                      Math.min(appointmentSchedules.length - 1, i + 1)
                    )
                  }
                  disabled={currentAppointmentIndex >= appointmentSchedules.length - 1}
                  className="card-button"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="card-content min-h-[400px]">
              {appointmentSchedules.length > 0 ? (
                <div
                  key={appointmentSchedules[currentAppointmentIndex].appointmentId}
                  className="space-y-4"
                >
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-24 w-24 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {appointmentSchedules[currentAppointmentIndex].title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>
                        Appointment ID:{" "}
                        {appointmentSchedules[currentAppointmentIndex].appointmentId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Room {appointmentSchedules[currentAppointmentIndex].roomId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDays(appointmentSchedules[currentAppointmentIndex])}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(appointmentSchedules[currentAppointmentIndex].startTime)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  No appointment schedules available.
                </p>
              )}
            </div>
            {appointmentSchedules.length > 0 && (
              <div className="card-footer">
                <button
                  onClick={() =>
                    navigate(
                      `/HP_ViewOneAppointmentScheduleDetails/${appointmentSchedules[currentAppointmentIndex].appointmentId}`
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}