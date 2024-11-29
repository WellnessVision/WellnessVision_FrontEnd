import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/HP_SideBar';
import axios from 'axios';
import { Calendar, Clock, Activity, Users, Settings, User } from 'lucide-react';
import './HP_Dashboard.css'; // Make sure to create this CSS file

interface HP_Profile {
  id: number;
  user_type: string;
  email: string;
}

const HP_Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const hpId = Number(localStorage.getItem('hpId'));
  const [profileDetails, setProfileDetails] = useState<HP_Profile[]>([]);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get<HP_Profile[]>(
        `http://localhost:15000/healthProfessionalDashboardProfileDetails`,
        { params: { hpId: hpId } }
      );
      setProfileDetails(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const stats = [
    { icon: Activity, label: 'Total Events', value: '0', color: 'blue' },
    { icon: Users, label: 'Active Users', value: '0', color: 'green' },
    { icon: Clock, label: 'Appointments', value: '0', color: 'purple' },
    { icon: Calendar, label: 'Upcoming', value: '0', color: 'orange' },
  ];

  return (
    <div>
      <Sidebar activeMenuItem={["Dashboard"]} />
      <div className="HP_Dashboard_dashboard">
        {/* Header Section */}
        <div className="p-8">
          {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-lg text-gray-600">Welcome back, Health Professional</p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-black-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </button>
            </div>
          </div> */}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Events Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Events</h2>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Physical Events</h3>
                  <p className="text-gray-600 mb-6">Create a new physical event for users and start your new journey.</p>
                  <a 
                    href="/HP_ViewEvents" 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Add New Physical Event
                  </a>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <p className="text-sm text-gray-600">No events available</p>
              </div>
            </div>

            {/* Appointments Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Appointments</h2>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Set Up Appointment Schedule</h3>
                  <p className="text-gray-600 mb-6">Create a new appointment schedule for users and start your new journey.</p>
                  <a 
                    href="/HP_ViewEvents" 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Add New Appointment
                  </a>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <p className="text-sm text-gray-600">No appointments available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HP_Dashboard;