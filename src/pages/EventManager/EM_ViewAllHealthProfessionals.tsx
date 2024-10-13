import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EM_Sidebar from './EM_components/EM_Sidebar';
import "./EM_ViewHealthProfessionals.css";
import { useNavigate } from 'react-router-dom';


interface HP_CardforEventManager{
    healthProfessionalId: number;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    district: string;
    province: string;
    zip: string;
    email: string;
    profilePicture: string;
    password: string;
    profession: string;
    organization: string;
    regNo: string;
}

const EM_ViewAllHealthProfessionals: React.FC = () => {
    const [HP_list , setHP_list] = useState<HP_CardforEventManager[]>([]);
    const [error , setError] = useState<String | null>(null);
    const navigate = useNavigate();

    const fetchHPs = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager[]>('http://localhost:15000/getAllHealthProfessionals');
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

    const handleClick = (hp_id: Number) => {
        localStorage.setItem("hpid", String(hp_id))
        navigate(`/EM_ViewOneHealthProfessional/${hp_id}`);
    }

  return (
    <div>
        <EM_Sidebar activeMenuItem={["HealthProfessionals"]}/>
        <div className="cardHang">
            <h4>Health Professionals</h4>
            {HP_list.length > 0 ? (
                HP_list.map((hp) => {
                    return(
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={hp.healthProfessionalId}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={hp.profilePicture} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="event image" />
                            
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>HpId: </span>{hp.healthProfessionalId}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Name: </span>{hp.firstName} {hp.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Profession: </span>
                                {hp.profession.length > 30
                                    ? `${hp.profession.substring(0, 20)}...`
                                    : hp.profession}</h5>
                                <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleClick(hp.healthProfessionalId)}}>
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

export default EM_ViewAllHealthProfessionals;