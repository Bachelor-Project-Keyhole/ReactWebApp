import * as React from 'react'
import { useEffect } from 'react'
import MenuLayout from '../../components/MenuLayout'
import { useNavigate } from 'react-router-dom'
import { type IDashboard, useDashboardContext } from '../../contexts/DashboardContext/DashboardContext'
import UserService from '../../contexts/Authentication/UserService'

const Menu = (): JSX.Element => {
  const navigate = useNavigate()
  const organizationId = UserService.getCurrentUser().user.organizationId
  const { getDashboards, newDashboard } = useDashboardContext()
  const [dashboards, setDashboards] = React.useState<any[]>([
    {
      id: '',
      name: ''
    }
  ])
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
      console.log('organizationIddd', organizationId)

      const dashboards = await getDashboards(organizationId)
      console.log('DASHBOARDSss', dashboards)
      setDashboards(dashboards)
    } catch (error) {
      console.log('error', error)
    }
  }, [getDashboards, organizationId])

  const handleCreateNewDashboard = React.useCallback(async () => {
    try {
      const dashboard = await newDashboard(
        `New Dashboard ${dashboards.length + 1}`,
        organizationId
      )

      // navigate('/manage-dashboard/' + dashboard._id)
      navigate('/manage-dashboard')
    } catch (error) {
      console.log('error', error)
    }
  }, [newDashboard, navigate, organizationId])

  const tempCards = dashboards.map((dashboard) => {
    return {
      title: dashboard.name
      // lastModified: dashboard.name,
      // description: dashboard.id
      // nextPageUrl: 'http://localhost:8080/manage-organization'
    }
  })

  console.log('TEMP CARDS', tempCards)

  const dashboardCards = dashboards.concat(
    // {
    //   title: 'Dashboard 1',
    //   lastModified: 'Last modified on 23-05-2023',
    //   description: 'Description of Dashboard 1'
    //   // nextPageUrl: 'http://localhost:8080/manage-organization'
    // },
    // { ...tempCards },
    {
      title: 'Create new Dashboard'
      // nextPageUrl: 'http://localhost:8080/manage-organization'
    }
  )

  console.log('DASHBOARD CARDS', dashboardCards)

  React.useLayoutEffect(() => {
    handleGetDashboards()
  }, [handleGetDashboards])

  return (
    <MenuLayout
      cards={dashboardCards}
      onClick={(index) => {
        if (index === dashboardCards.length - 1) {
          handleCreateNewDashboard()
        } else {
          navigate('/manage-dashboard/' + dashboards[index].id)
          console.log(`Card at index ${index} clicked....${dashboardCards[index].title}`)
        }
      }} style={menuStyles}>
        {/*  */}
    </MenuLayout>
  )
}

export default Menu
