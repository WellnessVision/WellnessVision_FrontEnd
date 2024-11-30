import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NU_Sidebar from './NU_components/NU_Sidebar';
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

const NU_Dashboard: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [events, setEvents] = useState<PhysicalEvent[]>([]);
  const [bookedEvents, setBookedEvents] = useState<BookedPhysicalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchCode, setSearchCode] = useState('');
  const userId = localStorage.getItem("userId");

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getUpcomingPhysicalEventsForUsers`, {
        params: { 
          eventState: "Upcoming", 
          searchCode: searchCode,
          userId: userId  // Add userId to help with personalized events
        }
      });
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }, [searchCode, userId]);

  const fetchBookedEvents = useCallback(async () => {
    try {
      const response = await axios.get<BookedPhysicalEvent[]>(`http://localhost:15000/getBookedUpcomingPhysicalEventsForUsers`, {
        params: { 
          userId, 
          bookingState: "Booking", 
          eventState: "Available" 
        }
      });
      setBookedEvents(response.data);
    } catch (err) {
      console.error('Error fetching booked events:', err);
      setError(prev => 
        prev 
          ? `${prev}\nAdditionally, could not fetch booked events` 
          : 'Could not fetch booked events'
      );
    }
  }, [userId]);

  useEffect(() => {
    fetchEvents();
    fetchBookedEvents();
  }, [fetchEvents, fetchBookedEvents]);

  const handleViewDetails = (eventId: number, hpId: number) => {
    navigate(`/NU_ViewOneUpcomingPhysicalEvent/${eventId}/${hpId}`);
  };

  const handleViewBookedDetails = (eventId: number, hpId: number) => {
    navigate(`/NU_ViewOneBookedUpcomingphysicalEvents/${eventId}/${hpId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NU_Sidebar activeMenuItem={["Dashboard"]}/>
      
      <div className="HP_Dashboard_dashboard">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h2>
            
            {/* Search Input */}
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchCode}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {events.length > 0 ? (
              <div className="grid gap-4">
                {events.map((event) => (
                  <><div
                    key={event.event_id}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={event.eventImage || yoga01}
                      alt={event.eventTitle}
                      className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{event.eventTitle}</h3>
                      <div className="space-y-2 text-gray-600">
                        <p><strong>Event Type:</strong> {event.finalEventType}</p>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {formatTime(event.startTime)}</p>
                        <p><strong>Hall:</strong> {event.hall_id} (WellnessVision Hall)</p>
                      </div>
                      <button
                        onClick={() => handleViewDetails(event.event_id, event.hp_id)}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div><br /></>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No upcoming events available</p>
              </div>
            )}
            <hr />
          </div>

          {/* Booked Events */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Booked Events</h2>

            {bookedEvents.length > 0 ? (
              <div className="grid gap-4">
                {bookedEvents.map((event) => (
                  <div 
                    key={event.event_id} 
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img 
                      src={event.eventImage || yoga01} 
                      alt={event.eventTitle} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{event.eventTitle}</h3>
                      <div className="space-y-2 text-gray-600">
                        <p><strong>Event Type:</strong> {event.finalEventType}</p>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {formatTime(event.startTime)}</p>
                        <p><strong>Hall:</strong> {event.hall_id} (WellnessVision Hall)</p>
                      </div>
                      <button 
                        onClick={() => handleViewBookedDetails(event.event_id, event.hp_id)}
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                      >
                        View Booked Event Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No booked events available</p>
                <button 
                  onClick={() => navigate('/NU_ViewUpcomingPhysicalEvents')}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Browse Events
                </button>
              </div>
            )}
          </div>
        </div>
        <br />

        {/* Error Handling */}
        {error && (
          <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NU_Dashboard;