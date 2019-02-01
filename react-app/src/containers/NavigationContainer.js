import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// presentational components
import Navigation from '../components/Navigation'
import { 
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap'
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
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => this.props.history.push('/app')}>Redject</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown alignRight title="Username" id="nav-dropdown">
                <NavDropdown.Item onClick={() => this.props.history.push('/profile') }>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    } else {
      return (
        <Navigation>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand onClick={() => this.props.history.push('/')}>Redject</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link>
                  <Button variant="link" onClick={() => this.props.history.push('/login')}>Login</Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="outline-primary" onClick={() => this.props.history.push('/registration')}>Sign Up</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
