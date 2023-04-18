import * as React from 'react'
import CardList from '../../components/CardList/CardList'

export interface ManageDatapointsProps {
  style?: React.CSSProperties
}

const ManageDatapoints = ({ style, ...props }: any): JSX.Element => {
  return (
            <div style={{ ...wrapperStyles, ...style }}>
            <div style={{ ...innerStyles }}>
                <div>Manage Datapoints</div>
                <CardList data={
                    [
                      { title: 'test1', description: 'testtest1' },
                      { title: 'test2', description: 'testtest2' },
                      { title: 'test3', description: 'testtest3' }

                    ]
                }></CardList>
            </div>
            </div>
  )
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f1f1f1'
  // margin: '0',
  // padding: '50px',
}

export const innerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: 500,
  height: 500,
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  // backgroundColor: 'darkgrey',
  border: '1px solid black',
  padding: '10px'
}

export default ManageDatapoints
