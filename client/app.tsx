import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { WeatherProvider } from './src/contexts/WeatherContext/WeatherContext'
import Home from './src/screens/Home'
import Menu from './src/screens/Menu'
import ManageDatapoints from './src/screens/ManageDatapoints/ManageDatapoints'
import { DatapointProvider } from './src/contexts/DatapointContext/DatapointContext'
import ManageUsers from './src/screens/ManageOrganization/ManageOrganization'
import Navbar from './src/components/NavBar/NavBar'


function App (): JSX.Element {
    const links = [
        { to: '/menu', text: 'Menu' },
        { to: '/manage-datapoint', text: 'Manage Datapoint' },
        { to: '/manage-organization', text: 'Manage Organization' },
        { to: '/', text: 'Logout' },
      ];
  const users = [{ name: 'Tamas', email: 'Tamas@Tamas.com', role: 'admin', status: 'accepted' },
    { name: 'Ilia', email: 'Ilia@Tamas.com', role: 'mod', status: 'pending' }]
  return (
    <WeatherProvider>
        <DatapointProvider>
            <Navbar links={links} />
      {/* Rest of your application */}
    
       <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/manage-datapoint" element={<ManageDatapoints/>}/>
            <Route path="/manage-organization" element={<ManageUsers companyName='KeyHole' users={users} />}/>
        </Routes>
        {/* <Home/> */}
        {/* <Menu/> */}
        </DatapointProvider>
    </WeatherProvider>

  )
}
export default App
