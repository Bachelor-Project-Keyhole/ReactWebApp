import { Component } from 'react';
import * as React from 'react'
import { Navigate } from 'react-router-dom';
import AuthService from '../../contexts/Authentication/AuthService'
import authorizationHeader from '../../contexts/Authentication/AuthorizationHeader'
import { IUserResponse } from '../../types/user.type'
import UserService from '../../contexts/Authentication/UserService'

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
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return currentUser.user?.id && currentUser.user?.roles ? (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>Profile</h3>
            </header>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.user.email}
            </p>
            <strong>Authorities: </strong>
            {UserService.getUserRole(currentUser.user.roles)}
          </div> : null}
      </div>
    ) :
    (
      <>
      </>
    )
  }
}
