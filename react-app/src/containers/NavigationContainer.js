import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// presentational components
import Navigation from '../components/Navigation'
import { 
  Navbar, 
  Container, 
  NavbarToggler,
  Collapse,
  Nav,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  A,
} from '@bootstrap-styled/v4'
// actions
import { logout } from '../actions/restAuth'

const initialState = {
  showNavbar: false,
  dropdownOpen: false,
};

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  componentDidMount() {
    console.log(this)
  }
  render() {
    if (this.props.isAuth) {
      return (
        <Navbar color="dark" light toggleable="sm">
          <Container>
            <NavbarBrand onClick={() => this.props.history.push('/app')}>Redject</NavbarBrand>
            <NavbarToggler onClick={() => this.setState({ showNavbar: !this.state.showNavbar})} />
            <Collapse navbar isOpen={this.state.showNavbar}>
              <Nav navbar>
                <NavDropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen})}>
                  <DropdownToggle nav caret>
                    Username
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header onClick={() => this.props.history.push('/profile')} >Profile</DropdownItem>
                    <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </NavDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      )
    } else {
      return (
        <Navigation>
          <ul>
            <Link to="/"><li>redject</li></Link>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/registration"><li>Registration</li></Link>
          </ul>
          {this.props.children}
        </Navigation>
      )
    }
  }
}

const mapStateToProps = state => ({
  isAuth: state.restAuth.isAuth,
  username: state.restAuth.user.username
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationContainer))
