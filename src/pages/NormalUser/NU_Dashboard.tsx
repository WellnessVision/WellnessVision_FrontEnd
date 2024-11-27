import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Heart, Calendar, Trophy } from 'lucide-react';
import NU_Sidebar from './NU_components/NU_Sidebar';
import CalendarComponent from './NU_components/NU_Calender';

const NU_Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    activeEvents: 0,
    completedEvents: 0,
    upcomingEvents: 0,
    streakDays: 0
  });

  return (
    <div>
      <NU_Sidebar activeMenuItem={["Dashboard"]}/>
      
      <div className="p-6">
        <h3 className='HP_Dashboard_dashboard mb-6'>Dashboard</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Active Events</p>
                <h4 className="text-2xl font-bold">{stats.activeEvents}</h4>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <h4 className="text-2xl font-bold">{stats.completedEvents}</h4>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <h4 className="text-2xl font-bold">{stats.upcomingEvents}</h4>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Day Streak</p>
                <h4 className="text-2xl font-bold">{stats.streakDays}</h4>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-4">
          <CalendarComponent/>
        </div>
      </div>
    </div>
  );
};

export default NU_Dashboard;