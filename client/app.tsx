import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { WeatherProvider } from './src/contexts/WeatherContext/WeatherContext'
import Home from './src/screens/Home'
import Menu from './src/screens/Menu'
import ManageDatapoints from './src/screens/ManageDatapoints/ManageDatapoints'
import ManageUsers from './src/screens/ManageOrganization/ManageOrganization'

function App (): JSX.Element {

    const users = [{name: 'Tamas', email: 'Tamas@Tamas.com', role: 'admin', status: 'accepted'},
        {name: 'Ilia', email: 'Ilia@Tamas.com', role: 'mod', status: 'pending'}]
  return (
    <WeatherProvider>
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
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/manage-datapoint" element={<ManageDatapoints/>}/>
            <Route path="/manage-organization" element={<ManageUsers companyName='KeyHole' users={users} />}/>
        </Routes>
        {/* <Home/> */}
        {/* <Menu/> */}
    </WeatherProvider>

  )
}
export default App
