import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { WeatherProvider } from './src/contexts/WeatherContext/WeatherContext'
import Home from './src/screens/Home'
import Menu from './src/screens/Menu'
import ManageDatapoints from './src/screens/ManageDatapoints/ManageDatapoints'
import { DatapointProvider } from './src/contexts/DatapointContext/DatapointContext'
import ManageUsers from './src/screens/ManageOrganization/ManageOrganization'
import ManageDashboard from './src/screens/ManageDashboard'

function App (): JSX.Element {
  const users = [{ name: 'Tamas', email: 'Tamas@Tamas.com', role: 'admin', status: 'accepted' },
    { name: 'Ilia', email: 'Ilia@Tamas.com', role: 'mod', status: 'pending' }]
  return (
    <WeatherProvider>
        <DatapointProvider>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/menu">Menu</Link>
                </li>
                <li>
                    <Link to="/manage-datapoint">Manage Datapoint</Link>
                </li>
                <li>
                    <Link to="/manage-organization">Manage Organization</Link>
                </li>
                <li>
                    <Link to="/manage-dashboard">Manage Dashboard</Link>
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/manage-datapoint" element={<ManageDatapoints/>}/>
            <Route path="/manage-organization" element={<ManageUsers companyName='KeyHole' users={users} />}/>
            <Route path="/manage-dashboard" element={<ManageDashboard />}/>
        </Routes>
        {/* <Home/> */}
        {/* <Menu/> */}
        </DatapointProvider>
    </WeatherProvider>

  )
}
export default App
