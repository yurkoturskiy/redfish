import React from "react"
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import history from '../history'
import styled from 'styled-components'

import NavigationContainer from './NavigationContainer'
import Hero from '../components/Hero'

const Title = styled.h1`
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  color: palevioletred;
`;

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Hero>
            <Title>Blank React-Django project</Title>
        </Hero>
        <Hero>
          <h1>Second view</h1>
        </Hero>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
      isAuth: state.restAuth.isAuth,
  }
}

// const mapDispatchToProps = dispatch => {
//  return {
//    wsSend: (msg) => (dispatch(send(msg)))
//  }
// }

export default withRouter(connect(mapStateToProps, undefined)(Main))