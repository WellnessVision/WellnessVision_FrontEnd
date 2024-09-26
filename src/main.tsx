import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirstPage from './pages/LandingPage'
import HP_Dashboard from './pages/HP/HP_Dashboard'
import HP_Register from './pages/HP/HP_Register'
import Login from './pages/Login'
import HP_ViewEvents from './pages/HP/HP_ViewEvents'
import HP_OneEvents from './pages/HP/HP_OneEvent'
import HP_Test from './pages/HP/HP_Test'
import AdminViewHealthProfessionalRegistrationRequest from './pages/Admin/Admin_ViewHealthProfessionalRegistrationRequest'
import AdminViewOneHealthProfessionalRegistrationRequest from './pages/Admin/Admin_ViewOneHealthProfessionalRegistrationRequest'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TM_Sidebar from './pages/TreatmentManager/TM_Sidebar';
import Volunteer_Dashboard from './pages/Volunteer/Volunteer_Dashboard'
import Volunteer_Sidebar from './pages/Volunteer/Volunteer_Sidebar'
import NU_Register from './pages/NormalUser/NU_Register'
import HP_LodingPage from './pages/HP/HP_LodingPage'
import NU_Dashboard from './pages/NormalUser/NU_Dashboard'
import NU_ViewUpcomingPhysicalEvents from './pages/NormalUser/NU_ViewUpcomingPhysicalEvents'
import NU_ViewBookedUpcomingphysicalEvents from './pages/NormalUser/NU_ViewBookedUpcomingphysicalEvents'
import NU_ViewOneUpcomingPhysicalEvent from './pages/NormalUser/NU_ViewOneUpcomingPhysicalEvent'
import NU_ViewOneBookedUpcomingphysicalEvents from './pages/NormalUser/NU_ViewOneBookedUpcomingphysicalEvents'
import Admin_Dashboard from './pages/Admin/Admin_Dashboard'
import HP_Notification from './pages/HP/HP_Notification'
import HP_ViewPhysicalEventPayment from './pages/HP/HP_ViewPhysicalEventPayment'
import NU_Notification from './pages/NormalUser/NU_Notification'
import NU_ViewPhysicalEventBookingPayment from './pages/NormalUser/NU_ViewPhysicalEventBookingPayment'
import HP_ViewDeletedEvents from './pages/HP/HP_ViewDeletedEvents'
import HP_ViewOneDeletedEvents from './pages/HP/HP_ViewOneDeletedEvents'
import HP_ViewPreviousPhysicalEvents from './pages/HP/HP_ViewPreviousPhysicalEvents'
import HP_ViewOnePreviousPhysicalEvent from './pages/HP/HP_ViewOnePreviousPhysicalEvent'
import HP_MyAppointments from './pages/HP/HP_MyAppointments'
import NU_ViewPreviousPhysicalEvents from './pages/NormalUser/NU_ViewPreviousPhysicalEvents'
import NU_ViewOnePreviousPhysicalEvents from './pages/NormalUser/NU_ViewOnePreviousPhysicalEvents'
import NU_ViewBookedPreviousphysicalEvents from './pages/NormalUser/NU_ViewBookedPreviousphysicalEvents'
import NU_ViewOneBookedPreviousphysicalEvents from './pages/NormalUser/NU_ViewOneBookedPreviousphysicalEvents'
import Volunteer_MyEvents_Previous from './pages/Volunteer/Volunteer_MyEvents_Previous'
import Volunteer_OneEventPrevious from './pages/Volunteer/Volunteer_OneEventPrevious'
import Volunteer_MyEvents_Upcomming from './pages/Volunteer/Volunteer_MyEvents_Upcomming'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage/>,
  },
  {
    path: "HP_Dashboard",
    element: <HP_Dashboard/>,
  },
  {
    path: "HP_Register",
    element: <HP_Register/>,
  },
  {
    path: "NU_Register",
    element: <NU_Register/>,
  },
  {
    path: "Login",
    element: <Login/>,
  },
  {
    path: "HP_ViewEvents",
    element: <HP_ViewEvents/>,
  },
  {
    path: "HP_OneEvents/:eventId",
    element: <HP_OneEvents/>,
  },
  {
    path: "HP_Test",
    element: <HP_Test/>,
  },
  {
    path: "AdminViewHealthProfessionalRegistrationRequest",
    element: <AdminViewHealthProfessionalRegistrationRequest/>,
  },
  {
    path: "TM_Sidebar",
    element: <TM_Sidebar activeMenuItem={''}/>
  },
  {
    path: "Volunteer_Dashboard",
    element: <Volunteer_Dashboard/>
  },
  {
    path: "Volunteer_MyEvents_Previous",
    element: <Volunteer_MyEvents_Previous/>
  },
  {
    path: "Volunteer_OneEventPrevious/:eventId",
    element: <Volunteer_OneEventPrevious/>,
  },
  {
    path: "Volunteer_MyEvents_Upcomming",
    element: <Volunteer_MyEvents_Upcomming/>,
  },
  {
    path: "Volunteer_MyEvents_Upcomming",
    element: <Volunteer_MyEvents_Upcomming/>
  },
  {
    path: "Volunteer_Sidebar",
    element: <Volunteer_Sidebar activeMenuItem={''}/>
  },
  {
    path: "HP_LodingPage",
    element: <HP_LodingPage/>,
  },
  {
    path: "NU_Dashboard",
    element: <NU_Dashboard/>
  },
  {
    path: "NU_ViewUpcomingPhysicalEvents",
    element: <NU_ViewUpcomingPhysicalEvents/>
  },
  {
    path: "NU_ViewBookedUpcomingphysicalEvents",
    element: <NU_ViewBookedUpcomingphysicalEvents/>
  },
  {
    path: "NU_ViewOneUpcomingPhysicalEvent/:eventId/:hpId",
    element: <NU_ViewOneUpcomingPhysicalEvent />,
  },
  {
    path: "NU_ViewOneBookedUpcomingphysicalEvents/:eventId/:hpId",
    element: <NU_ViewOneBookedUpcomingphysicalEvents />,
  },
  {
    path: "Admin_Dashboard",
    element: <Admin_Dashboard />,
  },
  {
    path: "HP_Notification",
    element: <HP_Notification />,
  },
  {
    path: "HP_ViewPhysicalEventPayment",
    element: <HP_ViewPhysicalEventPayment />,
  },
  {
    path: "NU_Notification",
    element: <NU_Notification />,
  },
  {
    path: "NU_ViewPhysicalEventBookingPayment",
    element: <NU_ViewPhysicalEventBookingPayment />,
  },
  {
    path: "HP_ViewDeletedEvents",
    element: <HP_ViewDeletedEvents />,
  },
  {
    path: "HP_ViewOneDeletedEvents/:eventId",
    element: <HP_ViewOneDeletedEvents/>,
  },
  {
    path: "HP_ViewPreviousPhysicalEvents",
    element: <HP_ViewPreviousPhysicalEvents/>,
  },
  {
    path: "HP_ViewOnePreviousPhysicalEvent/:eventId",
    element: <HP_ViewOnePreviousPhysicalEvent/>,
  },
  {
    path: "HP_MyAppointments",
    element: <HP_MyAppointments />,
  },  
  {
    path: "NU_ViewPreviousPhysicalEvents",
    element: <NU_ViewPreviousPhysicalEvents/>,
  },
  {
    path: "NU_ViewOnePreviousPhysicalEvents/:eventId/:hpId",
    element: <NU_ViewOnePreviousPhysicalEvents />,
  },
  {
    path: "NU_ViewBookedPreviousphysicalEvents",
    element: <NU_ViewBookedPreviousphysicalEvents/>,
  },
  {
    path: "NU_ViewOneBookedPreviousphysicalEvents/:eventId/:hpId",
    element: <NU_ViewOneBookedPreviousphysicalEvents />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
