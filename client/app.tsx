import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { WeatherProvider } from './src/contexts/WeatherContext/WeatherContext'
import Home from './src/screens/Home'
import Menu from './src/screens/Menu'
import ManageDatapoints from './src/screens/ManageDatapoints/ManageDatapoints'
import { DatapointProvider } from './src/contexts/DatapointContext/DatapointContext'

function App (): JSX.Element {
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
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/manage-datapoint" element={<ManageDatapoints/>}/>
        </Routes>
        {/* <Home/> */}
        {/* <Menu/> */}
        </DatapointProvider>
    </WeatherProvider>

  )
}
export default App
