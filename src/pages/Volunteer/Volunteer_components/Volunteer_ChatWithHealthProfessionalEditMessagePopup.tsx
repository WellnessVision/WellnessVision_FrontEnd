import React, { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import HPSideBar from '../../../components/HP_SideBar';
import '../../HP/HP_OneEvent.css';
import yoga01 from '../../../resources/yoga01.png'
import { useParams } from 'react-router-dom';
import NU_Sidebar from '../../NormalUser/NU_components/NU_Sidebar'
import axios from 'axios';
import NU_DeletePhysicalEventBookingProps from '../../NormalUser/NU_components/NU_DeletePhysicalEventBooking';
import { useToggle } from '../../../pages/HP/useToggle';
import NU_ViewModifyMoneyReceiptsDetails from '../../NormalUser/NU_components/NU_ViewModifyMoneyReceiptsDetails'
import { useNavigate } from 'react-router-dom';
import loading_gif from '../../../resources/prosecing.gif'
import ParticipationDetailsPic from '../../../resources/ParticipationDetailsPic.jpg'
import HP_EventBookingCloseProps from '../../../components/HP_EventBookingClose';
import HP_ViewBookingParticipationDetailsProps from '../../../components/HP_ViewBookingParticipationDetails';
import '../../NormalUser/NU_ViewOneUpcomingPhysicalEvent.css'
import UserPhysicalEventBookingPaymentSlipProps from '../../NormalUser/NU_components/UserPhysicalEventBookingPaymentSlip'
import '../../NormalUser/NU_ViewOneBookedUpcomingphysicalEvents.css'
import Volunteer_Sidebar from '../Volunteer_components/Volunteer_Sidebar';
import '../Volunteer_ViewOneUpcomingVolunteerEvents.css'
import { Badge } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Volunteer_ChatWithHealthProfessional.css'
import garbageImage from '../../../resources/yoga01.png'
import './Volunteer_ChatWithHealthProfessionalReplyPopup.css'
import './Volunteer_ChatWithHealthProfessionalEditMessagePopup.css'
import { parseISO, format } from 'date-fns';

interface Message {
  messageId: number;
  eventId: number;
  volunteerId: number;
  sender: string;
  readingState: string;
  messageFlag: string;
  message: string;
  attachmentFlag: string;
  attachment: string;
  replyFlag: string;
  replyMessage: string;
  replyMessageAttachmentFlag: string;
  messageTime: string;
  editFlag: string;
}

 const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  
const formatRequestTime = (time: string): string => {
    const parsedDate = parseISO(time);
    return format(parsedDate, 'MMMM dd, yyyy hh:mm:ss a');
};

  const Volunteer_ChatWithHealthProfessionalEditMessagePopup: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();
  const [showPopup_2, togglePopup_2] = useToggle();
  const [showPopup_3, togglePopup_3] = useToggle();
  const { eventId } = useParams<{ eventId: string }>();
  localStorage.setItem('eventId', String(eventId));
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showLoadingPopup, toggleLoadingPopup] = useState(false);
  const VolunteerId = localStorage.getItem('volunteerId');
  const VolunteerEmail = localStorage.getItem('volunteerEmail');
  const [checkBookingStateValue, setCheckBookingStateValue] = useState('');
  const [deleteState, setDeleteState] = useState(false);
  const [count, setCount] = useState<number>(2);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [baseAttachment, setBaseAttachment] = useState<File | null>(null);
  const [messageFlag, setMessageFlag] = useState('No');
  const [attachmentFlag, setAttachmentFlag] = useState('No');
  const [replyFlag, setReplyFlag] = useState('No');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyMessageAttachmentFlag, setreplyMessageAttachmentFlag] = useState('No');
  const [imageCloseState, setImageCloseState] = useState(false);
  const [newReplyMessageFlag, setNewReplyMessageFlag] = useState('');
  const [newReplyMessage, setNewReplyMessage] = useState('');
  const [newReplyAttachmentFlag, setNewReplyAttachmentFlag] = useState('');
  const [newReplyAttachment, setNewReplyAttachment] = useState('');
  const { replyMessageId } = useParams<{ replyMessageId: string }>();
  const [editMessageUpdateState, setEditMessageUpdateState] = useState(false);


const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachment(e.target.files[0]);
      setAttachmentFlag('Yes');
      setImageCloseState(true);
    }
  };

  const handleNewMessage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setNewMessage(e.target.value);
      setMessageFlag('Yes');
    }
    if (e.target.value === '') {
      setNewMessage('');
      setMessageFlag('No');
    }
  };  

const handleDeleteEventBooking = () => {
  setDeleteState(true);
  togglePopup_3();
};

const setPreviousMessage = () => {
    if(!editMessageUpdateState){
        setNewMessage(messages[0].message);
        setEditMessageUpdateState(true);
    }
};

useEffect(() => {
  fetch(garbageImage)
    .then((response) => response.blob())
    .then((blob) => {
      const file = new File([blob], 'defaultImage.png', { type: blob.type });
      setBaseAttachment(file); 
    });
}, []);


useEffect(() => {
    const fetchTheChat = async () => {
      try {
        const response = await axios.get<Message[]>(`http://localhost:15000/getOneChatBoxMessageForVolunteerAndPhysicalEventsForVolunteer?`,{
            params: { replyMessageId }
        });
        setMessages(response.data);
        setPreviousMessage();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchTheChat();
  }, [ VolunteerId, eventId, setMessages, setError, setPreviousMessage]);


//   const fetchTheChatAfterNewChat = useCallback(async () => {
//     try {
//       const response = await axios.get<Message[]>(`http://localhost:15000/getChatBoxForVolunteerAndPhysicalEventsForVolunteer?`,{
//           params: { VolunteerId , eventId }
//       });
//       setMessages(response.data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }

// }, [ VolunteerId, eventId, setMessages, setError]);

// const selectReplyMessage = useCallback(async (newReplyMessage: string, newReplyMessageFlag: string, newReplyAttachment: string, newReplyAttachmentFlag: string) => {
  
//     if(newMessage != '' || attachment){
//       try {
//         const formData = new FormData();
//         formData.append('VolunteerId', String(VolunteerId));
//         formData.append('userEmail', String(VolunteerEmail));
//         formData.append('eventId', String(eventId));
//         formData.append('sender', "V");
//         formData.append('messageFlag', messageFlag);
//         formData.append('message', newMessage);
//         formData.append('attachmentFlag', attachmentFlag);
//         { attachment ? formData.append('attachment', attachment) : ( baseAttachment ? formData.append('attachment', baseAttachment) : '')}
//         formData.append('replyFlag', "Yes");
//         {newReplyMessageFlag === 'Yes' ?    formData.append('replyMessage', newReplyMessage) : (newReplyAttachmentFlag === 'Yes') ?   formData.append('replyMessage', newReplyAttachment) : ''}
//         {newReplyMessageFlag === 'Yes' ?   formData.append('replyMessageAttachmentFlag', 'No') : (newReplyAttachmentFlag === 'Yes') ? formData.append('replyMessageAttachmentFlag', 'Yes') : ''}

//         await axios.post('http://localhost:15000/newVolunteerMessageToHpPhysicalEventsForVolunteer', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         fetchTheChatAfterNewChat();
//         setNewMessage('');
//         setMessageFlag('No');
//         setAttachment(null);
//         setAttachmentFlag('No');
//       } 
//       catch (error) {
//         alert("Error registering event");
//       }
//     }

//   }, [newMessage, attachment, baseAttachment, replyFlag, replyMessage, replyMessageAttachmentFlag, VolunteerId, VolunteerEmail, eventId, messageFlag, attachmentFlag, fetchTheChatAfterNewChat]);




  const handleOrderPhysicalEvent = async (event: FormEvent) => {
    event.preventDefault();
    if(newMessage != ''){
        try {
            navigate('/HP_LodingPage');
            toggleLoadingPopup(true);
            await axios.put(`http://localhost:15000/updateChatBoxMessageForVolunteerAndPhysicalEventsForVolunteer`, null, {
              params: { replyMessageId, newMessage }
            });
            navigate(`/Volunteer_ChatWithHealthProfessional/${eventId}`);
          } catch (error) {
            alert("Error registering event");
          }
    }
};


//  if (error) {
//     return <div style={{ color: 'red' }}>{error}</div>;
//   }

//   if (!event || !oneHpDetails || !participants) {
//     return <div>
//         <Volunteer_Sidebar activeMenuItem={["VolunteerUpcomingEvents", "VolunteerEvent"]}/>
//         <img src={loading_gif} alt="" className='NU_ViewOneBookedUpcomingphysicalEvents_loading_gif' /></div>;
//   }

  return (
      <div>
        <Volunteer_Sidebar activeMenuItem={["VolunteerUpcomingEvents", "VolunteerEvent"]}/>
        {messages.length > 0 ? (
            messages.map(message => (
              <div className={`cardHang_2 ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_sepatateBySender_Volunteer' : 'Volunteer_ChatWithHealthProfessional_sepatateBySender_Hp'}`}>
                {message.replyFlag === "No" ? (<div style={{zIndex: '0'}}>
                  {message.attachmentFlag === "Yes" && message.messageFlag === "Yes" ? (
                <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv' style={{zIndex: '3'}}>
                <a href={message.attachment}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment' src={message.attachment} alt="attachment"/></a>
                  <p className='Volunteer_ChatWithHealthProfessional_messageContent'>{message.message}</p>
                  <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
                   {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
                </div>
              ) : <div style={{zIndex: '0'}}>
              {message.attachmentFlag === "No" && message.messageFlag === "Yes" ? (
              <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv'>
                <p className='Volunteer_ChatWithHealthProfessional_messageContent Volunteer_ChatWithHealthProfessional_messageContent_2'>{message.message}</p>
                <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
                 {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
              </div>
            ) : <div>
            {message.attachmentFlag === "Yes" && message.messageFlag === "No" ? (
            <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv Volunteer_ChatWithHealthProfessional_messageWithAttachmentDivOnlyImage'>
             <a href={message.attachment}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_messageAttachment_3' src={message.attachment} alt="attachment"/></a>
             <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_2_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_2'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
              {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
            </div>
          ) : ''}
          </div>}
            </div>}
                </div>) : (
                  //Reply
                  <div style={{zIndex: '0'}}>
                    {message.replyMessageAttachmentFlag === "No" ? (<div style={{zIndex: '0'}}>
                      {message.attachmentFlag === "Yes" && message.messageFlag === "Yes" ? (
                <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv' style={{zIndex: '3'}}>
                <div className='Volunteer_ChatWithHealthProfessional_replyMessageDiv Volunteer_ChatWithHealthProfessional_replyMessageDiv_4'>
                <p className='Volunteer_ChatWithHealthProfessional_messageContent'>Reply to: {message.replyMessage}</p></div>
                <a href={message.attachment}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment' src={message.attachment} alt="attachment"/></a>
                  <p className='Volunteer_ChatWithHealthProfessional_messageContent'>{message.message}</p>
                  <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
                   {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
                </div>
              ) : <div style={{zIndex: '0'}}>
              {message.attachmentFlag === "No" && message.messageFlag === "Yes" ? (
              <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv'>
                <div className='Volunteer_ChatWithHealthProfessional_replyMessageDiv Volunteer_ChatWithHealthProfessional_replyMessageDiv_5'>
                <p className='Volunteer_ChatWithHealthProfessional_messageContent'>Reply to: {message.replyMessage}</p></div>
                <p className='Volunteer_ChatWithHealthProfessional_messageContent'>{message.message}</p>
                <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
                 {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
              </div>
            ) : <div style={{zIndex: '0'}}>
            {message.attachmentFlag === "Yes" && message.messageFlag === "No" ? (
            <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv Volunteer_ChatWithHealthProfessional_messageWithAttachmentDivOnlyImage'>
              <div className='Volunteer_ChatWithHealthProfessional_replyMessageDiv Volunteer_ChatWithHealthProfessional_replyMessageDiv_6'>
              <p className='Volunteer_ChatWithHealthProfessional_messageContent'>Reply to: {message.replyMessage}</p></div>
             <a href={message.attachment}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_messageAttachment_replayOnlyImage' src={message.attachment} alt="attachment"/></a>
             <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_2_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_2'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
              {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
            </div>
          ) : ''}
          </div>}
            </div>}
                    </div>) : 
                    (<div style={{zIndex: '0'}}>
                      {message.attachmentFlag === "Yes" && message.messageFlag === "Yes" ? (
                <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv'>
                <div className='Volunteer_ChatWithHealthProfessional_replyMessageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDiv_7'>
                <p>Reply to:</p>
                <a href={message.replyMessage}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImage' src={message.replyMessage} alt="attachment"/></a></div>
                <a href={message.attachment}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment' src={message.attachment} alt="attachment"/></a>
                  <p className='Volunteer_ChatWithHealthProfessional_messageContent'>{message.message}</p>
                  <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
                   {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
                </div>
              ) : <div style={{zIndex: '0'}}>
              {message.attachmentFlag === "No" && message.messageFlag === "Yes" ? (
              <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv' style={{zIndex: '3'}}>
                <div className='Volunteer_ChatWithHealthProfessional_replyMessageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDiv_8'>
                <p>Reply to:</p>
                <a href={message.replyMessage}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImage' src={message.replyMessage} alt="attachment"/></a></div>
                <p className='Volunteer_ChatWithHealthProfessional_messageContent'>{message.message}</p>
                <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
                 {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
              </div>
            ) : <div style={{zIndex: '0'}}>
            {message.attachmentFlag === "Yes" && message.messageFlag === "No" ? (
            <div className='Volunteer_ChatWithHealthProfessional_messageWithAttachmentDiv Volunteer_ChatWithHealthProfessional_messageWithAttachmentDivOnlyImage' style={{zIndex: '3'}}>
               <div className='Volunteer_ChatWithHealthProfessional_replyMessageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDivOnlyImageDiv Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDivOnlyImageDiv_9'>
                <p>Reply to:</p>
                <a href={message.replyMessage}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImage Volunteer_ChatWithHealthProfessional_replymessageAttachment_replyToImageDivOnlyImage' src={message.replyMessage} alt="attachment"/></a></div>
             <a href={message.attachment}><img className='Volunteer_ChatWithHealthProfessional_messageAttachment Volunteer_ChatWithHealthProfessional_messageAttachment_replayOnlyImage' src={message.attachment} alt="attachment"/></a>
             <p className={`Volunteer_ChatWithHealthProfessional_messageContent ${message.sender === 'V' ? 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_2_forVolunteer' : 'Volunteer_ChatWithHealthProfessional_messageDateAndTime_2'}`}>{formatRequestTime(message.messageTime)}{message.sender === 'V' ? (<span className='Volunteer_ChatWithHealthProfessional_seenMessageTick'> {message.readingState === "Seen" ? <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_seen"></i> : <i className="bi bi-check-all Volunteer_ChatWithHealthProfessional_seenMessageTick_unseen"></i>}</span>) : ''}</p>
              {message.editFlag === "Yes" && message.sender === 'V' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '165px', position: 'absolute'}}>Edited</p> : ''}
                 {message.editFlag === "Yes" && message.sender === 'HP' ?  <p className='Volunteer_ChatWithHealthProfessional_messageContent' style={{marginTop: '-40px', marginLeft: '195px', position: 'absolute'}}>Edited</p> : ''}
            </div>
          ) : ''}
          </div>}
            </div>}
                    </div>)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No messages available</p>
          )}

        <div className="cardHang_2 Volunteer_ChatWithHealthProfessional_chatFild" style={{zIndex: '0'}}>
         <div className='Volunteer_ChatWithHealthProfessional_back Volunteer_ChatWithHealthProfessionalEditMessagePopup__backEditSection' style={{zIndex: '0'}}></div>
         <form style={{zIndex: '0'}} onSubmit={handleOrderPhysicalEvent}>
          <input className='Volunteer_ChatWithHealthProfessional_textInput'
          type="text"
          placeholder="Enter your message..."
          required
          value={newMessage}
          onChange={handleNewMessage}
          />
          {/* <button type='button' 
          hidden={!attachment}
          className="btn btn-success Volunteer_ChatWithHealthProfessional_closeImage" onClick={handleImageCloseState}>Close Image</button>
           <input
            type="file" 
            className="Volunteer_ChatWithHealthProfessional_attachment" 
            id="exampleFormControlFile1" 
            onChange={handleFileChange}
            />
          <button type='button' 
          hidden={!!attachment}
          className="btn btn-light Volunteer_ChatWithHealthProfessional_selectImage" onClick={handleImageCloseState}>No Chosen</button> */}
            <button 
            type="submit" 
            className="btn btn-success Volunteer_ChatWithHealthProfessional_sendButton Volunteer_ChatWithHealthProfessionalEditMessagePopup___sendButtonEditSection" 
            ><span className='Volunteer_ChatWithHealthProfessional_sendButtonIconSettings'><i className="bi bi-send-fill"></i></span></button>
         </form>
          </div>
          <img className={`${showLoadingPopup ? 'showLoading Volunteer_ChatWithHealthProfessional_loadingGif' : 'HP_Register_loading_gif_notShow'}`} src={loading_gif}/>
          </div>
    );
}

export default Volunteer_ChatWithHealthProfessionalEditMessagePopup;
