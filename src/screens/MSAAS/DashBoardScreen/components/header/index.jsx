import React from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../images/Image 22.png";
import "./style.css";
const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar-div">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="" className="img-fluid" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown
              title="Vivhek Mahajan"
              id="collasible-nav-dropdown"
              className="text-nav"
            >
              <NavDropdown.Item href="#action/3.1" className="text-nav">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="text-nav">
                Another action
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#deets" className="text-nav">
              Contact us
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className="text-nav">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
