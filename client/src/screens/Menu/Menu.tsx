import * as React from 'react'
import MenuLayout from '../../components/MenuLayout'
import Popup from '../../components/Popup/Popup'
import { useNavigate } from 'react-router-dom'

const Menu = ({ ...props }: any): JSX.Element => {
  const navigate = useNavigate()

  const manageDatapointHandler = React.useCallback(() => {
    navigate('/manage-datapoint')
  }, [navigate])

  return (
        <MenuLayout onManageDatapointClick={manageDatapointHandler}>
            {/* <Popup></Popup> */}
        </MenuLayout>
  )
}

export default Menu
