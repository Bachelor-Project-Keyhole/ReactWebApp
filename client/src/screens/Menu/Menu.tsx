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
      const dashboards = await getDashboards(organizationId)
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
      navigate('/manage-dashboard/' + dashboard.id)
    } catch (error) {
      console.log('error', error)
    }
  }, [newDashboard, navigate, organizationId])

  const tempCards: any[] = dashboards.map((dashboard) => {
    return {
      title: dashboard.name
    }
  })

  const dashboardCards = tempCards.concat(
    {
      title: 'Create new Dashboard'
    }
  )

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
