import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface HPProfile {
  id: number;
  user_type: string;
  email: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
}

const HPDashboard = () => {
  const [profileDetails, setProfileDetails] = useState<HPProfile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [appointments, setAppointments] = useState<number>(0);
  const [totalParticipants, setTotalParticipants] = useState<number>(0);

  // Fetch data simulation
  useEffect(() => {
    // Add actual axios calls here
    setTotalParticipants(125);
    setAppointments(8);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Health Professional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <h3 className="text-2xl font-bold">{events.length || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Appointments</p>
                <h3 className="text-2xl font-bold">{appointments}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <h3 className="text-2xl font-bold">{totalParticipants}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Activity className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Events</p>
                <h3 className="text-2xl font-bold">{events.filter(e => new Date(e.date) > new Date()).length || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Physical Events</span>
              <Calendar className="h-5 w-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">Start Creating Events</h3>
              <p className="text-gray-600 mb-6">Create new physical events for users and start your wellness journey.</p>
              <a 
                href="/HP_ViewEvents" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add New Event
              </a>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 text-sm text-gray-600">
            No events scheduled
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Appointments</span>
              <Clock className="h-5 w-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">Manage Appointments</h3>
              <p className="text-gray-600 mb-6">Set up your availability and start accepting appointments.</p>
              <a 
                href="/HP_ViewEvents" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Schedule Appointments
              </a>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 text-sm text-gray-600">
            No upcoming appointments
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HPDashboard;