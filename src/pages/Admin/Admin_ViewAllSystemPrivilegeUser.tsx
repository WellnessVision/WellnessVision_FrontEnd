import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import axios from 'axios';
import Admin_Sidebar from './Admin_components/Admin_Sidebar';
import "../EventManager/EM_ViewHealthProfessionals.css";
import { useNavigate } from 'react-router-dom';
import Admin_AddNewAdminPrivilegeUser from './Admin_AddNewAdminPrivilegeUser';
import { useToggle } from '../../pages/HP/useToggle';


interface HP_CardforEventManager{
        id: number;
        admin_type: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        profilePic: string;
        address: string;
        address2: string;
        city: string;
        district: string;
        province: string;
        zip: string;
}

const suggestionsList: string[] = [
    "SA",
    "EM",
    "AM"
  ];

const Admin_ViewAllSystemPrivilegeUser: React.FC = () => {
    const [HP_list , setHP_list] = useState<HP_CardforEventManager[]>([]);
    const [error , setError] = useState<String | null>(null);
    const navigate = useNavigate();
    const [searchNameCode, setSearchNameCode] = useState('');
    const [searchTypeCode, setSearchTypeCode] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const fetchHPs = useCallback(async () => {
        try {
            const response = await axios.get<HP_CardforEventManager[]>(`http://localhost:15000/adminViewAllSystemPrivilegeUserForAdmin`, {
                params: { searchNameCode, searchTypeCode }
              });
            setHP_list(response.data);
        }
        catch(err){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    }, [searchNameCode, searchTypeCode]);

    useEffect(() => {
        fetchHPs();
      }, [fetchHPs]);

    const handleClick = (systemPrivilegeUserId: Number) => {
        localStorage.setItem("systemPrivilegeUserId", String(systemPrivilegeUserId))
        navigate(`/Admin_ViewOneSystemPrivilegeUser/${systemPrivilegeUserId}`);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchNameCode(e.target.value);
      };

    const handleSearchChange_2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchTypeCode(e.target.value);
      };

    const handleAddnewAdminUserFlag = () => {
        navigate('/Admin_AddNewAdminPrivilegeUser');
      };
      

  return (
    <div>
        <Admin_Sidebar activeMenuItem={["SystemPrivilegeUser", "AllUsers"]}/>
        <h4 style={{marginTop: '80px', marginLeft: '280px'}}>Admin Privilege User</h4>
        <a onClick={handleAddnewAdminUserFlag} className="btn btn-success HP_ViewAllAppointmentSchedule_addNewAppointmentScheduleButton" style={{marginTop: '-40px', marginLeft :'1265px'}}>
           <i className="bi bi-person-add"></i> New Admin Privilege User
        </a>
        <form className="d-flex search NU_ViewUpcomingPhysicalEvents_search" role="search" style={{marginTop: '-40px', zIndex: '0', marginLeft: '900px'}}>
             <input 
                 style={{width: '250px'}}
                 className="form-control me-2 Volunteer_UpcomingPhysicalEventsForVolunteering_searchByEventName" 
                 type="search" 
                 placeholder="Search By Name" 
                 aria-label="Search"
                 value={searchNameCode}
                 onChange={handleSearchChange}/>
              <button className="btn btn-outline-success" type="submit" disabled>Search</button>
              <select
                style={{width: '150px', marginLeft: '20px'}}
                className="form-control"
                value={searchTypeCode}
                required
                onChange={handleSearchChange_2}>
                <option value="">All</option>
                <option value="SA">SA</option>
                <option value="EM">EM</option>
                <option value="AM">AM</option>
            </select>
            <button className="btn btn-outline-success" type="submit" disabled style={{marginLeft: '10px'}}>Search</button> 
            </form>
        <div className="cardHang" style={{marginTop: '25px'}}>
            {HP_list.length > 0 ? (
                HP_list.map((hp) => {
                    return(
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={hp.id}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={hp.profilePic} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="event image" />
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Id: </span>{hp.id}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Type: </span>{hp.admin_type}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Name: </span>{hp.firstName} {hp.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name"><span style={{color: '#848884'}}>Email: </span>
                                {hp.email.length > 25
                                    ? `${hp.email.substring(0, 25)}...`
                                    : hp.email}</h5>
                                <a className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore EM_ViewHpButton" onClick={() =>{handleClick(hp.id)}}>
                                <i className="bi bi-eye"></i> View Details</a>
                            </div>
                        </div>
                    )
                })
            )
            :(
                <p style={{marginLeft: '150px'}}>No search results found</p>
            )}
        </div>
    </div>
  );
};

export default Admin_ViewAllSystemPrivilegeUser;