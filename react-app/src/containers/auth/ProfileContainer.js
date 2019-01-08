import {connect} from 'react-redux'
import React, { Component } from 'react';
import ProfileForm from '../../components/auth/ProfileForm'
import {withRouter} from 'react-router'
import {user, validate} from '../../actions/restAuth'


class Profile extends Component {
  render() {
    return (
      <div className="App">
        <ProfileForm user={this.props.user} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.restAuth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(user()),
    validate: (res) => dispatch(validate(res)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))