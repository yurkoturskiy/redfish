import React from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'
import { 
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap'
import icon from '../../static/icon.svg'

const logoutQuery = gql`
  query {
    logout(input: {}) @rest(type: "Logout", method: "POST", path: "rest-auth/logout/") {
      __typename
    }
  }
`

function NavBar(props) {
  const logout = () => {
    props.client.query({query: logoutQuery})
    localStorage.removeItem('token')
    props.client.writeData({ data: { isAuth: false } })
    props.history.push('/login')
    console.log('logout')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={() => props.history.push('/app')}>
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
            <NavDropdown.Item onClick={() => props.history.push('/profile') }>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withApollo(withRouter(NavBar))