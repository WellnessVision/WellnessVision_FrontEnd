import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface ChatItem {
    text: string,
    sender: string
}

interface PrevChatItem {
    message: string,
    msg_sender: string
}

const ChatComponent : React.FC = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<ChatItem[]>([]);
    const [preChat, setPreChat] = useState<ChatItem[]>([]);
    const socketRef = useRef<WebSocket | null>(null);
    const [error, setError] = useState<string | null>(null);
    const HP_Id = sessionStorage.getItem("hpid") || "0";
    const roll = sessionStorage.getItem("roll") || "unidentified";

    const appendFormData = (chatData: ChatItem[]): FormData => {
        const formData = new FormData();
        if (HP_Id) {
            formData.append("hpId", HP_Id);
        }
        formData.append("chatPayload", JSON.stringify(chatData));
        return formData;
    };

  
    const fetchPrevChat = async () => {
        try {
            const response = await axios.get<PrevChatItem[]>("http://localhost:15000/getPrevChatWithEMAndHP", {
                params: { hpId: HP_Id }
            });

           
            const previousChat: ChatItem[] = response.data.map(item => ({
                text: item.message, 
                sender: (item.msg_sender === 'EM' && sessionStorage.getItem("roll") === "EM") || (item.msg_sender === 'HP' && sessionStorage.getItem("roll") === "HP") ? 'You' : 'other'
            }));

           
            setPreChat(previousChat);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    
    useEffect(() => {
        fetchPrevChat();
    }, []);

  
    useEffect(() => {
        socketRef.current = new WebSocket("ws://localhost:15000/chat");

        socketRef.current.onopen = () => {
            console.log("Connected to the WebSocket server");
        };

        socketRef.current.onmessage = (event) => {
            setChat((prevChat) => [...prevChat, { sender: "other", text: event.data }]);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error: ", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

  
    const handleSendMessage = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);

            const saveMsgInDatabase = async () => {
                const formData = appendFormData([{ sender: roll, text: message }]);
                try {
                    await axios.post('http://localhost:15000/EMSaveChatWithHP', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log('Chat saved successfully');
                } catch (err) {
                    console.error('Error saving chat', err);
                }
            
            };

            saveMsgInDatabase();

            setChat((prevChat) => [...prevChat, { sender: "You", text: message }]);
            setMessage("");
        }
    };

    return (
        <div>
            <div className='previousChats_EM'>
                {preChat.map((msg, index) => (
                    <div key={index}>
                        {msg.sender === "You" ? (
                            <div className="sentbyYou">{msg.text}</div>
                        ) : (
                            <div className="sentbyOther">{msg.text}</div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                {chat.map((msg, index) => (
                    <div key={index}>
                        {msg.sender === "You" ? (
                            <div className="sentbyYou">{msg.text}</div>
                        ) : (
                            <div className="sentbyOther">{msg.text}</div>
                        )}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
