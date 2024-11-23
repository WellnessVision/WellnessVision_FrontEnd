import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin_Sidebar from './Admin_components/Admin_Sidebar';
import "../EventManager/EM_ViewHealthProfessionals.css";
import { useNavigate } from 'react-router-dom';


interface HP_CardforEventManager{
    volunteerId: number;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    district: string;
    province:string;
    zip: string;
    email:string;
    phoneNumber: string;
    profilePicture: string;
    password: string;
    experiences: string;
    previousWorksPdf: string;
    requestTime: string;
    acceptTime: string;
}

const Admin_ViewAllVolunteers: React.FC = () => {
    const [HP_list , setHP_list] = useState<HP_CardforEventManager[]>([]);
    const [error , setError] = useState<String | null>(null);
    const navigate = useNavigate();

    const fetchHPs = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager[]>('http://localhost:15000/adminViewAllVolunteersForAdmin');
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

    const handleClick = (volunteerId: Number) => {
        localStorage.setItem("volunteerId", String(volunteerId))
        navigate(`/Admin_ViewOneVolunteer/${volunteerId}`);
    }

  return (
    <div>
        <Admin_Sidebar activeMenuItem={["Volunteer", "AllUsers"]}/>
        <h4 style={{marginTop: '80px', marginLeft: '280px'}}>Volunteers</h4>
        <div className="cardHang" style={{marginTop: '25px'}}>
            {HP_list.length > 0 ? (
                HP_list.map((hp) => {
                    return(
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={hp.volunteerId}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={hp.profilePicture} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="event image" />
                            
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>VolunteerId: </span>{hp.volunteerId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Name: </span>{hp.firstName} {hp.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Email: </span>{hp.email}</h5>
                                <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleClick(hp.volunteerId)}}>
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
    </div>
  );
};

export default Admin_ViewAllVolunteers;