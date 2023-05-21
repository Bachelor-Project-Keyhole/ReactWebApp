import * as React from 'react'
import DashboardGrid from '../../components/DashboardGrid/DashboardGrid'
import Test from '../../components/Test'

export interface ManageDashboardProps {
  style?: React.CSSProperties
}

const ManageDashboard = ({ style }: ManageDashboardProps): JSX.Element => {
  return (
        <div style={{ ...wrapperStyles, ...style }}>
            <div style={{ ...innerStyles }}>
                Manage Dashboard
                <DashboardGrid />
                {/* <Test></Test> */}
            </div>
        </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '80vh',
  // padding: 8,
  backgroundColor: '#f1f1f1'
}

export const innerStyles: React.CSSProperties = {
  width: '80%',
  height: '80%'
  // padding: '10px'
}

export default ManageDashboard
