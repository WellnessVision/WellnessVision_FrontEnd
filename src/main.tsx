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
import TM_Sidebar from './pages/AppointmentManager/AM_components/AM_Sidebar';
import Volunteer_Dashboard from './pages/Volunteer/Volunteer_Dashboard'
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
import NU_ViewPreviousPhysicalEvents from './pages/NormalUser/NU_ViewPreviousPhysicalEvents'
import NU_ViewOnePreviousPhysicalEvents from './pages/NormalUser/NU_ViewOnePreviousPhysicalEvents'
import NU_ViewBookedPreviousphysicalEvents from './pages/NormalUser/NU_ViewBookedPreviousphysicalEvents'
import NU_ViewOneBookedPreviousphysicalEvents from './pages/NormalUser/NU_ViewOneBookedPreviousphysicalEvents'
import HP_ViewAllAppointmentSchedule from './pages/HP/HP_ViewAllAppointmentSchedule'
import HP_ViewOneAppointmentScheduleDetails from './pages/HP/HP_ViewOneAppointmentScheduleDetails'
import NU_ViewHealthProfessionals from './pages/NormalUser/NU_ViewHealthProfessionals'
import NU_ViewOneHealthProfessional from './pages/NormalUser/NU_ViewOneHealthProfessional'
import NU_ViewAllBookedUpcomingAppointments from './pages/NormalUser/NU_ViewAllBookedUpcomingAppointments'
import NU_ViewOneAppointmentBookingDetails from './pages/NormalUser/NU_ViewOneAppointmentBookingDetails'
import Volunteer_UpcomingVolunteerEvents from './pages/Volunteer/Volunteer_UpcomingVolunteerEvents'
import Volunteer_ViewOneUpcomingVolunteerEvents from './pages/Volunteer/Volunteer_ViewOneUpcomingVolunteerEvents'
import Volunteer_ChatWithHealthProfessional from './pages/Volunteer/Volunteer_ChatWithHealthProfessional'
import Volunteer_ChatWithHealthProfessionalReplyPopup from './pages/Volunteer/Volunteer_components/Volunteer_ChatWithHealthProfessionalReplyPopup'
import Volunteer_ChatWithHealthProfessionalEditMessagePopup from './pages/Volunteer/Volunteer_components/Volunteer_ChatWithHealthProfessionalEditMessagePopup'
import Volunteer_UpcomingPhysicalEventsForVolunteering from './pages/Volunteer/Volunteer_UpcomingPhysicalEventsForVolunteering'
import Volunteer_ViewOneUpcomingVolunteeringEvent from './pages/Volunteer/Volunteer_ViewOneUpcomingVolunteeringEvent'
import HP_ViewVolunteerRequestForPhysicalEvents from './pages/HP/HP_ViewVolunteerRequestForPhysicalEvents'
import Volunteer_MyCollection from './pages/Volunteer/Volunteer_MyCollection'
import HP_ViewVolunteerPreviousWorks from './pages/HP/HP_ViewVolunteerPreviousWorks'
import Volunteer_Notification from './pages/Volunteer/Volunteer_Notification'
import HP_ViewVolunteersForPhysicalEvent from './pages/HP/HP_ViewVolunteersForPhysicalEvent'
import HP_ViewAcceptedVolunteerPreviousWorks from './pages/HP/HP_ViewAcceptedVolunteerPreviousWorks'
import HP_ChatWithVolunteer from './pages/HP/HP_ChatWithVolunteer'
import HP_ChatWithVolunteerReplyPopup from './components/HP_ChatWithVolunteerReplyPopup'
import HP_ChatWithVolunteerEditMessagePopup from './components/HP_ChatWithVolunteerEditMessagePopup'
import EM_Dashboard from './pages/EventManager/EM_Dashboard'
import EM_ViewAllHealthProfessionals from './pages/EventManager/EM_ViewAllHealthProfessionals'
import EM_ViewOneHealthProfessional from './pages/EventManager/EM_ViewOneHealthProfessional'
import EM_ViewOneHPEvents from './pages/EventManager/EM_ViewOneHPEvents'
import EM_ViewOneEvent from './pages/EventManager/EM_ViewOneEvent'
import AM_Dashboard from './pages/AppointmentManager/AM_Dashboard'
import AM_ViewAllHealthProfessionals from './pages/AppointmentManager/AM_ViewAllHealthProfessionals'
import AM_ViewOneHealthProfessional from './pages/AppointmentManager/AM_ViewOneHealthProfessional'
import AM_ViewAllAppointmentScheduleOfHP from './pages/AppointmentManager/AM_ViewAllAppointmentScheduleOfHP'
import AM_ViewOneAppointmentScheduleDetailsOfHP from './pages/AppointmentManager/AM_ViewOneAppointmentScheduleDetailsOfHP'
import AM_ViewAllAppointmentRooms from './pages/AppointmentManager/AM_ViewAllAppointmentRooms'
import AM_ViewAllAppointmentScheduleOfRoom from './pages/AppointmentManager/AM_ViewAllAppointmentScheduleOfRoom'
import EM_ViewAllPhysicalEventHalls from './pages/EventManager/EM_ViewAllPhysicalEventHalls'
import EM_ViewAllPhysicalEventsOfHall from './pages/EventManager/EM_ViewAllPhysicalEventsOfHall'
import Admin_ViewAllHealthProfessionals from './pages/Admin/Admin_ViewAllHealthProfessionals'
import Admin_ViewOneHealthProfessional from './pages/Admin/Admin_ViewOneHealthProfessional'
import Admin_ViewAllUsers from './pages/Admin/Admin_ViewAllUsers'
import Admin_ViewOneNormalUser from './pages/Admin/Admin_ViewOneNormalUser'
import Admin_ViewAllVolunteers from './pages/Admin/Admin_ViewAllVolunteers'
import Admin_ViewOneVolunteer from './pages/Admin/Admin_ViewOneVolunteer'
import Admin_ViewAllSystemPrivilegeUser from './pages/Admin/Admin_ViewAllSystemPrivilegeUser'
import Admin_ViewOneSystemPrivilegeUser from './pages/Admin/Admin_ViewOneSystemPrivilegeUser'
import Admin_AddNewAdminPrivilegeUser from './pages/Admin/Admin_AddNewAdminPrivilegeUser'
import Volunteer_Register from './pages/Volunteer/Volunteer_Register'
import Admin_ViewVolunteerRegistrationRequest from './pages/Admin/Admin_ViewVolunteerRegistrationRequest'
import EM_ViewOnePreviousPhysicalEvent from './pages/EventManager/EM_ViewOnePreviousPhysicalEvent'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Admin_Notification from './pages/Admin/Admin_Notification'
import EM_Notification from './pages/EventManager/EM_Notification'
import AM_Notification from './pages/AppointmentManager/AM_Notification'

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
    path: "Volunteer_Dashboard",
    element: <Volunteer_Dashboard/>
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
  {
    path: "HP_ViewAllAppointmentSchedule",
    element: <HP_ViewAllAppointmentSchedule/>,
  },
  {
    path: "HP_ViewOneAppointmentScheduleDetails/:appointmentId",
    element: <HP_ViewOneAppointmentScheduleDetails/>,
  },
  {
    path: "NU_ViewHealthProfessionals",
    element: <NU_ViewHealthProfessionals/>,
  },
  {
    path: "NU_ViewOneHealthProfessional/:hpId",
    element: <NU_ViewOneHealthProfessional/>,
  },
  {
    path: "NU_ViewAllBookedUpcomingAppointments",
    element: <NU_ViewAllBookedUpcomingAppointments/>,
  },
  {
    path: "NU_ViewOneAppointmentBookingDetails/:bookingId/:appointmentId",
    element: <NU_ViewOneAppointmentBookingDetails/>,
  },
  {
    path: "Volunteer_UpcomingVolunteerEvents",
    element: <Volunteer_UpcomingVolunteerEvents/>,
  },
  {
    path: "Volunteer_ViewOneUpcomingVolunteerEvents/:eventId/:hpId",
    element: <Volunteer_ViewOneUpcomingVolunteerEvents />,
  },
  {
    path: "Volunteer_ChatWithHealthProfessional/:eventId",
    element: <Volunteer_ChatWithHealthProfessional/>,
  },
  {
    path: "Volunteer_ChatWithHealthProfessionalReplyPopup/:replyMessageId/:eventId",
    element: <Volunteer_ChatWithHealthProfessionalReplyPopup/>,
  },
  {
    path: "Volunteer_ChatWithHealthProfessionalEditMessagePopup/:replyMessageId/:eventId",
    element: <Volunteer_ChatWithHealthProfessionalEditMessagePopup/>,
  },
  {
    path: "Volunteer_UpcomingPhysicalEventsForVolunteering",
    element: <Volunteer_UpcomingPhysicalEventsForVolunteering/>,
  },
  {
    path: "Volunteer_ViewOneUpcomingVolunteeringEvent/:eventId/:hpId",
    element: <Volunteer_ViewOneUpcomingVolunteeringEvent />,
  },
  {
    path: "HP_ViewVolunteerRequestForPhysicalEvents/:eventId",
    element: <HP_ViewVolunteerRequestForPhysicalEvents/>,
  },
  {
    path: "Volunteer_MyCollection",
    element: <Volunteer_MyCollection/>,
  },
  {
    path: "HP_ViewVolunteerPreviousWorks/:volunteerId/:eventId",
    element: <HP_ViewVolunteerPreviousWorks/>,
  },
  {
    path: "Volunteer_Notification",
    element: <Volunteer_Notification/>,
  },
  {
    path: "HP_ViewVolunteersForPhysicalEvent/:eventId",
    element: <HP_ViewVolunteersForPhysicalEvent/>,
  },
  {
    path: "HP_ViewAcceptedVolunteerPreviousWorks/:volunteerId/:eventId",
    element: <HP_ViewAcceptedVolunteerPreviousWorks/>,
  },
  {
    path: "HP_ChatWithVolunteer/:eventId/:VolunteerId",
    element: <HP_ChatWithVolunteer/>,
  },
  {
    path: "HP_ChatWithVolunteerReplyPopup/:eventId/:VolunteerId/:replyMessageId",
    element: <HP_ChatWithVolunteerReplyPopup/>,
  },
  {
    path: "HP_ChatWithVolunteerEditMessagePopup/:eventId/:VolunteerId/:replyMessageId",
    element: <HP_ChatWithVolunteerEditMessagePopup/>,
  },
  {
    path: "EM_Dashboard",
    element: <EM_Dashboard/>
  },
  {
    path: "EM_ViewAllHealthProfessionals",
    element: <EM_ViewAllHealthProfessionals/>
  },
  {
    path: "EM_ViewOneHealthProfessional/:hpId",
    element: <EM_ViewOneHealthProfessional/>
  },
  {
    path: "EM_ViewOneHPEvents",
    element: <EM_ViewOneHPEvents/>
  },
  {
    path: "EM_OneEvent/:eventId",
    element: <EM_ViewOneEvent/>,
  },
  {
    path: "AM_Dashboard",
    element: <AM_Dashboard/>
  },
  {
    path: "AM_ViewAllHealthProfessionals",
    element: <AM_ViewAllHealthProfessionals/>
  },
  {
    path: "AM_ViewOneHealthProfessional/:hpId",
    element: <AM_ViewOneHealthProfessional/>
  },
  {
    path: "AM_ViewAllAppointmentScheduleOfHP/:hpId",
    element: <AM_ViewAllAppointmentScheduleOfHP/>
  },
  {
    path: "AM_ViewOneAppointmentScheduleDetailsOfHP/:appointmentId/:hpId",
    element: <AM_ViewOneAppointmentScheduleDetailsOfHP/>
  },
  {
    path: "AM_ViewAllAppointmentRooms",
    element: <AM_ViewAllAppointmentRooms/>,
  },
  {
    path: "AM_ViewAllAppointmentScheduleOfRoom/:roomId",
    element: <AM_ViewAllAppointmentScheduleOfRoom/>
  },
  {
    path: "EM_ViewAllPhysicalEventHalls",
    element: <EM_ViewAllPhysicalEventHalls/>,
  },
  {
    path: "EM_ViewAllPhysicalEventsOfHall/:hallId",
    element: <EM_ViewAllPhysicalEventsOfHall/>
  },
  {
    path: "Admin_ViewAllHealthProfessionals",
    element: <Admin_ViewAllHealthProfessionals/>,
  },
  {
    path: "Admin_ViewOneHealthProfessional/:hpId",
    element: <Admin_ViewOneHealthProfessional/>
  },
  {
    path: "Admin_ViewAllUsers",
    element: <Admin_ViewAllUsers/>,
  },
  {
    path: "Admin_ViewOneNormalUser/:userId",
    element: <Admin_ViewOneNormalUser/>
  },
  {
    path: "Admin_ViewAllVolunteers",
    element: <Admin_ViewAllVolunteers/>,
  },
  {
    path: "Admin_ViewOneVolunteer/:volunteerId",
    element: <Admin_ViewOneVolunteer/>
  },
  {
    path: "Admin_ViewAllSystemPrivilegeUser",
    element: <Admin_ViewAllSystemPrivilegeUser/>,
  },
  {
    path: "Admin_ViewOneSystemPrivilegeUser/:systemPrivilegeUserId",
    element: <Admin_ViewOneSystemPrivilegeUser/>
  },
  {
    path: "Admin_AddNewAdminPrivilegeUser",
    element: <Admin_AddNewAdminPrivilegeUser/>,
  },
  {
    path: "Volunteer_Register",
    element: <Volunteer_Register/>,
  },
  {
    path: "Admin_ViewVolunteerRegistrationRequest",
    element: <Admin_ViewVolunteerRegistrationRequest/>,
  },
  {
    path: "EM_ViewOnePreviousPhysicalEvent/:eventId",
    element: <EM_ViewOnePreviousPhysicalEvent/>
  },
  {
    path: "Admin_Notification",
    element: <Admin_Notification/>
  },
  {
    path: "EM_Notification",
    element: <EM_Notification/>
  },
  {
    path: "AM_Notification",
    element: <AM_Notification/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
