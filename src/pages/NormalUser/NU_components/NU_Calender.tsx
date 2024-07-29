import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as calender_event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './NU_Calender.css';
import axios from 'axios';


const localizer = momentLocalizer(moment);

interface PhysicalEvent {
    event_id: number;
    hall_id: string;
    eventTitle: string;
    date: string;
    startTime: number;
    endTime: number;  
  }

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<calender_event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clickedEvent, setClickedEvent] = useState<PhysicalEvent | null>(null);

    const fetchEvents = async () => {
        try {

            const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getBookedPhysicalEventsByUserId`, {
                params: { userId: 5 }
            });

            // params: { userId: localStorage.getItem('nuId') }

            setEvents(response.data.map((tempEvent) =>{
                const padTime = (time: number) => time.toString().padStart(2, '0');

                const start = `${tempEvent.date}T${padTime(tempEvent.startTime)}:00:00`;
                const end = `${tempEvent.date}T${padTime(tempEvent.endTime)}:00:00`;

                return (
                    {
                    title: tempEvent.eventTitle,
                    start: new Date(start),
                    end: new Date(end),
                    resource: tempEvent
                    }
                )
            }))

            
        } 
        catch (err) {
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


    const handleSelectEvent = (event : calender_event) =>{
        setClickedEvent(event.resource);
    }


  return (
    <div className='NU_CalenderComponent'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default MyCalendar;
