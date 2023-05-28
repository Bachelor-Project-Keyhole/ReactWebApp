import * as React from 'react'
import Button from '../../components/Button'
import Description from '../../components/Description'
import Header from '../../components/Header'
import PlusIcon from '../../components/PlusIcon'
import SubHeader from '../../components/SubHeader'
import Title from '../../components/Title'
import { useWeatherContext } from '../../contexts/WeatherContext/WeatherContext'
import authorizationHeader from '../../contexts/Authentication/AuthorizationHeader'
import { IDatapointEntry, ILatestEntry } from '../../contexts/DatapointContext/DatapointContext'


const Home = ({ ...props }: any): any => {
  const { temperature, getTemperature } = useWeatherContext()
  // const [temp, setTemp] = React.useState(0)

  console.log('HI')

  const user = authorizationHeader

  const handleTemperature = React.useCallback(async () => {
    console.log('HANDLETEMP')
    try {
      const response = await getTemperature()
      console.log('RESPONSE', response)
    } catch (error) {
      console.log('error', error)
    }
  }
  , [getTemperature])

  React.useCallback(async () => {
    await handleTemperature()
  }, [handleTemperature])

  return (
    <>
      <div>{'Weather Temperature:'} + {temperature}  </div>
      <Title text="Home" />
      <Header text="Header" />
      <SubHeader text="SubHeader" />
      <SubHeader text={ user.name } />
      <Description text="Description Description Description Description Description Description Description Description" />
      <Button text="Button" icon={<PlusIcon/>} style={{ backgroundColor: 'black', color: 'white' }} />
      <Button text="Button" icon={<PlusIcon color="red"/>} />
      {/* <Popup>
        <Title text="Popup" />
        <Header text="Header" />
        <SubHeader text="SubHeader" />
        <Description text="Description Description Description Description Description Description Description Description" />
        <Button text="Button" icon={<PlusIcon/>} style={{ backgroundColor: 'black', color: 'white' }} />
      </Popup> */}
    </>
  )
}

const entry: ILatestEntry = {
    latestValue: 3,
    change: 12, 
    directionIsUp: false,
    comparisonIsAbsolute: false
}

export const containerStyle: React.CSSProperties = {
  width: '50vh',
  height: '50vh',
  padding: '10vh'
}

export default Home
