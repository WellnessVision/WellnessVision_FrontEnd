import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EM_Sidebar from './EM_components/EM_Sidebar';
import "../EventManager/EM_ViewHealthProfessionals.css";
import { useNavigate } from 'react-router-dom';
import { useToggle } from '../../pages/HP/useToggle';
import EM_AddNewPhysicalEventHall from './EM_components/EM_AddNewPhysicalEventHall';


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

const EM_ViewAllPhysicalEventHalls: React.FC = () => {
    const [HP_list , setHP_list] = useState<HP_CardforEventManager[]>([]);
    const [error , setError] = useState<String | null>(null);
    const navigate = useNavigate();
    const [showPopup_12, togglePopup_12] = useToggle();
    const [addnewHallFlag, setAddnewHallFlag] = useState(false);

    const fetchHPs = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager[]>('http://localhost:15000/getPhysicalEventHallsForEventManager');
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

    const handleClick = (hallId: string) => {
        navigate(`/EM_ViewAllPhysicalEventsOfHall/${hallId}`);
    }
 
    const handleAddNewPhysicalEventHall = () => {
        setAddnewHallFlag(true);
        togglePopup_12();
      };

  return (
    <div>
        <EM_Sidebar activeMenuItem={["EventHalls"]}/>
        <h4 style={{marginTop: '80px', marginLeft: '280px'}}>Physical Event Halls</h4>
        <a onClick={handleAddNewPhysicalEventHall} className="btn btn-success HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{marginTop: '-40px', marginLeft :'1260px'}}>
                    <i className="bi bi-plus-lg"></i> New Physical Event Hall
        </a>
        <div className="cardHang" style={{marginTop: '25px'}}>
            {HP_list.length > 0 ? (
                HP_list.map((OnrRoom) => {
                    return(
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={OnrRoom.hall_id}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Hall Id: </span>{OnrRoom.hall_id}</h5>
                            {OnrRoom.hall_type == 'Lecture' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Hall Type: </span>Lecture Room (Table and Chairs)</h5> : ''}
                            {OnrRoom.hall_type == 'Therapy' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Hall Type: </span>Therapy Room (Therapy Beds)</h5> : ''}
                            {OnrRoom.hall_type == 'Free Space' ? <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Hall Type: </span>Free Space Room (Yoga Mats)</h5> : ''}
                            <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Hourly Charge: </span>Rs.{OnrRoom.charge}/=</h5>
                            <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleClick(OnrRoom.hall_id)}}>
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
        {addnewHallFlag && <EM_AddNewPhysicalEventHall show_12={showPopup_12} handleClose_12={togglePopup_12} setAddnewHallFlag={setAddnewHallFlag}/>}
    </div>
  );
};

export default EM_ViewAllPhysicalEventHalls;