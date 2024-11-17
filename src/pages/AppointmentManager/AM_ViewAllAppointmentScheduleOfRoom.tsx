import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css';
import { useToggle } from '../../pages/HP/useToggle';
import AM_Sidebar from './AM_components/AM_Sidebar';
import { parseISO, format } from 'date-fns';
import '../HP/HP_Notification.css'
import HP_ViewOnePhysicalEventPayment from '../../components/HP_ViewOnePhysicalEventPayment';
import '../HP/HP_ViewPhysicalEventPayment.css'
import '../HP/HP_ViewAllAppointmentSchedule.css'
import HP_AddAppointmentSchedulesDateSelection from '../HP/HP_AddAppointmentSchedulesDateSelection';
import { useParams } from 'react-router-dom';
import AM_SelectMaintainDateType from './AM_components/AM_SelectMaintainDateType';
import AM_SetChargeAndAdvancePrecentage from './AM_components/AM_SetChargeAndAdvancePrecentage';

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
    hpId: number;
}

interface HP_CardforEventManager{
    roomId: string;
    roomType:  string;
    charge: number;
    advancePercentage: number;
    state:  string;
    maintain_start_date: string;
    maintain_end_date: string;
    unavailable_date: string;
}

const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
};

const AM_ViewAllAppointmentScheduleOfRoom: React.FC = () => {
    const [appointmentSchedules, setAppointmentSchedules] = useState<AppointmentSchedule[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [showPopup_2, togglePopup_2] = useToggle();
    const [showPopup_7, togglePopup_7] = useToggle();
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const { roomId } = useParams<{ roomId: string }>();
    const [roomDetails , setRoomDetails] = useState<HP_CardforEventManager>();
    const [selectMaintainDateType, setSelectMaintainDateType] = useState(false);
    const [chargeAndAdvancePrecentage, setChargeAndAdvancePrecentage] = useState(false);

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

      
    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager>(`http://localhost:15000/getOneAppointmentRoomsDetailsForAppointmentManager`, {
                params: { roomId }
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
            const response = await axios.get<AppointmentSchedule[]>(`http://localhost:15000/getAppointmentSchedulesOfRoomForAppointmentManager`, {
                params: { roomId }
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
        fetchEvents();
    }, [setAppointmentSchedules, setError]);

    const changeRoomState =  useCallback(async (roomState: string) => {
        try {
            navigate('/HP_LodingPage');
            await axios.put(`http://localhost:15000/changeRoomStateOfRoomsForAppointmentManager`, null, {
            params: { 
                roomId,
                roomState 
                }
            });
            navigate(`/AM_ViewAllAppointmentScheduleOfRoom/${roomId}`);
        } catch (err) {
            if (err instanceof Error) {
            setError(err.message);
            } else {
            setError('An unknown error occurred');
            }
        }
        }, []);

    const handleViewDetails = (appointmentId: number, hpId: number) => {
        navigate(`/AM_ViewOneAppointmentScheduleDetailsOfHP/${appointmentId}/${hpId}`);
    };

    const handleGoBack = () => {
        navigate('/AM_ViewAllAppointmentRooms');
    };

    const handleSelectMaintainDateType = () => {
        setSelectMaintainDateType(true);
        togglePopup_2();
      };

    const handleUpdateChargeAndAdvancePercentage = () => {
        setChargeAndAdvancePrecentage(true);
        togglePopup_7();
      };

    return (
        <div>
            <AM_Sidebar activeMenuItem={["AppointmentRooms"]} />
            <div className="cardHang">
            <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder HP_ViewAllAppointmentSchedule_mainHeader' style={{marginTop: '-55px'}}>Details of RoomId {roomId}</p>
            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody HP_ViewAllAppointmentSchedule_cardBody" style={{ width: '100%', height: '250px'}} key={0}>
                <div className="card-body card-body participantDetailsFlexContainer" style={{marginTop: '-150px'}}>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_appointmentId"><span style={{color: '#848884'}}>Room Id: </span>{roomDetails?.roomId}</h5>
                {roomDetails?.roomType == 'Discussion' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title"><span style={{color: '#848884'}}>Room Type: </span>Discussion Room (Table and Chairs)</h5> : ''}
                {roomDetails?.roomType == 'Therapy' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title"><span style={{color: '#848884'}}>Room Type: </span>Therapy Room (Therapy Beds)</h5> : ''}
                {roomDetails?.roomType == 'Free Space' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title"><span style={{color: '#848884'}}>Room Type: </span>Free Space Room (Yoga Mats)</h5> : ''}
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-580px'}}><span style={{color: '#848884'}}>Hourly Charge: </span>Rs.{roomDetails?.charge}/=</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time" style={{marginLeft: '-200px'}}><span style={{color: '#848884'}}>Advance Percentage: </span>{roomDetails?.advancePercentage}%</h5>
                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_todayState"><span style={{color: '#848884', marginLeft: '-10px'}}>Room State : </span><span className='HP_ViewAllAppointmentSchedule_todayStateColour'>{roomDetails?.state}</span></h5>
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
                <a onClick={() => changeRoomState("Unavailable")} className="btn btn-danger HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '380px', marginLeft: '180px', marginTop: '300px'}}>
                <i className="bi bi-x-circle"></i> Unavailable for New Appointment Schedules
                </a> 
                : ''}
                {roomDetails?.state === 'Unavailable' ? 
                <a onClick={() => changeRoomState("Available")} className="btn btn-danger HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '350px', marginLeft: '200px', marginTop: '300px'}}>
                <i className="bi bi-person-plus"></i> Available for New New Health Professional
                </a> 
                : ''}
            </div>
            </div>    
                <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder HP_ViewAllAppointmentSchedule_mainHeader' style={{marginTop: '5px'}}>Appointment Schedules of RoomId {roomId}</p>
                <a onClick={handleGoBack} className="btn btn-primary HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{width: '150px', marginLeft: '1080px'}}>
                <i className="bi bi-arrow-left-circle"></i> Go Back
                 </a>
                {appointmentSchedules ? (
                    appointmentSchedules.length > 0 ? (
                        appointmentSchedules.map(appointmentSchedule => (
                            <div className="card mb-3 particepationMarkCards HP_Notification_cardBody HP_ViewOnePhysicalEventPayment_cardBody HP_ViewAllAppointmentSchedule_cardBody" style={{ width: '100%' }} key={appointmentSchedule.appointmentId}>
                                <div className="card-body card-body participantDetailsFlexContainer">
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_appointmentId">Appointment Id : {appointmentSchedule.appointmentId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Title">Title : {appointmentSchedule.title}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Time">Available Time : {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_roomId">HpId : {appointmentSchedule.hpId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_roomType">Room Type : {appointmentSchedule.roomType == 'Discussion' ? ('Discussion Room') : ('') }</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_todayState">Daily State : <span className='HP_ViewAllAppointmentSchedule_todayStateColour'>{appointmentSchedule.dailyState}</span></h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name HP_ViewAllAppointmentSchedule_Schedual">Available Days : 
                                <span>{appointmentSchedule.sunDay && appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && appointmentSchedule.satDay ? (' Every Day') : 
                                (<span> {appointmentSchedule.monDay && appointmentSchedule.tueDay && appointmentSchedule.wedDay && appointmentSchedule.thuDay && appointmentSchedule.friDay && !appointmentSchedule.satDay && !appointmentSchedule.sunDay? (' Weekdays') : 
                                    (<span> {appointmentSchedule.satDay && appointmentSchedule.sunDay && !appointmentSchedule.monDay && !appointmentSchedule.tueDay && !appointmentSchedule.wedDay && !appointmentSchedule.thuDay && !appointmentSchedule.friDay? (' Weekend Days') :     
                                    (<span>
                                    {appointmentSchedule.sunDay ? (' Sun'):('')}
                                    {appointmentSchedule.sunDay && appointmentSchedule.monDay ? ', Mon' : appointmentSchedule.monDay ? ' Mon' : ''}
                                    {appointmentSchedule.monDay && appointmentSchedule.tueDay ? ', Tues': appointmentSchedule.tueDay ? ' Tues': ''}
                                    {appointmentSchedule.tueDay && appointmentSchedule.wedDay ? ', Wed' : appointmentSchedule.wedDay ? ' Wed' : ''}
                                    {appointmentSchedule.wedDay && appointmentSchedule.thuDay ? ', Thurs' : appointmentSchedule.thuDay ? ' Thurs' : ''}
                                    {appointmentSchedule.thuDay && appointmentSchedule.friDay ? ', Fri' : appointmentSchedule.friDay ? ' Fri' : ''}
                                    {appointmentSchedule.friDay && appointmentSchedule.satDay ? ', Sat' : appointmentSchedule.satDay ? ' Sat' : ''} 
                                    </span>)}</span>)}</span>)}</span>
                                    </h5>
                                <a onClick={() => handleViewDetails(appointmentSchedule.appointmentId, appointmentSchedule.hpId)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore HP_ViewPhysicalEventPayment_viewMore HP_ViewAllAppointmentSchedule_viewMore">
                                    <i className="bi bi-eye"></i> View Details
                                </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{marginTop: '70px', marginLeft: '-100px'}}>No Appointment scheduals are available</p>
                    )
                ) : (
                    <p>Loading Payments...</p>
                )}
            </div>
            <HP_AddAppointmentSchedulesDateSelection show={showPopup} handleClose={togglePopup} />
            {selectMaintainDateType && <AM_SelectMaintainDateType show_2={showPopup_2} handleClose_2={togglePopup_2} roomId={roomId} setSelectMaintainDateType={setSelectMaintainDateType} roomDetails={roomDetails}/>}
            {chargeAndAdvancePrecentage && <AM_SetChargeAndAdvancePrecentage show_7={showPopup_7} handleClose_7={togglePopup_7} roomId={roomId} setChargeAndAdvancePrecentage={setChargeAndAdvancePrecentage} roomDetails={roomDetails}/>}
        </div>
    );
};

export default AM_ViewAllAppointmentScheduleOfRoom;
