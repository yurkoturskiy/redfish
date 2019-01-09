import React from 'react'
import { connect } from 'react-redux'
// presentational components
import ProfileForm from '../../components/auth/ProfileForm'
// actions
import { user, validate } from '../../actions/restAuth'


class Profile extends React.Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)