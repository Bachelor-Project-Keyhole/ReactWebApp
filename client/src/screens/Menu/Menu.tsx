import * as React from 'react'
import { useEffect } from 'react'
import MenuLayout from '../../components/MenuLayout'
import { useNavigate } from 'react-router-dom'
import { useDashboardContext } from '../../contexts/DashboardContext/DashboardContext'
import UserService from '../../contexts/Authentication/UserService'

const Menu = (): JSX.Element => {
  const navigate = useNavigate()

  const { getDashboards } = useDashboardContext()
  const [dashboards, setDashboards] = React.useState<any[]>([])

  const menuStyles: React.CSSProperties = {
    position: 'relative',
    background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden'
  }

  useEffect(() => {
    const bodyStyles: CSSStyleDeclaration = document.body.style
    bodyStyles.margin = '0'
    bodyStyles.padding = '0'
    bodyStyles.overflowX = 'hidden'
  }, [])

  const handleGetDashboards = React.useCallback(async () => {
    try {
      const dashboards = await getDashboards('user.organizationId')
      console.log('DASHBOARDS', dashboards)
      setDashboards(dashboards)
    } catch (error) {
      console.log('error', error)
    }
  }, [getDashboards])

  const cards = [
    {
      title: 'Dashboard 1',
      lastModified: 'Last modified on 23-05-2023',
      description: 'Description of Dashboard 1'
      // nextPageUrl: 'http://localhost:8080/manage-organization'
    },
    {
      title: 'Dashboard 2',
      lastModified: 'Last modified on 16-05-2023',
      description: 'Description of Dashboard 2'
      // nextPageUrl: 'http://localhost:8080/manage-organization'
    },
    {
      title: 'Dashboard 3',
      lastModified: 'Last modified on 03-05-2023 by John Doe',
      description: 'Description of Dashboard 3'
      // nextPageUrl: 'http://localhost:8080/manage-organization'
    },
    {
      title: 'Create new Dashboard'
      // nextPageUrl: 'http://localhost:8080/manage-organization'
    }
  ]

  React.useLayoutEffect(() => {
    handleGetDashboards()
  }, [handleGetDashboards])

  return (
    <MenuLayout
      cards={cards}
      onClick={(index) => {
        console.log(`Card at index ${index} clicked....${cards[index].title}`)
      }} style={menuStyles}>
        {/*  */}
    </MenuLayout>
  )
}

export default Menu
