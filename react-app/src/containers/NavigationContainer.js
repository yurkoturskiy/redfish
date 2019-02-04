import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { compose, graphql } from 'react-apollo'
// presentational components
import Navigation from '../components/Navigation'
import { 
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap'
// graphql
import appState from '../graphql/appState'
import logout from '../graphql/logout'


class NavigationContainer extends React.Component {
  render() {
    if (this.props.appState.isAuth) {
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

export default withRouter(compose(
  graphql(logout, { name: 'logout' }),
  graphql(appState, {
    props: ({ data: { appState } }) => ({
      appState
    })
  }),
)(NavigationContainer))
