// HP_ViewEvents.tsx
import React from 'react';
import HPSideBar from '../../components/HP_SideBar';
import yoga01 from '../../resources/yoga01.png';
import './HP_ViewEvents.css';
import AddEvent from '../HP/HP_AddPhysicalEvent';
import HallAvailability from '../../components/HP_HallAvailability';
import { useToggle } from './useToggle'; // Adjust the path as needed

const HP_ViewEvents: React.FC = () => {
  const [showPopup, togglePopup] = useToggle();

  return (
    <div>
      <HPSideBar activeMenuItem="Events" />
      <div className={`blurBackground ${showPopup ? 'blur' : ''}`}>
        <h3 className="header">All Events</h3>
        <a
          onClick={togglePopup}
          className="btn btn-success add_physical"
        >
          <i className="bi bi-plus-lg"></i> New Physical Event
        </a>
        <a className="btn btn-success add_online">
          <i className="bi bi-plus-lg"></i> New Online Event
        </a>
        <div className="cardHang">
          <div className="card" style={{ width: '18rem' }}>
            <img src={yoga01} className="card-img-top" alt="Card image" />
            <div className="card-body">
              <h5 className="card-title title">Maintain Body Correctly</h5>
              <div className="straight-line"></div>
              <p className="card-text detail">
                <i className="bi bi-bookmark-star-fill"></i> Awareness Lecture
              </p>
              <p className="card-text detail">
                <i className="bi bi-soundwave"></i> Physical (In WellnessVision
                Premises)
              </p>
              <p className="card-text detail">
                <i className="bi bi-calendar2-week-fill"></i> 2024/06/15
              </p>
              <p className="card-text detail date">
                <i className="bi bi-alarm-fill"></i> 9.00 PM
              </p>
              <a href="HP_OneEvents" className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </a>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={yoga01} className="card-img-top" alt="Card image" />
            <div className="card-body">
              <h5 className="card-title title">Maintain Body Correctly</h5>
              <div className="straight-line"></div>
              <p className="card-text detail">
                <i className="bi bi-bookmark-star-fill"></i> Awareness Lecture
              </p>
              <p className="card-text detail">
                <i className="bi bi-soundwave"></i> Physical (In WellnessVision
                Premises)
              </p>
              <p className="card-text detail">
                <i className="bi bi-calendar2-week-fill"></i> 2024/06/15
              </p>
              <p className="card-text detail date">
                <i className="bi bi-alarm-fill"></i> 9.00 PM
              </p>
              <a href="HP_OneEvents" className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </a>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={yoga01} className="card-img-top" alt="Card image" />
            <div className="card-body">
              <h5 className="card-title title">Maintain Body Correctly</h5>
              <div className="straight-line"></div>
              <p className="card-text detail">
                <i className="bi bi-bookmark-star-fill"></i> Awareness Lecture
              </p>
              <p className="card-text detail">
                <i className="bi bi-soundwave"></i> Physical (In WellnessVision
                Premises)
              </p>
              <p className="card-text detail">
                <i className="bi bi-calendar2-week-fill"></i> 2024/06/15
              </p>
              <p className="card-text detail date">
                <i className="bi bi-alarm-fill"></i> 9.00 PM
              </p>
              <a href="HP_OneEvents" className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </a>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={yoga01} className="card-img-top" alt="Card image" />
            <div className="card-body">
              <h5 className="card-title title">Maintain Body Correctly</h5>
              <div className="straight-line"></div>
              <p className="card-text detail">
                <i className="bi bi-bookmark-star-fill"></i> Awareness Lecture
              </p>
              <p className="card-text detail">
                <i className="bi bi-soundwave"></i> Physical (In WellnessVision
                Premises)
              </p>
              <p className="card-text detail">
                <i className="bi bi-calendar2-week-fill"></i> 2024/06/15
              </p>
              <p className="card-text detail date">
                <i className="bi bi-alarm-fill"></i> 9.00 PM
              </p>
              <a href="HP_OneEvents" className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </a>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={yoga01} className="card-img-top" alt="Card image" />
            <div className="card-body">
              <h5 className="card-title title">Maintain Body Correctly</h5>
              <div className="straight-line"></div>
              <p className="card-text detail">
                <i className="bi bi-bookmark-star-fill"></i> Awareness Lecture
              </p>
              <p className="card-text detail">
                <i className="bi bi-soundwave"></i> Physical (In WellnessVision
                Premises)
              </p>
              <p className="card-text detail">
                <i className="bi bi-calendar2-week-fill"></i> 2024/06/15
              </p>
              <p className="card-text detail date">
                <i className="bi bi-alarm-fill"></i> 9.00 PM
              </p>
              <a href="HP_OneEvents" className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </a>
            </div>
          </div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={yoga01} className="card-img-top" alt="Card image" />
            <div className="card-body">
              <h5 className="card-title title">Maintain Body Correctly</h5>
              <div className="straight-line"></div>
              <p className="card-text detail">
                <i className="bi bi-bookmark-star-fill"></i> Awareness Lecture
              </p>
              <p className="card-text detail">
                <i className="bi bi-soundwave"></i> Physical (In WellnessVision
                Premises)
              </p>
              <p className="card-text detail">
                <i className="bi bi-calendar2-week-fill"></i> 2024/06/15
              </p>
              <p className="card-text detail date">
                <i className="bi bi-alarm-fill"></i> 9.00 PM
              </p>
              <a href="HP_OneEvents" className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </a>
            </div>
          </div>
        </div>
      </div>
      <AddEvent show={showPopup} handleClose={togglePopup} />
    </div>
  );
};

export default HP_ViewEvents;
