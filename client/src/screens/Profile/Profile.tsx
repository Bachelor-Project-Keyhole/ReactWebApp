import { Component } from 'react';
import * as React from 'react'
import { Navigate } from 'react-router-dom';
import authorizationHeader from '../../contexts/Authentication/AuthorizationHeader'
import { IUserResponse } from '../../types/user.type'
import UserService from '../../contexts/Authentication/UserService'
import SubHeader from '../../components/SubHeader/SubHeader';

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUserResponse & { accessToken: string }
}

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: '' }
    }
  }

  componentDidMount() {
    const currentUser = UserService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return currentUser.user?.id && currentUser.user?.roles ? (
      <div style={{ ...wrapperStyles }}>
        <div style={{ ...componentStyles }}>
        {(this.state.userReady) ?
          <div>
            <SubHeader text='Profile' />
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.user.email}
            </p>
            <strong>Authority: </strong>
            {UserService.getUserRole(currentUser.user.roles)}
          </div> : null}
        </div>
      </div>
    ) :
    (
      <>
      </>
    )
  }
}

export const wrapperStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(to bottom right, #0a0c27, #0a2444, #0a3c61, #0a547e)'
}

const componentStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'white',
  alignItems: 'center',
  width: '40vh',
  height: '50vh',
  borderRadius: 25,
  border: '3px solid #D3D3D3',
  paddingBottom: '1vh',
  paddingTop: '2vh',
}
