import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin_Sidebar from './Admin_components/Admin_Sidebar';
import "../EventManager/EM_ViewHealthProfessionals.css";
import { useNavigate } from 'react-router-dom';


interface HP_CardforEventManager{
    user_id: number;
    user_type: string;
    email: string;
    phone: string;
    district: string;
    city: string;
    address: string;
    address2: string;
    firstName: string;
    lastName: string;
    preferences: string;
    province: string;
    zip: null,
    password: string;
    profilePic: string;
}

const Admin_ViewAllUsers: React.FC = () => {
    const [HP_list , setHP_list] = useState<HP_CardforEventManager[]>([]);
    const [error , setError] = useState<String | null>(null);
    const navigate = useNavigate();

    const fetchHPs = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager[]>('http://localhost:15000/adminViewAllUsersForAdmin');
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

    const handleClick = (userId: Number) => {
        localStorage.setItem("userId", String(userId))
        navigate(`/Admin_ViewOneNormalUser/${userId}`);
    }

  return (
    <div>
        <Admin_Sidebar activeMenuItem={["NormalUser", "AllUsers"]}/>
        <h4 style={{marginTop: '80px', marginLeft: '280px'}}>Normal Users</h4>
        <div className="cardHang" style={{marginTop: '25px'}}>
            {HP_list.length > 0 ? (
                HP_list.map((hp) => {
                    return(
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={hp.user_id}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={hp.profilePic} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="event image" />
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>UserId: </span>{hp.user_id}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Name: </span>{hp.firstName} {hp.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Email: </span>{hp.email}</h5>
                                <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleClick(hp.user_id)}}>
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

export default Admin_ViewAllUsers;