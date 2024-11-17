import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin_Sidebar from './Admin_components/Admin_Sidebar';
import { useNavigate } from 'react-router-dom';
import ChatComponent from '../EventManager/EM_components/ChatComponent';
import { useParams } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

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
    certificateImage: string;
    otherVerificationPdf: string;
    requestTime: string;
    acceptTime: string;
}

interface ChatItem {
  text: string,
  sender: string
}

interface ChatComponentRef {
  getChat: () => ChatItem[];
  appendFormData: (chatData: ChatItem[]) => FormData;
}


const Admin_ViewOneHealthProfessional: React.FC = () => {
    const [hpDetails, setHpDetails] = useState<HP_CardforEventManager | null>(null);
    const [contactPopup, setContactPopup] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { hpId } = useParams<{ hpId: string }>();
    const navigate = useNavigate();
    
 
const fetchHPdetails = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager>('http://localhost:15000/viewOneHealthProfessionalForEM?', 
                { params: { hpId } }
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

    const handleGoBack = () => {
        navigate(`/Admin_ViewAllHealthProfessionals`);
    };

    const handleCloseContact = async () => {
        setContactPopup(false);
      
    };

    if (!hpDetails) {
        return <div>Loading...</div>;
    }

    const formatRequestTime = (time: string): string => {
        const parsedDate = parseISO(time);
        return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
    };

    return (
        <div>
            <Admin_Sidebar activeMenuItem={["HealthProfessional", "AllUsers"]}/>
            <div className="card mb-3" style={{ maxWidth: '1000px', top: '80px', left: '380px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <a href={hpDetails?.profilePicture}>
                            <img src={hpDetails?.profilePicture} className="img-fluid"  style={{borderRadius: '50%', width: '300px', marginLeft: '20px', marginTop: '120px'}} alt="Card image" />
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
                            <a href={hpDetails?.certificateImage} className="btn btn-outline-primary">Certificate Image</a> 
                            <a href={hpDetails?.otherVerificationPdf} className="btn btn-outline-primary" style={{marginLeft: '25px'}}>Other Verification Pdf</a>
                            <p className="card-text detail" style={{marginTop: '15px'}}><i className='bi bi-soundwave'></i> {formatRequestTime(hpDetails?.requestTime)} (Requested Time)</p>
                            <p className="card-text detail"><i className='bi bi-soundwave'></i> {formatRequestTime(hpDetails?.acceptTime)} (Accept Time)</p>
                            <p className="card-text detail"><small className="text-body-secondary">Health Professional in WellnessVision</small></p>
                            <button className="btn btn-primary" style={{width: '200px'}} onClick={handleGoBack}><i className="bi bi-arrow-left-circle"></i> Go Back </button>
                            <a onClick={() => { handleClick() }} className="btn btn-warning book_button EM_openDropDownManageEvents">Manage Events</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_ViewOneHealthProfessional;
