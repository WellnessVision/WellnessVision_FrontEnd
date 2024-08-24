import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NU_Sidebar from './NU_components/NU_Sidebar';
import '../HP/HP_ViewEvents.css';
import '../Admin/Admin_ViewHealthProfessionalRegistrationRequest.css'
import { useToggle } from '../../pages/HP/useToggle';
import Admin_ViewOneHealthProfessionalRegistrationRequest from '../Admin/Admin_ViewOneHealthProfessionalRegistrationRequest';
import './NU_ViewHealthProfessionals.css'

interface HpDetails {
    healthProfessionalId: number;
    firstName: string
    lastName: string
    email: string
    profilePicture: string
    profession: string
}

const suggestionsList: string[] = [
    "Non-Communicable Diseases (Specialist)",
    "Non-Communicable Diseases",
    "Yoga Masters",
    "Consultant (Counselor)",
    "Book Fair"
  ];

const NU_ViewHealthProfessionals: React.FC = () => {
    const [events, setEvents] = useState<HpDetails[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPopup, togglePopup] = useToggle();
    const [selectedrequestId, setSelectedRequestId] = useState<number | null>(null);
    const [searchCode, setSearchCode] = useState('');
    const [searchCode_2, setSearchCode_2] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

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

    useEffect(() => {
        const fetchHpDetails = async () => {
          try {
            const response = await axios.get<HpDetails[]>(`http://localhost:15000/allHealthProfessionalDashboardProfileDetails?`,{
                params: {searchCode, searchCode_2}
            });
            setEvents(response.data);
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
          }
        };
      
        fetchHpDetails();
      }, [searchCode, searchCode_2]);

    const handleViewDetails = (requestId: number) => {
        navigate(`/NU_ViewOneHealthProfessional/${requestId}`);
      };

      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCode_2(e.target.value);
      };

      const handleSearchChange_2 = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSearchCode(input);

      if (input.length > 0) {
        const filteredSuggestions = suggestionsList.filter(suggestion =>
          suggestion.toLowerCase().includes(input.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion: string) => {
      setSearchCode(suggestion);
      setSuggestions([]);
    };

    return (
        <div>
            <NU_Sidebar activeMenuItem={["MakeAnAppointment", "MyAppointment"]}/>
            <form className="d-flex search NU_ViewUpcomingPhysicalEvents_search NU_ViewHealthProfessionals_suggestion" role="search">
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search By Profession" 
                aria-label="Search"
                value={searchCode}
                onChange={handleSearchChange_2}
            />
            <button className="btn btn-outline-success" type="submit" disabled>Search</button> 
            {suggestions.length > 0 && (
                <ul className="list-group position-absolute top-100 start-0 w-100 bg-white border">
                {suggestions.map((suggestion, index) => (
                    <li 
                    key={index} 
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick(suggestion)}
                    >
                    {suggestion}
                    </li>
                ))}
                </ul>
            )}
             <div className='NU_ViewHealthProfessionals_SearchByProffetion'>
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search By Name" 
                aria-label="Search"
                value={searchCode_2}
                onChange={handleSearchChange}
            /></div>
              <button className="btn btn-outline-success NU_ViewHealthProfessionals_SearchButton" type="submit" disabled>Search</button>
            </form>
            <div className="cardHang">
            <p className='Admin_ViewHealthProfessionalRegistrationRequest_hedder'>Health Professionals</p>
                {events.length > 0 ? (
                    events.map(event => (
                        <div className="card mb-3 particepationMarkCards" style={{ width: '100%' }} key={event.healthProfessionalId}>
                            <div className="card-body card-body participantDetailsFlexContainer Admin_ViewHealthProfessionalRegistrationRequestCardBody">
                            <img src={event.profilePicture} className="Admin_ViewHealthProfessionalRegistrationRequest_profilePic" alt="Event image" />
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{event.firstName} {event.lastName}</h5>
                                <h5 className="card-title Admin_ViewHealthProfessionalRegistrationRequest_name">{event.profession}</h5>
                                <a onClick={() => handleViewDetails(event.healthProfessionalId)} className="btn btn-primary Admin_ViewHealthProfessionalRegistrationRequest_viewMore NU_ViewHealthProfessionals_viewMore">
                                    <i className="bi bi-eye"></i> View Details
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Results Found</p>
                )}
            </div>
        </div>
    );
};

export default NU_ViewHealthProfessionals;
