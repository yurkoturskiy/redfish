import React from "react"
import { connect } from 'react-redux'
// actions
import {
  user
} from '../actions/restAuth'


class Application extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.isAuth) {
      this.props.getUser()
    }
  }
  render() {
    return (
      <React.Fragment>
          <h1>Application</h1>
          <h5>{this.props.user.pk}</h5>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    isAuth: state.restAuth.isAuth,
    user: state.restAuth.user,
})

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(user()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)