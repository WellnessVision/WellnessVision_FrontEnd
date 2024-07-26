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
import AdminViewHealthProfessionalRegistrationRequest from './pages/Admin/HP_registrationRequest'
import AdminViewOneHealthProfessionalRegistrationRequest from './pages/Admin/HP_viewOneRegistrationRequest'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TM_Sidebar from './pages/TreatmentManager/TM_Sidebar';
import Volunteer_Dashboard from './pages/Volunteer/Volunteer_Dashboard'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Volunteer_MyEvents_Previous from './pages/Volunteer/Volunteer_MyEvents_Previous'
import Volunteer_OneEventPrevious from './pages/Volunteer/Volunteer_OneEventPrevious'
import Volunteer_MyEvents_Upcomming from './pages/Volunteer/Volunteer_MyEvents_Upcomming'

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
    path: "AdminViewOneHealthProfessionalRegistrationRequest/:requestId",
    element: <AdminViewOneHealthProfessionalRegistrationRequest/>,
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
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
