import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { WeatherProvider } from './src/contexts/WeatherContext/WeatherContext'
import Home from './src/screens/Home'
import Menu from './src/screens/Menu'
import ManageDatapoints from './src/screens/ManageDatapoints/ManageDatapoints'
import { DatapointProvider } from './src/contexts/DatapointContext/DatapointContext'
import ManageOrganization from './src/screens/ManageOrganization/ManageOrganization'
import Navbar from './src/components/NavBar/NavBar'
import Login from './src/components/Login/Login'
import Register from './src/components/Register/Register'
import Profile from './src/screens/Profile/Profile'
import { AuthServiceProvider } from './src/contexts/Authentication/AuthService'
import UserService from './src/contexts/Authentication/UserService'
import { ManageOrganizationProvider } from './src/contexts/ManageOrganization/ManageOrganizationContext'
import ProtectedRoute from './src/components/ProtectedRoute/ProtectedRoute'
import Error from './src/screens/Error/Error'
import { TemplateProvider } from './src/contexts/TemplateContext/TemplateContext'
import { DashboardProvider } from './src/contexts/DashboardContext/DashboardContext'
import ManageDashboard from './src/screens/ManageDashboard/ManageDashboard'
import PasswordReset from './src/components/PasswordReset/PasswordReset'
import PasswordResetEmail from './src/components/PasswordResetEmail/PasswordResetEmail'

function App (): JSX.Element {

  return (
    <WeatherProvider>
      <TemplateProvider>
        <DashboardProvider>
          <DatapointProvider>
              <ManageOrganizationProvider>
                <AuthServiceProvider>
                  <Navbar />
            {/* Rest of your application */}
          
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path='/error' element={<Error />} />
                      <Route path="/menu" element={
                        <ProtectedRoute requiredRole='Viewer'>
                          <Menu/>
                        </ProtectedRoute>}/>
                      <Route path="/manage-datapoint" element={
                        <ProtectedRoute requiredRole='Editor' >
                          <ManageDatapoints/>
                        </ProtectedRoute>} />
                      <Route path="/manage-organization" element={
                        <ProtectedRoute requiredRole='Admin'>
                          <ManageOrganization />
                        </ProtectedRoute>}/>
                        <Route path="/manage-dashboard/:dashboardId" element={<ManageDashboard />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register isNewCompany={true} />} />
                      <Route path="/registerUser/:token" element={<Register isNewCompany={false} />} />
                      <Route path='/password-reset-email' element={<PasswordResetEmail />} />
                      <Route path='/password-reset/:token' element={<PasswordReset />} /> 
                      <Route path='/profile' element={
                        <ProtectedRoute requiredRole='Viewer'>
                          <Profile />
                        </ProtectedRoute>} />
                  </Routes>
                  {/* <Home/> */}
                  {/* <Menu/> */}
                </AuthServiceProvider>
              </ManageOrganizationProvider>
            </DatapointProvider>
          </DashboardProvider>
        </TemplateProvider>
    </WeatherProvider>

  )
}

export default App
