import React from 'react'
import { connect } from 'react-redux'
// presentational components
import ProfileForm from '../../components/auth/ProfileForm'


class Profile extends React.Component {
  render() {
    return (
      <div className="App">
        <ProfileForm user={this.props.user} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.restAuth.user,
})

// const mapDispatchToProps = dispatch => {
//   return {
//     validate: (res) => dispatch(validate(res)),
//   }
// }

export default connect(mapStateToProps, undefined)(Profile)