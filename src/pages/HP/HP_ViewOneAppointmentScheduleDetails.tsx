import React, { useEffect, useState, useCallback } from 'react';
import HPSideBar from '../../components/HP_SideBar';
import './HP_OneEvent.css';
import yoga01 from '../../resources/yoga01.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Hp_DeletePhysicalEventFineDetailsProps from '../../components/Hp_DeletePhysicalEventFineDetails';
import { useToggle } from '../../pages/HP/useToggle';
import Hp_ViewModifyMoneyReceiptsDetails from '../../components/Hp_ViewModifyMoneyReceiptsDetails'
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../resources/prosecing.gif'
import HP_EventBookingCloseProps from '../../components/HP_EventBookingClose';
import HP_ViewBookingParticipationDetailsProps from '../../components/HP_ViewBookingParticipationDetails';
import './HP_ViewOneAppointmentScheduleDetails.css'
import Hp_ViewModifyMoneyReceiptsDetailsAppointmentSchedule from '../../components/Hp_ViewModifyMoneyReceiptsDetailsAppointmentSchedule';

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
    totalHallCharge: number;
    advancePercentage: number;
    advancePayment: number;
    paymentId: number;
    hpId: number;
    accountNumber: string;
    accountOwnerName: string;
    branchName: string;
    bankName: string;
    bookingCount: number;
}

  interface ParticipationDetails {
    user_id: number
    firstName: string
    lastName: string
    profilePic: string
    participantId: string
    participantState: string
    bookingId: number
    bookingState: string
  }

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const HP_ViewOneAppointmentScheduleDetails: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const [showPopup_4, togglePopup_4] = useToggle();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointmentSchedule, setAppointmentSchedule] = useState<AppointmentSchedule | null>(null);
  const [participants, setParticipants] = useState<ParticipationDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<ParticipationDetails | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<AppointmentSchedule>(`http://localhost:15000/viewOneAppointmentScheduleDetailsForHp?`,{
            params: { appointmentId: appointmentId }
        });
        setAppointmentSchedule(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchEvent();
  }, [appointmentId]);

//   const fetchParticipants = useCallback(async () => {
//     try {
//       const response = await axios.get<ParticipationDetails[]>(`http://localhost:15000/viewPhysicalEventParticipationDetails`, {
//         params: { appointmentId, searchCode },
//       });
//       setParticipants(response.data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }
//   }, [appointmentId, searchCode]);

//   useEffect(() => {
//     fetchParticipants();
//   }, [fetchParticipants]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchCode(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     fetchParticipants();
//   };

//   const handleMarkAsParticipate = useCallback(async (bookingId: number, participantState: string) => {
//     try {
//       toggleLoadingPopup(true);
//       await axios.put(`http://localhost:15000/updatePhysicalEventParticipationState`, null, {
//         params: { bookingId, participantState }
//       });
//       toggleLoadingPopup(false);
//       fetchParticipants();
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//       toggleLoadingPopup(false);
//     }
//   }, [fetchParticipants]);

  const handleMarkAsAvailable = useCallback(async (appointmentId: number, appointmentState: string) => {
    try {
      navigate('/HP_LodingPage');
      await axios.put(`http://localhost:15000/updateAppointmentScheduleDailyStateForHp`, null, {
        params: { appointmentId, appointmentState }
      });
      navigate(`/HP_ViewOneAppointmentScheduleDetails/${appointmentId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toggleLoadingPopup(false);
    }
  }, []);

  const handleViewDetailsClick = (participant: ParticipationDetails) => {
    setSelectedParticipantId(participant);
    togglePopup_4();
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!appointmentSchedule) {
    return <div>Loading...</div>;
  }


    return (
        <div>
             <HPSideBar activeMenuItem={["PhysicalEvents", "UpcomingEvents", "Events"]}/>
            <div className="cardHang_2">
            <div className="card HP_ViewOneAppointmentScheduleDetailsCard">
           <div className="card-body">
           <h5 className="card-title HP_ViewOneAppointmentScheduleDetails_appointmentId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Appointment Id :  </span> {appointmentSchedule.appointmentId}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_title"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Title : </span>{appointmentSchedule.title}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_Date"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Available Days :</span> 
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
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_time"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Available Time : </span> {formatTime(appointmentSchedule.startTime)} to {formatTime(appointmentSchedule.endTime)}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_duration"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Durartion : </span> {appointmentSchedule.duration} hours</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_dailyState"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Daily State : </span> <span className='HP_ViewAllAppointmentSchedule_todayStateColour'>{appointmentSchedule.dailyState}</span>
            <span className="card-text HP_ViewOneAppointmentScheduleDetails_updateDalyState" ><a className={`btn participantDetailsParticipationMarkButton ${
             appointmentSchedule.dailyState === 'Unavailable' ? 'btn btn-outline-success participantDetailsMarkasParticepateShow' : 'btn-outline-secondary participantDetailsMarkasNotParticepateShow' }`}
            onClick={() =>
                handleMarkAsAvailable(appointmentSchedule.appointmentId, appointmentSchedule.dailyState === 'Unavailable' ? 'Available' : 'Unavailable')
            }
          >
            {appointmentSchedule.dailyState === 'Unavailable' ? 'Mark as Available' : 'Mark as Unavailable'}
          </a></span></h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_maxP"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Max Patient Count : </span> {appointmentSchedule.capacity}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_todayP"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Today Booking Count : </span> {appointmentSchedule.bookingCount}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_price"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Channeling Fee Per Patient: </span> Rs.{appointmentSchedule.bookingPrice}/=</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_roomId"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Room Id : </span> {appointmentSchedule.roomId}</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_roomType"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Room Type : </span> {appointmentSchedule.roomType == 'Discussion' ? ('Discussion Room') : ('') }</h5>
            <h5 className="card-text HP_ViewOneAppointmentScheduleDetails_totalroomCharge"><span className='HP_ViewOneAppointmentScheduleDetails_FormColour'>Total Room Charge Per Day : </span> Rs.{appointmentSchedule.totalHallCharge}/=</h5>
              
         </div>
         <div className='button_div'>
                    <a href="/HP_ViewAllAppointmentSchedule" className="btn btn-primary back_button HP_ViewOneAppointmentScheduleDetailsBackButton"><i className='bi bi-arrow-left-circle'></i> Back to Appointments</a>
                    <a className="btn btn-warning View_Modify_Money_receipts_details_hp_one_physical_event" onClick={togglePopup_2}><i className='bi bi-info-circle'></i> Money receipts details</a>
                    <a href="HP_OneEvents" className="btn btn-success view_button"><i className='bi bi-chat-left-dots'></i> Update Appointment</a>
                    <a className="btn btn-danger book_button" onClick={togglePopup}><i className='bi bi-trash3'></i> Delete Appointment</a>
                    </div>
        </div>
            </div>
            <div className="cardHang particepationMarkListDiv HP_ViewOneAppointmentScheduleDetailsParticepationMarkList">
          {/* <a className={"btn btn-danger closeEventBookingHPOneEvent"} 
          onClick={togglePopup_3}> <i className={'bi bi-power'}></i> Close Event Bookings</a> */}
            <form className="d-flex search" role="search">
             <input 
                 className="form-control me-2" 
                 type="search" 
                 placeholder="Search By Participent Id" 
                 aria-label="Search"
                 value={searchCode}
                //  onChange={handleSearchChange}
                 />
              <button className="btn btn-outline-success" type="submit" disabled>Search</button>
            </form>
              <p className='participationListHeading'>Participation List</p>
          {participants.length > 0 ? (
            participants.map(participant => (
              <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={appointmentSchedule.appointmentId}>
                <div className="card-body participantDetailsFlexContainer">
                <img src={participant.profilePic} className="participantDetailsuserProfile" alt="Event image" />
                  <span className="card-text detail participantDetailuserName">
                   <i className="bi bi-award-fill"></i> {participant.firstName} {participant.lastName}
                  </span>
                  <span className="card-text detail participantDetailuserName">
                    <i className="bi bi-award-fill"></i> {participant.participantId} (Participation ID)
                  </span>
                   { participant.bookingState === 'Booking' ? (
                  <span> 
                  <a
            className={`btn participantDetailsParticipationMarkButton ${
              participant.participantState === 'NotParticipate' ? 'btn btn-outline-secondary participantDetailsMarkasParticepateShow' : 'btn-success participantDetailsMarkasNotParticepateShow'
            }`}
            // onClick={() =>
            //   handleMarkAsParticipate(participant.bookingId, participant.participantState === 'NotParticipate' ? 'Participated' : 'NotParticipate')
            // }
          >
            <i className={participant.participantState === 'NotParticipate' ? 'Mark as Participate' : 'bi bi-check-lg'}></i>{' '}
            {participant.participantState === 'NotParticipate' ? 'Mark as Participate' : 'Participated'}
          </a>
                  </span> ) : (
                    <p className='deleteUserHpParticipentMark'>Canceled Event Booking</p>
                  )}
                  <span> <a className="btn btn-primary participantDetailsviewMoreButton"
                   onClick={() => handleViewDetailsClick(participant)}>
                    <i className="bi bi-eye"></i> View Details
                  </a></span>
                </div>
              </div>
            ))
          ) : (
            <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={appointmentSchedule.appointmentId}>
                <div className="card-body participantDetailsFlexContainer noParticipentFoundParticipentSearchHpOneEventDiv">
                  <p className='noParticipentFoundParticipentSearchHpOneEventPara'>No Participent Found</p>
                  </div>
                  </div>
          )}
        </div>
        {selectedParticipantId && 
        <HP_ViewBookingParticipationDetailsProps 
          show_4={showPopup_4} 
          handleClose_4={togglePopup_4} 
          ParticipationDetails={selectedParticipantId} 
        />}
            <Hp_DeletePhysicalEventFineDetailsProps show={showPopup} handleClose={togglePopup}/>
            <Hp_ViewModifyMoneyReceiptsDetailsAppointmentSchedule show_2={showPopup_2} handleClose_2={togglePopup_2} MoneyReceiptsDetails={appointmentSchedule}/>
            <HP_EventBookingCloseProps show_3={showPopup_3} handleClose_3={togglePopup_3} eventId={appointmentId}/>
        </div>
    );
}

export default HP_ViewOneAppointmentScheduleDetails;
