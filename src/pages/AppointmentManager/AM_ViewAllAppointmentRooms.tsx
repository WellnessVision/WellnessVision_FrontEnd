import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AM_Sidebar from './AM_components/AM_Sidebar';
import "../EventManager/EM_ViewHealthProfessionals.css";
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../pages/HP/useToggle';
import AM_AddNewAdvanceRoom from './AM_components/AM_AddNewAppointmentRoom';


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

const AM_ViewAllAppointmentRooms: React.FC = () => {
    const [HP_list , setHP_list] = useState<HP_CardforEventManager[]>([]);
    const [error , setError] = useState<String | null>(null);
    const navigate = useNavigate();
    const [showPopup_8, togglePopup_8] = useToggle();
    const [addnewRoomFlag, setAddnewRoomFlag] = useState(false);

    const fetchHPs = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager[]>('http://localhost:15000/getAppointmentRoomsForAppointmentManager');
            setHP_list(response.data);
        }
        catch(err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    }

    useEffect(() => {
        fetchHPs();
    }, []);

    const handleClick = (roomId: string) => {
        navigate(`/AM_ViewAllAppointmentScheduleOfRoom/${roomId}`);
    }
 
    const handleAddNewAppointmentRoom = () => {
        setAddnewRoomFlag(true);
        togglePopup_8();
      };

  return (
    <div>
        <AM_Sidebar activeMenuItem={["AppointmentRooms"]}/>
        <h4 style={{marginTop: '80px', marginLeft: '280px'}}>Appointment Rooms</h4>
        <a onClick={handleAddNewAppointmentRoom} className="btn btn-success HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{marginTop: '-40px', marginLeft :'1260px'}}>
                    <i className="bi bi-plus-lg"></i> New Appointment Room 
        </a>
        <div className="cardHang" style={{marginTop: '25px'}}>
            {HP_list.length > 0 ? (
                HP_list.map((OnrRoom) => {
                    return(
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={OnrRoom.roomId}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>RoomId: </span>{OnrRoom.roomId}</h5>
                            {OnrRoom.roomType == 'Discussion' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Room Type: </span>Discussion Room (Table and Chairs)</h5> : ''}
                            {OnrRoom.roomType == 'Therapy' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Room Type: </span>Therapy Room (Therapy Beds)</h5> : ''}
                            {OnrRoom.roomType == 'Free Space' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Room Type: </span>Free Space Room (Yoga Mats)</h5> : ''}
                            <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Hourly Charge: </span>Rs.{OnrRoom.charge}/=</h5>
                            <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleClick(OnrRoom.roomId)}}>
                            <i className="bi bi-eye"></i> View Details</a>
                            </div>
                        </div>
                    )
                })
            )
            :(
                <p>No health professinals are registered yet in the system.</p>
            )}
        </div>
        {addnewRoomFlag && <AM_AddNewAdvanceRoom show_8={showPopup_8} handleClose_8={togglePopup_8} setAddnewRoomFlag={setAddnewRoomFlag}/>}
    </div>
  );
};

export default AM_ViewAllAppointmentRooms;