import React, { useState, useEffect } from "react";
import Volunteer_Sidebar from "./Volunteer_Sidebar";
import { useNavigate } from "react-router-dom";
import yoga01 from "../../resources/yoga01.png";

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
  

const Volunteer_MyEvents_Upcomming: React.FC = () => {
    // const [events, setEvents] = useState<PhysicalEvent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const hpId = 1;
    const navigate = useNavigate();

    const events = Array(5).fill ({
        eventId: 1,
        eventTitle: "Yoga for Life",
        finalEventType: "Yoga Event",
        hall_id: 7,
        date: "10/08/2024",
        startTime: 11,
    });

    const handleViewDetails = (eventId: number) => {
        navigate(`/Volunteer_OneEventUpcomming/${eventId}`);
      };

    return(
        <div>
            <Volunteer_Sidebar activeMenuItem="Upcomming" />
            <div>
                <h3 className="header">My Upcomming Events</h3>
                <div className="cardHang">
                    {/* {events.length > 0 ? ( */}
                        {events.map(event => (
                            <div className="card" style={{ width: '18rem' }} >
                                <img src={yoga01} className="card-img-top" alt="Event image" />
                                <div className="card-body">
                                    <h5 className="card-title title"> {event.eventTitle}</h5>
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
                        ))}
                    {/* // ) : (
                    //     <p>No events available</p>
                    // )} */}
                </div>
            </div>

        </div>
    )
};

export default Volunteer_MyEvents_Upcomming;