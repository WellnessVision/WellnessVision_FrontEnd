import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin_Sidebar from './Admin_components/Admin_Sidebar';
import { useNavigate } from 'react-router-dom';
import ChatComponent from '../EventManager/EM_components/ChatComponent';
import { useParams } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

interface HP_CardforEventManager {
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

interface ChatItem {
  text: string,
  sender: string
}

interface ChatComponentRef {
  getChat: () => ChatItem[];
  appendFormData: (chatData: ChatItem[]) => FormData;
}


const Admin_ViewOneSystemPrivilegeUser: React.FC = () => {
    const [hpDetails, setHpDetails] = useState<HP_CardforEventManager | null>(null);
    const [contactPopup, setContactPopup] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { systemPrivilegeUserId } = useParams<{ systemPrivilegeUserId: string }>();
    const navigate = useNavigate();
    
 
const fetchHPdetails = async () => {
        try {
            const response = await axios.get<HP_CardforEventManager>('http://localhost:15000/adminViewOneSystemPrivilegeUserForAdmin?', 
                { params: { systemPrivilegeUserId } }
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
        navigate(`/Admin_ViewAllSystemPrivilegeUser`);
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
            <Admin_Sidebar activeMenuItem={["SystemPrivilegeUser", "AllUsers"]}/>
            <div className="card mb-3" style={{ maxWidth: '1000px', top: '150px', left: '380px', padding: '25px 0 25px 0' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <a href={hpDetails?.profilePic}>
                            <img src={hpDetails?.profilePic} className="img-fluid"  style={{borderRadius: '50%', width: '300px', marginLeft: '20px', marginTop: '10px'}} alt="Card image" />
                        </a>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title" style={{fontSize: '22px'}}>{hpDetails?.firstName} {hpDetails?.lastName}</h5>
                            <p className="card-text detail" style={{fontSize: '17px', marginTop: '10px'}}><i className='bi bi-award-fill'></i> {hpDetails?.id} (Admin Privilege User ID)</p>
                            <p className="card-text detail" style={{fontSize: '17px'}}><i className='bi bi-soundwave'></i> {hpDetails?.admin_type} (Admin Type)</p>
                            <p className="card-text detail" style={{fontSize: '17px'}}><i className='bi bi-award-fill'></i> {hpDetails?.email} (Email)</p>
                            <p className="card-text detail" style={{fontSize: '17px'}}><i className='bi bi-soundwave'></i> {hpDetails?.phone} (Contact Number)</p>
                            {hpDetails?.address2 === '' ? (
                                <p className="card-text detail" style={{fontSize: '17px'}}><i className='bi bi-calendar2-week-fill'></i> {hpDetails?.address}, {hpDetails?.city}, {hpDetails?.district}, {hpDetails?.province} (Address)</p>
                            ) : (
                                <p className="card-text detail" style={{fontSize: '17px'}}><i className='bi bi-calendar2-week-fill'></i> {hpDetails?.address}, {hpDetails?.address2}, {hpDetails?.city}, {hpDetails?.district}, {hpDetails?.province} (Address)</p>
                            )}
                            <button className="btn btn-primary" style={{width: '200px'}} onClick={handleGoBack}><i className="bi bi-arrow-left-circle"></i> Go Back </button>
                            <a onClick={() => { handleClick() }} className="btn btn-danger book_button EM_openDropDownManageEvents"><i className="bi bi-ban"></i> Block User</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_ViewOneSystemPrivilegeUser;
