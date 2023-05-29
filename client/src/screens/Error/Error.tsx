import * as React from 'react'
import SubHeader from '../../components/SubHeader/SubHeader'

const Error = () => {
    return (
        <div style={{ ...mainDivStyle }}>
          <SubHeader text='The resource that you are trying to access 
            is currently unavailable or you do not have the neccessary
              permisions for it.' style={{ color: 'white' }} />
        </div>
    )
}

export const mainDivStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
}

export default Error