import React, { useEffect, useState, useCallback } from 'react';
import EM_Sidebar from './EM_components/EM_Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToggle } from '../../pages/HP/useToggle';
import Hp_ViewModifyMoneyReceiptsDetails from '../../components/Hp_ViewModifyMoneyReceiptsDetails'
import { useNavigate } from 'react-router-dom';
import EM_EventBookingCloseForEventManager from './EM_components/EM_EventBookingCloseForEventManager';
import EM_ViewBookingParticipationDetails from './EM_components/EM_ViewBookingParticipationDetails';

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
    hp_id: number,
    event_state: string,
    accountNumber: string,
    accountOwnerName: string,
    branchName: string,
    bankName: string
    ticketBookingCount: number
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

  const EM_ViewOneEvent: React.FC = () => {
  const [alertSaveSuccess, setAlertSaveSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleReadOnly, setTitleReadOnly] = useState<boolean>(true);
  const [descriptionReadOnly, setDescriptionReadOnly] = useState<boolean>(true);

  const [edit_mode, setEdit_mode] = useState<boolean>(false);
  const [save_changes, setSave_changes] = useState<boolean>(false);
  const hp_name = localStorage.getItem("hp_name");
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const [showPopup_4, togglePopup_4] = useToggle();
  const { eventId } = useParams<{ eventId: string }>();
  localStorage.setItem('eventId', String(eventId));
  
  const [event, setEvent] = useState<PhysicalEvent | null>(null);
  const [participants, setParticipants] = useState<ParticipationDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<ParticipationDetails | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<PhysicalEvent>(`http://localhost:15000/viewOnePhysicalEventDetail?`,{
            params: { eventId: eventId }
        });
        setEvent(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    
    
    fetchEvent();
  }, [eventId]);

  useEffect(()=>{
    if (event && !edit_mode){
        setTitle(event?.eventTitle);
        setDescription(event?.event_description);
    }
  }, );


  const fetchParticipants = useCallback(async () => {
    try {
      const response = await axios.get<ParticipationDetails[]>(`http://localhost:15000/viewPhysicalEventParticipationDetails`, {
        params: { eventId, searchCode },
      });
      setParticipants(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [eventId, searchCode]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCode(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchParticipants();
  };

  const handleMarkAsParticipate = useCallback(async (bookingId: number, participantState: string) => {
    try {
      toggleLoadingPopup(true);
      await axios.put(`http://localhost:15000/updatePhysicalEventParticipationState`, null, {
        params: { bookingId, participantState }
      });
      toggleLoadingPopup(false);
      fetchParticipants();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toggleLoadingPopup(false);
    }
  }, [fetchParticipants]);

  const handleViewDetailsClick = (participant: ParticipationDetails) => {
    setSelectedParticipantId(participant);
    togglePopup_4();
  };

  const handleEditMode = (checked: boolean) =>{
    if (checked){
        setEdit_mode(true);
    }
    else{
        setEdit_mode(false);
    }
  }

  const handleTitleEdit = () => {
    setTitleReadOnly(!titleReadOnly);
    setSave_changes(true);
  }

  const handleDescriptionEdit = () => {
    setDescriptionReadOnly(!descriptionReadOnly);
    setSave_changes(true);
  }

  const saveEdits = async () => {
    try {
        const response = await axios.put(`http://localhost:15000/EMeditOnePhysicalEventDetail`, null, {
          params: {
            eventId: eventId,
            eventTitle: title,
            event_description: description
          }
        });
        if (response.data == 0){
            
            setAlertSaveSuccess(true);
        }
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleBackToUpcomingEvents = (hpId: number) => {
    localStorage.setItem("eventtype", "Upcoming");
    localStorage.setItem("hpid", String(hpId));
    navigate('/EM_ViewOneHPEvents');
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }


    return (
        <div>
             <EM_Sidebar activeMenuItem={["HealthProfessionals"]}/>
             {event.event_state === "Upcoming" ? <div>
             <div className='EM_EditModeButtonBackground'>
             <div className="form-check form-switch EM_EditModeButton" style={{zIndex: 0, position: 'absolute'}}>
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) =>{handleEditMode(e.target.checked)}}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Edit Mode</label>
            </div>
            </div>
            <div className="cardHang_2">
            <div className="card" style={{ width: '95%' }}>
                <img src ={event.eventImage} className="image" alt="Card image" />
                <div className="card-body">
                <div className='base_details'>
                
                    <h5 className="card-title title"> <input type="text" id="EM_viewOnlyInput" className="EM_readonly-input" value={title} readOnly = {titleReadOnly} onChange={(event) =>setTitle(event.target.value)}/> <button type="button" className={`btn btn-info ${edit_mode? '' : 'disabled'} ${titleReadOnly? '' : 'EM_EditActivebutton'}`} onClick={() => handleTitleEdit()}><i className="bi bi-pencil"></i></button> </h5>
                    <div className="straight-line"></div>
                    <p className="card-text detail"><i className='bi bi-award-fill'></i> {event.event_id} (Event ID)<span className='event_id_span_hp_one_event'><i className='bi bi-bookmark-star-fill'></i> {event.finalEventType}</span></p>
                    <p className="card-text detail physical"><i className='bi bi-soundwave'></i> {event.hall_id} (WellnessVision Hall)</p>
                    <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {event.date}</p>
                    <p className="card-text detail date"><i className='bi bi-alarm-fill'></i> {formatTime(event.startTime)}</p> 
                    <p className="card-text detail duration"><i className='bi bi-hourglass-split'></i> {event.finalDuration} hour duration</p> 
                    <p className="card-text detail price"><i className='bi bi-cash-stack'></i> Rs.{event.ticketPrice}/= (Per participant)</p> 
                    <p className="card-text detail seats"><i className='bi bi-person-workspace'></i> {event.hall_capacity} Seats</p> 
                    <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> {event.ticketBookingCount} Bookings</p> 
                    <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> {event.language} Language</p> 
                    </div>
                    <div>
                        <h5 className='description'>Description  <button type="button" className={`btn btn-info ${edit_mode? '' : 'disabled'} ${descriptionReadOnly? '' : 'EM_EditActivebutton'}`} onClick={() => handleDescriptionEdit()}><i className="bi bi-pencil"></i></button> </h5>
                        
                        <textarea id="EM_viewOnlyTextarea" className="EM_readonly-textarea" readOnly = {descriptionReadOnly} value={description} onChange={(event) =>setDescription(event.target.value)}></textarea>
                        
                    </div>
                    <div className='button_div'>
                    <a onClick={() => handleBackToUpcomingEvents(event.hp_id)} className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Back</a>
                    {/* <a href="#" className="btn btn-success view_button"><i className='bi bi-chat-left-dots'></i> Contact Dr.{hp_name}</a> */}
                    <a className={`btn btn-success view_button ${save_changes? '' : 'disabled'}`} onClick={()=> {saveEdits()}}><i className='bi bi-chat-left-dots'></i> Save Changes </a>
                    <a className="btn btn-warning View_Modify_Money_receipts_details_hp_one_physical_event" style={{marginLeft :'45px'}} onClick={togglePopup_2}><i className='bi bi-info-circle'></i> Money receipts details</a>
                    <a className="btn btn-danger book_button" onClick={togglePopup}><i className='bi bi-trash3'></i> Delete Event</a>

                    </div>
                </div> 
                </div>
            </div>
            <div className="cardHang particepationMarkListDiv">
          <a className={"btn btn-danger closeEventBookingHPOneEvent"} 
          onClick={togglePopup_3}> <i className={'bi bi-power'}></i> Close Event Bookings</a>
            <form className="d-flex search" role="search">
             <input 
                 className="form-control me-2" 
                 type="search" 
                 placeholder="Search By Participent Id" 
                 aria-label="Search"
                 value={searchCode}
                 onChange={handleSearchChange}/>
              <button className="btn btn-outline-success" type="submit" disabled>Search</button>
            </form>
              <p className='participationListHeading'>Participation List</p>
          {participants.length > 0 ? (
            participants.map(participant => (
              <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.event_id}>
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
            onClick={() =>
              handleMarkAsParticipate(participant.bookingId, participant.participantState === 'NotParticipate' ? 'Participated' : 'NotParticipate')
            }
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
            <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.event_id}>
                <div className="card-body participantDetailsFlexContainer noParticipentFoundParticipentSearchHpOneEventDiv">
                  <p className='noParticipentFoundParticipentSearchHpOneEventPara'>No Participent Found</p>
                  </div>
                  </div>
          )}
        </div>
        {selectedParticipantId && 
        <EM_ViewBookingParticipationDetails 
          show_4={showPopup_4} 
          handleClose_4={togglePopup_4} 
          ParticipationDetails={selectedParticipantId} 
        />}
            
            <Hp_ViewModifyMoneyReceiptsDetails show_2={showPopup_2} handleClose_2={togglePopup_2} MoneyReceiptsDetails={event}/>
            <EM_EventBookingCloseForEventManager show_3={showPopup_3} handleClose_3={togglePopup_3} eventId={eventId}/>


            {alertSaveSuccess &&
            (<div className="alert alert-success d-flex align-items-center alert-dismissible fade show AlertSaveSuccesspopup" role="alert">
                <strong> Saved changes successfullly!</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() =>setAlertSaveSuccess(false)}></button>
                </div>)

                        
        }
        </div> : <p style={{marginLeft: '350px', marginTop: '100px', color: 'red', fontWeight: '590', fontSize: '19px'}}>This event state was updated as Previous</p>}
        </div>
        
    );
}

export default EM_ViewOneEvent;
