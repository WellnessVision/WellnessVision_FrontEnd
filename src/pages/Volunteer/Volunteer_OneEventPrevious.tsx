import React, { useState, useEffect } from "react";
import Volunteer_Sidebar from "./Volunteer_Sidebar";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../HP/useToggle";
import yoga01 from "../../resources/yoga01.png";
import podda from "../../resources/R_A_R_Sathnidu.jpg";
import wellness from "../../resources/WellnessVision_new_icon.png";
import wellnessFull from "../../resources/WellnessVision_full.png";
import "./Volunteer_OneEventPrevious.css";


const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

const Volunteer_OneEventPrevious : React.FC = () => {

    const event = ({
        eventId: 1,
        eventTitle: "Yoga for Life",
        finalEventType: "Yoga Event",
        hall_id: "N001",
        date: "10/08/2024",
        startTime: 11,
        finalDuration: 3,
        hp_name: "Lalith Abeysinghe",
        hall_capacity: 800,
        language: "English",
        event_description1: "Join us for a rejuvenating yoga event designed to harmonize your mind, body, and spirit. Whether you're a beginner or an experienced yogi, our skilled instructors will guide you through a series of invigorating poses and calming breathing exercises. Experience the tranquility of nature as we practice outdoors, connecting deeply with ourselves and the environment. Come away feeling refreshed, balanced, and inspired. Don't miss this opportunity to enhance your well-being and meet like-minded individuals in a serene setting.",
        event_description2: `In addition to the yoga sessions, we will have a mindfulness workshop where you can learn techniques to incorporate mindfulness into your daily life. 
        Enjoy a healthy snack break with delicious and nutritious options provided, and take part in a group discussion to share your experiences and insights. 
        This event is not just about yoga, but a holistic approach to improving your overall mental and physical health. 
        Come and join us for a day of wellness and community.`,
        event_description3:
        `We are also offering a special guest speaker session on the benefits of yoga and mindfulness practices for mental health. 
        This session will provide valuable insights and practical advice from an expert in the field. 
        Don't miss the opportunity to expand your knowledge and gain new perspectives on how to maintain a balanced and healthy lifestyle.`

    });

    return(
        <div>
            <Volunteer_Sidebar activeMenuItem="Previous" />
            <div className="cardHang_2">
            <div className="card" style={{ width: '95%' }}>
                <img src ={yoga01} className="image" alt="Card image"  style={{marginTop: "12px", marginLeft: "12px"}} />
                <div className="card-body">
                <div className='base_details' style={{marginLeft: "620px"}}>
                    <h5 className="card-title title">{event.eventTitle}</h5>
                    <div className="straight-line"></div>
                    <p className="card-text detail"><i className='bi bi-bookmark-star-fill'></i> {event.finalEventType} (ID: {event.eventId})</p>
                    <p className="card-text detail physical"><i className='bi bi-soundwave'></i> {event.hall_id} (WellnessVision Hall)</p>
                    <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {event.date}</p>
                    <p className="card-text detail date"><i className='bi bi-alarm-fill'></i> {formatTime(event.startTime)}</p> 
                    <p className="card-text detail duration"><i className='bi bi-hourglass-split'></i> {event.finalDuration} hour duration</p> 
                    <p className="card-text detail price"><i className='bi bi-heart-pulse-fill'></i> Dr. {event.hp_name}</p> 
                    <p className="card-text detail seats"><i className='bi bi-person-workspace'></i> {event.hall_capacity} Seats</p> 
                    <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> 540 Bookings</p> 
                    <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> {event.language} Language</p> 
                    </div>
                    <div>
                        <h5 className='description' style={{marginTop: "50px"}}>Description</h5>
                        <p>{event.event_description1}</p>
                        <p>{event.event_description2}</p>
                        <p>{event.event_description3}</p>
                    </div>
                    <div>
                        <h5 className='Volunteer_OneEventPrevious_memories'>Memories</h5>
                        <img src ={wellnessFull} className="Volunteer_OneEventPrevious_memory_image" alt="Card image 1" />
                        <img src ={podda} className="Volunteer_OneEventPrevious_memory_image" alt="Card image 2" />
                        <img src ={wellness} className="Volunteer_OneEventPrevious_memory_image" alt="Card image 3" />
                    </div>
                    <div className='button_div' style={{marginTop: "70px", marginBottom: "10px"}}>
                    <a href="/Volunteer_MyEvents_Previous" className="btn btn-primary volunteer_back_button"><i className='bi bi-arrow-left-circle'></i> Back to Previous Events</a>
                    <a href="Volunteer_OneEvent" className="btn btn-success volunteer_view_button"><i className='bi bi-chat-left-dots'></i> Contact Event Manager</a>
                    <a href="Volunteer_OneEvent" className="btn btn-danger volunteer_hide_button"><i className='bi bi-trash3'></i> Hide Event</a>
                    <a href="Volunteer_OneEvent" className="btn btn-warning volunteer_edit_button"><i className='bi bi-trash3'></i> Edit Event</a>
                    </div>
                </div> 
                </div>
            </div>
        </div>
    );
};

export default Volunteer_OneEventPrevious;