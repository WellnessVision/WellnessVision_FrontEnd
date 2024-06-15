import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirstPage from './pages/LandingPage'
import HP_Dashboard from './pages/HP/HP_Dashboard'
import HP_Register from './pages/HP/HP_Register'
import Login from './pages/Login'
import HP_ViewEvents from './pages/HP/HP_ViewEvents'
import HP_OneEvents from './pages/HP/HP_OneEvent'
import 'bootstrap/dist/css/bootstrap.min.css';
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
    path: "Login",
    element: <Login/>,
  },
  {
    path: "HP_ViewEvents",
    element: <HP_ViewEvents/>,
  },
  {
    path: "HP_OneEvents",
    element: <HP_OneEvents/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
