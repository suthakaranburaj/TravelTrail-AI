import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import {GoogleOAuthProvider} from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]'
import MyTrip from './my-trips'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_IF}>
      <Header/>
      <Toaster/>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
