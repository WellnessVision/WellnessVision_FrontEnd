import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Eye, Activity, Users, Clock } from 'lucide-react';
import HPSideBar from '../../components/HP_SideBar'; // Adjust the import path as needed

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

interface AppointmentSchedule {
  appointmentId: number;
  title: string;
  roomId: string;
  startTime: number;
  endTime?: number;
  days?: string;
}

const NU_Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [appointmentSchedules, setAppointmentSchedules] = useState<AppointmentSchedule[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:00 ${period}`;
  };

  const formatDays = (appointment: AppointmentSchedule): string => {
    return appointment.days || 'No specific days';
  };

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get<PhysicalEvent[]>(
        'http://localhost:15000/getUpcomingPhysicalEventsForUsers',
        { 
          params: { 
            eventState: "Upcoming",
            userId: userId // Add userId to the params
          } 
        }
      );
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching events');
    }
  }, [userId]);

  const fetchAppointmentSchedules = useCallback(async () => {
    try {
      const response = await axios.get<AppointmentSchedule[]>(
        'http://localhost:15000/getBookedUpcomingPhysicalEventsForUsers',
        { 
          params: { 
            userId: userId, 
            bookingState: "Booking", 
            eventState: "Available" 
          } 
        }
      );
      setAppointmentSchedules(response.data);
    } catch (err) {
      console.error('Error fetching appointment schedules:', err);
      setError(prev => 
        prev 
          ? `${prev}\nAdditionally, could not fetch appointment schedules` 
          : 'Could not fetch appointment schedules'
      );
    }
  }, [userId]);

  useEffect(() => {
    fetchEvents();
    fetchAppointmentSchedules();
  }, [fetchEvents, fetchAppointmentSchedules]);

  const handleViewEventDetails = (eventId: number, hpId: number) => {
    navigate(`/NU_ViewOneUpcomingPhysicalEvent/${eventId}/${hpId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HPSideBar activeMenuItem={['Dashboard']} />
      <div className="HP_Dashboard_dashboard">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <button 
                    onClick={() => handleViewEventDetails(
                      events[currentEventIndex].event_id, 
                      events[currentEventIndex].hp_id
                    )}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Event Details
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No upcoming events.</p>
              )}
            </div>
          </div>

          {/* Appointment Schedules Section */}
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

        {/* Error Handling */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            <p>An error occurred:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NU_Dashboard;