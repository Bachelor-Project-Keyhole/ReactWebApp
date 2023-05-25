import { Component } from 'react'
import * as React from 'react'
import Title from '../../components/Title'

import UserService from '../../contexts/Authentication/UserService'

type Props = {}

type State = {
  content: string
}

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      content: 'This should be seen by all logged in users'
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Title text={this.state.content} />
      </div>
    );
  }
}