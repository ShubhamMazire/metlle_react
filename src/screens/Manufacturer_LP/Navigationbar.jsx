import React from "react";
import logo from "./images/logo.png";
import { Nav, Container, Navbar } from "react-bootstrap";
import LogoNavigation from "../../../Components/LogoNavigation";
const Navigationbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="transparent-nav">
        <Container>
        <LogoNavigation dark={true} />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link
                href="#deets"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  style={{
                    backgroundColor: "#535CE8FF",
                    color: "white",
                    fontSize: "1rem",
                    padding: "10px 30px",
                    borderRadius: ".5rem",
                    border: "none",
                  }}
                >
                  Get Started
                </button>
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#memes"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    fontSize: "1rem",
                    padding: "10px 30px",
                    borderRadius: ".5rem",
                    border: "none",
                  }}
                >
                  Sign In
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
