import * as React from 'react'
import CardList from '../../components/CardList/CardList'
import Popup from '../../components/Popup/Popup'
import Header from '../../components/Header/Header'
import Divider from '../../components/Divider/Divider'
import Title from '../../components/Title/Title'
import Button from '../../components/Button'
import DatapointCard from '../../components/DatapointCard/DatapointCard'

export interface ManageDatapointsProps {
  style?: React.CSSProperties
}

const ManageDatapoints = ({ style, ...props }: any): JSX.Element => {
  const [editModal, setEditModal] = React.useState(false)

  const datapointHandler = (key: string): void => {
    console.log('KEY' + key)
    setEditModal(true)
    // setTimeout(() => {
    //   return () => {
    //     displayName: 'test',
    //     description: 'test'
    //   }
    // }, 1000)
  }

  return (
          <>
            <div style={{ ...wrapperStyles, ...style }}>
            <div style={{ ...innerStyles }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Title text={'Manage Datapoints'}/>
                <Button text={'+'}/>
              </div>
                <div style={{ backgroundColor: 'lightgrey', height: 24 }}>searchbar</div>
                <Divider />
                <CardList
                cardType='DatapointCard'
                data={
                    [
                      { title: 'test1', description: 'testtest1', key: '1' },
                      { title: 'test2', description: 'testtest2', key: '2' },
                      { title: 'test3', description: 'testtest3', key: '3' }
                    ]
                }
                editHandler={datapointHandler}
                ></CardList>
            </div>
            </div>
            {editModal &&
            <Popup onClose={() => { setEditModal(false) }}>
              <Header text='Add Datapoint' />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ backgroundColor: 'red', width: 150, height: 24 }}></div>
              <div style={{ backgroundColor: 'red', width: 150, height: 24 }}></div>
              </div>
              <Divider />
              <div style={{ backgroundColor: 'red', width: 150, height: 24 }}></div>
              <Divider />
              <div style={{ backgroundColor: 'red', width: 150, height: 24 }}></div>
              <Divider size={2} />
              <Button text={'Save Datapoint'} />
            </Popup>
            }
          </>
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
  // display: 'flex',
  // flexDirection: 'row',
  width: 500,
  height: 500,
  // boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  // backgroundColor: 'darkgrey',
  // border: '1px solid black',
  padding: '10px'
}

export default ManageDatapoints
