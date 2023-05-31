import * as React from 'react'
import Button from '../../components/Button'
import Description from '../../components/Description'
import Header from '../../components/Header'
import PlusIcon from '../../components/PlusIcon'
import SubHeader from '../../components/SubHeader'
import Title from '../../components/Title'
import { useWeatherContext } from '../../contexts/WeatherContext/WeatherContext'
import { IDatapointEntry, type ILatestEntry } from '../../contexts/DatapointContext/DatapointContext'
import Logo from '../../components/Logo/Logo'

const Home = ({ ...props }: any): any => {
  const { temperature, getTemperature } = useWeatherContext()
  // const [temp, setTemp] = React.useState(0)

  console.log('HI')

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
    <div style={{ ...mainDivStyle }}>
      <div style={{ marginTop: '5%' }}>
        <Logo />
      </div>
    </div>
  )
}

const entry: ILatestEntry = {
  latestValue: 3,
  change: 12,
  isDirectionUp: false,
  isComparisonAbsolute: false
}

export const containerStyle: React.CSSProperties = {
  width: '50vh',
  height: '50vh',
  padding: '10vh'
}

export const componentStyle: React.CSSProperties = {

}

const mainDivStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
}

export default Home
