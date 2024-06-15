import React from 'react';
import HPSideBar from '../../components/HP_SideBar';
import './NU_OneEvent.css';
import yoga01 from '../../resources/yoga01.png'

const NU_OneEvent: React.FC = () => {
    return (
        <div>
            <HPSideBar activeMenuItem="Events" />
            <div className='cardHang'>
            <div className="card" style={{ width: '95%' }}>
                <img src ={yoga01} className="image" alt="Card image" />
                <div className="card-body">
                <div className='base_details'>
                    <h5 className="card-title title">Maintain Body Correctly</h5>
                    <div className="straight-line"></div>
                    <p className="card-text detail"><i className='bi bi-bookmark-star-fill'></i> Awareness Lecture</p>
                    <p className="card-text detail physical"><i className='bi bi-soundwave'></i> Physical (In WellnessVision Premises)</p>
                    <p className="card-text detail"><i className='bi bi-calendar2-week-fill'></i> 2024/06/15</p>
                    <p className="card-text detail date"><i className='bi bi-alarm-fill'></i> 9.00 PM</p> 
                    <p className="card-text detail duration"><i className='bi bi-hourglass-split'></i> 2 hour duration</p> 
                    <p className="card-text detail price"><i className='bi bi-cash-stack'></i> Rs.1500/= (Per participant)</p> 
                    <p className="card-text detail seats"><i className='bi bi-person-workspace'></i> 1000 Seats</p> 
                    <p className="card-text detail booked"><i className='bi bi-bag-check-fill'></i> 540 Bookings</p> 
                    <p className="card-text detail language"><i className='bi bi-volume-up-fill'></i> Sinhala Language</p> 
                    </div>
                    <div>
                        <h5 className='description'>Description</h5>
                        <p>Join us for a rejuvenating yoga event designed to harmonize your mind, body, and spirit. Whether you're a beginner or an experienced yogi, our skilled instructors will guide you through a series of invigorating poses and calming breathing exercises. Experience the tranquility of nature as we practice outdoors, connecting deeply with ourselves and the environment. Come away feeling refreshed, balanced, and inspired. Don't miss this opportunity to enhance your well-being and meet like-minded individuals in a serene setting.</p>
                    </div>
                    <div className='button_div'>
                    <a href="HP_OneEvents" className="btn btn-primary back_button"><i className='bi bi-arrow-left-circle'></i> Back to Events</a>
                    <a href="HP_OneEvents" className="btn btn-success view_button"><i className='bi bi-eye'></i> Organizer's Details</a>
                    <a href="HP_OneEvents" className="btn btn-warning book_button"><i className='bi bi-bag-plus-fill'></i> <span className='book_buttonText'> Book a Seat</span></a>
                    </div>
                </div> 
                </div>
            </div>
        </div>
    );
}

export default NU_OneEvent;
