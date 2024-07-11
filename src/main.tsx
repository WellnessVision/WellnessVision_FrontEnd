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
import Volunteer_Sidebar from './pages/Volunteer/Volunteer_Sidebar'
import NU_Register from './pages/NormalUser/NU_Register'
import HP_LodingPage from './pages/HP/HP_LodingPage'
import NU_Dashboard from './pages/NormalUser/NU_Dashboard'
import NU_ViewAllPhysicalEvents from './pages/NormalUser/NU_ViewAllPhysicalEvents'
import NU_ViewBookedPhysicalEvents from './pages/NormalUser/NU_ViewBookedphysicalEvents'


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
    path: "AdminViewOneHealthProfessionalRegistrationRequest/:requestId",
    element: <AdminViewOneHealthProfessionalRegistrationRequest/>,
  },
  {
    path: "TM_Sidebar",
    element: <TM_Sidebar activeMenuItem={''}/>
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
    path: "NU_ViewAllPhysicalEvents",
    element: <NU_ViewAllPhysicalEvents/>
  },
  {
    path: "NU_ViewBookedPhysicalEvents",
    element: <NU_ViewBookedPhysicalEvents/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
