import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'

const router=createBrowserRouter([
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)

