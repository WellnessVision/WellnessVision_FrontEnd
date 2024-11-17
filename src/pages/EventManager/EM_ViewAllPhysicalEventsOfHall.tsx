import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css';
import { useToggle } from '../../pages/HP/useToggle';
import EM_Sidebar from './EM_components/EM_Sidebar';
import { parseISO, format } from 'date-fns';
import '../HP/HP_Notification.css'
import HP_ViewOnePhysicalEventPayment from '../../components/HP_ViewOnePhysicalEventPayment';
import '../HP/HP_ViewPhysicalEventPayment.css'
import '../HP/HP_ViewAllAppointmentSchedule.css'
import HP_AddAppointmentSchedulesDateSelection from '../HP/HP_AddAppointmentSchedulesDateSelection';
import { useParams } from 'react-router-dom';
import yoga01 from '../../resources/yoga01.png';
import EM_SelectMaintainDateType from './EM_components/EM_SelectMaintainDateType';
import EM_SetChargeAndAdvancePrecentage from './EM_components/EM_SetChargeAndAdvancePrecentage';
import EM_SelectCapasityModificationType from './EM_components/EM_SelectCapasityModificationType';

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
    volunteerType: string
}

interface HP_CardforEventManager{
    hall_id: string;
    hall_type: string;
    capacity: number;
    charge: number;
    advance_percentage: number;
    state: string;
    maintain_start_date: string;
    maintain_end_date: string;
    unavailable_date: string;
}

const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
};

const EM_ViewAllPhysicalEventsOfHall: React.FC = () => {
    const [physicalEvents, setPhysicalEvents] = useState<PhysicalEvent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [showPopup_2, togglePopup_2] = useToggle();
    const [showPopup_7, togglePopup_7] = useToggle();
    const [showPopup_8, togglePopup_8] = useToggle();
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const { hallId } = useParams<{ hallId: string }>();
    const [roomDetails , setRoomDetails] = useState<HP_CardforEventManager>();
    const [selectMaintainDateType, setSelectMaintainDateType] = useState(false);
    const [chargeAndAdvancePrecentage, setChargeAndAdvancePrecentage] = useState(false);
    const [capasityModificationType, setCapasityModificationType] = useState(false);

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager>(`http://localhost:15000/getOnePhysicalEventHallDetailsForEventManager`, {
                params: { hallId }
            });
            setRoomDetails(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    
    useEffect(() => {
        fetchRoomDetails();
    }, [setRoomDetails, setError]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get<PhysicalEvent[]>(`http://localhost:15000/getPhysicalEventsOfOneHallForEventManager`, {
                params: { hallId }
            });
            setPhysicalEvents(response.data);
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
    }, [setPhysicalEvents, setError]);

    const changeHallState =  useCallback(async (hallState: string) => {
        try {
            navigate('/HP_LodingPage');
            await axios.put(`http://localhost:15000/changeHallStateOfHallForEventManager`, null, {
            params: { 
                hallId,
                hallState 
                }
            });
            navigate(`/EM_ViewAllPhysicalEventsOfHall/${hallId}`);
        } catch (err) {
            if (err instanceof Error) {
            setError(err.message);
            } else {
            setError('An unknown error occurred');
            }
        }
        }, []);

    const handleGoBack = () => {
        navigate('/EM_ViewAllPhysicalEventHalls');
    };

    const handleSelectMaintainDateType = () => {
        setSelectMaintainDateType(true);
        togglePopup_2();
      };

    const handleUpdateChargeAndAdvancePercentage = () => {
        setChargeAndAdvancePrecentage(true);
        togglePopup_7();
      };

    const handleCapasityUpdate = () => {
        setCapasityModificationType(true);
        togglePopup_8();
      };

    const handleViewDetails = (eventId: number) => {
        navigate(`/EM_OneEvent/${eventId}`);
    };

    return (
        <div>
            <EM_Sidebar activeMenuItem={["EventHalls"]} />
            <div className="cardHang">
            <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder HP_ViewAllAppointmentSchedule_mainHeader' style={{marginTop: '-55px'}}>Details of Hall Id {hallId}</p>
            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody HP_ViewAllAppointmentSchedule_cardBody" style={{ width: '100%', height: '250px'}} key={0}>
                <div className="card-body card-body participantDetailsFlexContainer" style={{marginTop: '-150px'}}>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_appointmentId"><span style={{color: '#848884'}}>Hall Id: </span>{roomDetails?.hall_id}</h5>
                {roomDetails?.hall_type == 'Lecture' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title"><span style={{color: '#848884'}}>Hall Type: </span>Lecture Hall (Table and Chairs)</h5> : ''}
                {roomDetails?.hall_type == 'Therapy' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title"><span style={{color: '#848884'}}>Hall Type: </span>Therapy Hall (Therapy Beds)</h5> : ''}
                {roomDetails?.hall_type == 'Free Space' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title"><span style={{color: '#848884'}}>Hall Type: </span>Free Space Hall (Yoga Mats)</h5> : ''}
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-580px'}}><span style={{color: '#848884'}}>Hourly Charge: </span>Rs.{roomDetails?.charge}/=</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-200px'}}><span style={{color: '#848884'}}>Advance Percentage: </span>{roomDetails?.advance_percentage}%</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time"><span style={{color: '#848884', marginLeft: '250px'}}>Capacity: </span>{roomDetails?.capacity} Participants</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_todayState"><span style={{color: '#848884', marginLeft: '-10px'}}>Hall State : </span><span className='HP_ViewAllAppointmentSchedule_todayStateColour'>{roomDetails?.state}</span></h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-580px', marginTop: '120px'}}><span style={{color: '#848884'}}>Maintain Start Date: </span>{roomDetails?.maintain_start_date != null ? roomDetails?.maintain_start_date : 'Not Set'}</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-200px', marginTop: '120px'}}><span style={{color: '#848884'}}>Maintain End Date: </span>{roomDetails?.maintain_end_date != null ? roomDetails?.maintain_end_date : 'Not Set'}</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-580px', marginTop: '200px'}}><span style={{color: '#848884'}}>Unavailable Date (Not available from this date onwards): </span>{roomDetails?.unavailable_date != null ? roomDetails?.unavailable_date : 'Not Set'}</h5>
                <a onClick={handleSelectMaintainDateType} className="btn btn-warning HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '200px', marginLeft: '-550px', marginTop: '300px'}}>
                <i className="bi bi-calendar2-check"></i> Set Maintain Dates
                </a>
                <a onClick={handleUpdateChargeAndAdvancePercentage} className="btn btn-success HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '250px', marginLeft: '-190px', marginTop: '300px'}}>
                <i className="bi bi-cash-stack"></i> Update Charges Details
                </a>
                {roomDetails?.state === 'Available' ? 
                <a onClick={() => changeHallState("Unavailable")} className="btn btn-danger HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '350px', marginLeft: '200px', marginTop: '300px'}}>
                <i className="bi bi-x-circle"></i> Unavailable for New Physical Event 
                </a> 
                : ''}
                {roomDetails?.state === 'Unavailable' ? 
                <a onClick={() => changeHallState("Available")} className="btn btn-danger HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '350px', marginLeft: '200px', marginTop: '300px'}}>
                <i className="bi bi-person-plus"></i> Available for New Physical Event 
                </a> 
                : ''}
                <a onClick={handleCapasityUpdate} className="btn btn-info HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '250px', marginLeft: '255px', marginTop: '180px'}}>
                <i className="bi bi-cash-stack"></i> Update Capacity
                </a>
            </div>
            </div>    
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder HP_ViewAllAppointmentSchedule_mainHeader' style={{marginTop: '5px'}}>Physical Events of Hall Id {hallId}</p>
                <a onClick={handleGoBack} className="btn btn-primary HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '150px', marginLeft: '1080px'}}>
                <i className="bi bi-arrow-left-circle"></i> Go Back
                 </a>
            <div className="cardHang" style={{marginLeft: '-240px', marginTop: '50px', zIndex: '0'}}>
            {physicalEvents.length > 0 ? (
                       physicalEvents.map(event => (
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
                  {event.volunteerNeedState === 'NoNeed' ? 
                  <p className="card-text detail" style={{color: 'red'}}>
                  <i className="bi bi-person-raised-hand" style={{color: 'black'}}></i> No Need</p> : 
                      <p className="card-text detail">
                    <i className="bi bi-person-raised-hand"></i> {event.volunteerType.length > 30
                      ? `${event.volunteerType.substring(0, 27)}...`
                      : event.volunteerType}
                  </p>}
                  <a onClick={() => handleViewDetails(event.event_id)} className="btn btn-primary">
                    <i className="bi bi-eye"></i> View Details
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p style={{marginTop: '10px', marginLeft: '50px'}}>No events available</p>
          )}
        </div>
        </div>
            <HP_AddAppointmentSchedulesDateSelection show={showPopup} handleClose={togglePopup} />
            {selectMaintainDateType && <EM_SelectMaintainDateType show_2={showPopup_2} handleClose_2={togglePopup_2} hallId={hallId} setSelectMaintainDateType={setSelectMaintainDateType} roomDetails={roomDetails}/>}
            {chargeAndAdvancePrecentage && <EM_SetChargeAndAdvancePrecentage show_7={showPopup_7} handleClose_7={togglePopup_7} hallId={hallId} setChargeAndAdvancePrecentage={setChargeAndAdvancePrecentage} roomDetails={roomDetails}/>}
            {capasityModificationType && <EM_SelectCapasityModificationType show_8={showPopup_8} handleClose_8={togglePopup_8} hallId={hallId} setCapasityModificationType={setCapasityModificationType} roomDetails={roomDetails}/>}
        </div>
    );
};

export default EM_ViewAllPhysicalEventsOfHall;
