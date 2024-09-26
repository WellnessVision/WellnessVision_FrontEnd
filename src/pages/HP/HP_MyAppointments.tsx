import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/HP_SideBar';
import axios from 'axios';
import './HP_MyAppointments.css';

interface Appointment {
  id: number;
  date: string;
  time: string;
  patientName: string;
  description: string;
}

const HP_MyAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const hpId = Number(localStorage.getItem('hpId'));

  const fetchAppointments = async () => {
    try {
      const response = await axios.get<Appointment[]>(`http://localhost:15000/getAppointments`, {
        params: { hpId: hpId },
      });
      setAppointments(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <Sidebar activeMenuItem={['My Appointments']} />
      <h3 className='HP_MyAppointment_title'>My Appointments</h3>
      <div className='HP_MyAppointment_appointmentList'>
        {error ? (
          <div className='HP_MyAppointment_error'>Error: {error}</div>
        ) : appointments.length === 0 ? (
          <div className='HP_MyAppointment_noAppointments'>No appointments available</div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className='card HP_MyAppointment_card'>
              <div className='card-header'>
                {appointment.patientName} - {appointment.date} at {appointment.time}
              </div>
              <div className='card-body'>
                <p className='card-text'>{appointment.description}</p>
              </div>
              <div className='card-footer text-body-secondary'>
                Appointment ID: {appointment.id}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HP_MyAppointment;
