import React from "react";
import { css } from "linaria";
import { withRouter } from "react-router";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import icon from "../../static/icon.svg";

const navigation = css`
  position: absolute;
  width: 100%;
  height: 100px;
  z-index: 1;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li:hover {
    background-color: #f0f0f0;
  }
`;

function NavBar(props) {
  return (
    <nav className={navigation}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={() => props.history.push("/")}>
          <img
            src={icon}
            style={{
              width: "38px",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              borderRadius: "4px"
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link>
              <Button
                variant="link"
                onClick={() => props.history.push("/login")}
              >
                Login
              </Button>
            </Nav.Link>
            <Nav.Link>
              <Button
                variant="outline-primary"
                onClick={() => props.history.push("/registration")}
              >
                Sign Up
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}

export default withRouter(NavBar);
