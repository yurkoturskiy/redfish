import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { withApollo, compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
// presentational components
import Navigation from '../components/Navigation'
import { 
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap'
// graphql
import icon from '../static/icon.svg'
import appState from '../graphql/appState'
import logout from '../graphql/logout'


class NavigationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    this.props.client.query({query: logout})
    localStorage.removeItem('token')
    this.props.client.cache.reset()
    this.props.history.push('/login')
    console.log('logout')
  }
  render() {
    if (this.props.isAuth) {
      return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => this.props.history.push('/app')}>
              <img src={icon} style={{ 
                width: '38px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                borderRadius: '4px'
              }}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown alignRight title="Username" id="nav-dropdown">
                <NavDropdown.Item onClick={() => this.props.history.push('/profile') }>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    } else {
      return (
        <Navigation>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand onClick={() => this.props.history.push('/')}>
              <img src={icon} style={{ 
                width: '38px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                borderRadius: '4px'
              }}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link>
                  <Button variant="link" onClick={() => this.props.history.push('/login')}>
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => this.props.history.push('/registration')}
                  >
                    Sign Up
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Navigation>
      )
    }
  }
}

export default withApollo(withRouter(compose(
  graphql(appState, {
    props: ({ data: { isAuth } }) => ({
      isAuth
    })
  }),
)(NavigationContainer)))
