import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './HP_AddPhysicalEvent.css';
import { useToggle } from '../../pages/HP/useToggle';
import HallAvailability from '../../components/HP_HallAvailability';

interface HP_AddPhysicalEventProps {
    show: boolean;
    handleClose: () => void;
    children?: React.ReactNode;
  }

const HP_AddPhysicalEvent: React.FC<HP_AddPhysicalEventProps> = ({ show, handleClose, children }) => {
 
  const [showPopup_2, togglePopup_2] = useToggle();
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [otherEventType, setOtherEventType] = useState('');
  const [finalEventType, setFinalEventType] = useState('');
  const [hallType, setHallType] = useState('');
  const [expectedCapacity, setExpectedCapacity] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [finalduration, setFinalDuration] = useState('');


  useEffect(() => {
    if (startTime && endTime) {
      const start = parseInt(startTime);
      const end = parseInt(endTime);
      if (start < end) {
        const durationHours = end - start;
        setDuration(`${durationHours} hour(s)`);
        setFinalDuration(`${durationHours}`);
      } else {
        setDuration('');
      }
    }
  }, [startTime, endTime]);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      togglePopup_2();
      const response = await axios.post('http://localhost:15000/register', {
        eventTitle,
        finalEventType,
        hallType,
        startTime,
        endTime,
        finalduration,
        expectedCapacity,
        ticketPrice
      });
      // setMessage(response.data.message || 'Registration successful');
    } catch (error) {
      // setMessage('Error registering user');
    }
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const end = e.target.value;
    const start = parseInt(startTime);
    if (parseInt(end) > start) {
      setEndTime(end);
    } else {
      setEndTime('');
      setMessage('End time must be greater than start time');
    }
  };

  const handleClear = () => {
    setStartTime('');
    setEndTime('');
    setDuration('');
  };

  const ClearAll = () => {
    setEventTitle('');
    setEventType('');
    setOtherEventType('');
    setHallType('');
    setStartTime('');
    setEndTime('');
    setDuration('');
    setExpectedCapacity('');
    setTicketPrice('');
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setEventType(selectedType);
    setFinalEventType(selectedType);
  };

  const handleEventTypeChange_2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setOtherEventType(selectedType);
    setFinalEventType(selectedType);
  };

  return (
    <div className={`popup ${show ? 'show' : ''}`}>
      <div className="popup-inner popup-inner_HP_AddPhysicalEvent">
        <button className="btn btn-danger close-btn" onClick={() => {handleClose(); ClearAll();}}><i className="bi bi-x-lg closeAddEvent"></i></button>
        <div className="hp_form">
          <div className="form_div">
            <h1 className="hp_header_HP_AddPhysicalEvent hp_header">Add New Physical Event</h1>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  id="EventTitle" 
                  placeholder="Event Title" 
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="name-group">
                <div className="form-group">
                  <select 
                    id="EventType" 
                    className="form-control" 
                    value={eventType}
                    required
                    onChange={handleEventTypeChange}
                  >
                    <option value="" disabled>Event Type</option>
                    <option value="Awareness Lecture">Awareness Lecture</option>
                    <option value="Yoga Event">Yoga Event</option>
                    <option value="Therapy Event">Therapy Event</option>
                    <option value="Exercise Event">Exercise Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {eventType === 'Other' && (
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="OtherEventType" 
                      required
                      placeholder="Please specify the event type" 
                      value={otherEventType}
                      onChange={handleEventTypeChange_2}
                    />
                  </div>
                )}
                <div className="form-group">
                  <select 
                    id="HallType" 
                    className="form-control" 
                    value={hallType}
                    required
                    onChange={(e) => setHallType(e.target.value)}
                  >
                    <option value="" disabled>Hall Type</option>
                    <option value="Lecture">Lecture Hall (Tables and Chairs)</option>
                    <option value="Therapy">Therapy Hall  (Therapy Beds)</option>
                    <option value="Free Space">Free Space Hall (Yoga Mats)</option>
                  </select>
                </div>
              </div>
              <div className="name-group">
                <div className="form-group">
                  <select 
                    id="StartTime" 
                    className="form-control" 
                    value={startTime}
                    required
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={!!endTime}
                  >
                    <option value="" disabled>Start time</option>
                    <option value="8">8:00 AM</option>
                    <option value="9">9:00 AM</option>
                    <option value="10">10:00 AM</option>
                    <option value="11">11:00 AM</option>
                    <option value="12">12:00 PM</option>
                    <option value="13">1:00 PM</option>
                    <option value="14">2:00 PM</option>
                    <option value="15">3:00 PM</option>
                    <option value="16">4:00 PM</option>
                    <option value="17">5:00 PM</option>
                  </select>
                </div>
                <div className="form-group">
                  <select 
                    id="EndTime" 
                    className="form-control" 
                    value={endTime}
                    required
                    onChange={handleEndTimeChange}
                    disabled={!startTime || !!duration}
                  >
                    <option value="" disabled>End time</option>
                    <option value="9">9:00 AM</option>
                    <option value="10">10:00 AM</option>
                    <option value="11">11:00 AM</option>
                    <option value="12">12:00 PM</option>
                    <option value="13">1:00 PM</option>
                    <option value="14">2:00 PM</option>
                    <option value="15">3:00 PM</option>
                    <option value="16">4:00 PM</option>
                    <option value="17">5:00 PM</option>
                    <option value="18">6:00 PM</option>
                  </select>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="Duration" 
                    placeholder="Duration" 
                    readOnly
                    disabled
                    required
                    value={duration}
                  />
                </div>
                <button type="button" className="btn btn-primary clear_button_addEvent" onClick={handleClear}>
                  <span className="clear_button_text_addEvent">Clear</span>
                </button>
              </div>
              {message && !duration && <p className="time_wrong_addEvent">{message}</p>}
              <div className="name-group">
                <div className="form-group">
                  <input 
                    type="number" 
                    max={1000}
                    min={1}
                    className="form-control" 
                    id="ExpectedCapacity" 
                    placeholder="Expected participant Count (Max = 1000)" 
                    required
                    value={expectedCapacity}
                    onChange={(e) => setExpectedCapacity(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text RsTag_addEvent">Rs.</div>
                    </div>
                    <input 
                      type="number" 
                      min={1}
                      className="form-control" 
                      id="TicketPrice" 
                      placeholder="Ticket Price" 
                      required
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Check Hall Availability</button>
            </form>
            <HallAvailability show_2={showPopup_2} handleClose_2={togglePopup_2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HP_AddPhysicalEvent;