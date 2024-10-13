import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EM_Sidebar from './EM_components/EM_Sidebar';
import { useNavigate } from 'react-router-dom';
import ChatComponent from './EM_components/ChatComponent';

interface HP_CardforEventManager {
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
    phoneNumber: string;
    ownership: string;
}

interface ChatItem {
  text: string,
  sender: string
}

interface ChatComponentRef {
  getChat: () => ChatItem[];
  appendFormData: (chatData: ChatItem[]) => FormData;
}


const EM_ViewOneHealthProfessional: React.FC = () => {
    const [hpDetails, setHpDetails] = useState<HP_CardforEventManager | null>(null);
    const [contactPopup, setContactPopup] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const HP_Id = localStorage.getItem("hpid");
    const navigate = useNavigate();
    
    sessionStorage.setItem('roll', 'EM');
    sessionStorage.setItem('hpid', HP_Id || "0");

    const fetchHPdetails = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager>('http://localhost:15000/viewOneHealthProfessionalForEM?', 
                { params: { hpId: HP_Id } }
            );
            setHpDetails(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        fetchHPdetails();
    }, []);

    const handleClick = () => {
        const hp_name = hpDetails ? hpDetails.firstName : "health professional";
        localStorage.setItem("hp_name", hp_name);
        navigate(`/EM_ViewOneHPEvents`);
    };

    const handleContact = () => {
        setContactPopup(true);
    };

    const handleCloseContact = async () => {
        setContactPopup(false);
      
    };

    return (
        <div>
            <EM_Sidebar activeMenuItem={["HealthProfessionals"]} />
            <div className="card mb-3" style={{ maxWidth: '1000px', top: '102px', left: '320px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <a href={hpDetails?.profilePicture}>
                            <img src={hpDetails?.profilePicture} className="img-fluid rounded-start" alt="Card image" />
                        </a>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{hpDetails?.firstName} {hpDetails?.lastName}</h5>
                            <p className="card-text detail"><i className='bi bi-award-fill'></i> {hpDetails?.healthProfessionalId} (Health Professional ID)</p>
                            <p className="card-text detail"><i className='bi bi-soundwave'></i> {hpDetails?.profession} (Profession)</p>
                            <p className="card-text detail"><i className='bi bi-award-fill'></i> {hpDetails?.email} (Email)</p>
                            <p className="card-text detail"><i className='bi bi-soundwave'></i> {hpDetails?.phoneNumber} (Contact Number)</p>
                            <p className="card-text detail"><i className='bi bi-soundwave'></i> {hpDetails?.organization} (Registered organization)</p>
                            <p className="card-text detail"><i className='bi bi-soundwave'></i> {hpDetails?.regNo} (Registration Number)</p>
                            <p className="card-text detail"><i className='bi bi-soundwave'></i> {hpDetails?.ownership} (Ownership of organization)</p>
                            {hpDetails?.address2 === '' ? (
                                <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {hpDetails?.address}, {hpDetails?.city}, {hpDetails?.district}, {hpDetails?.province} (Address)</p>
                            ) : (
                                <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> {hpDetails?.address}, {hpDetails?.address2}, {hpDetails?.city}, {hpDetails?.district}, {hpDetails?.province} (Address)</p>
                            )}
                            <p className="card-text detail"><small className="text-body-secondary">Health Professional in WellnessVision</small></p>
                            <button className="btn btn-success" onClick={handleContact}><i className='bi bi-chat-left-dots'></i> Contact {hpDetails?.firstName} {hpDetails?.lastName}</button>
                            <a onClick={() => { handleClick() }} className="btn btn-warning book_button EM_openDropDownManageEvents">Manage Events</a>

                            {contactPopup &&
                                <div>
                                    <div className={`card ${contactPopup ? 'showPopup_EM_contactHP' : 'closePopup_EM_contactHP'}`}>
                                        <div className="card-header showPopupcard-header_EM_contactHP">
                                            <h6>Contact {hpDetails?.firstName} {hpDetails?.lastName}</h6>
                                            <button type="button" className="btn-close" onClick={handleCloseContact}></button>
                                        </div>
                                        <div className="card-body">
                                            <ChatComponent/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EM_ViewOneHealthProfessional;
