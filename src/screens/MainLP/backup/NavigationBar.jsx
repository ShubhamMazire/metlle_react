import React from 'react'
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {

  
  return (
    <Navbar expand="lg" style={{position:"absolute",top:0,left:0,right:0,zIndex:100,width:"100%"}} >
       {/* backgroundColor:"#00356E"  */}
    <Navbar.Brand href="#">
      <img
        src={"/images/logo.png"}
        width="120"
        height="35"
        className="d-inline-block align-top"
        alt="logo"
      />
      
    </Navbar.Brand>
    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundolor:"white"}}/>
    <Navbar.Collapse id="basic-navbar-nav" >
      <Nav className="mr-auto" >
        <Nav.Link style={{color:"white"}} href="#">Our Solution</Nav.Link>
        <Nav.Link style={{color:"white"}} href="#">Industries</Nav.Link>
        <Nav.Link style={{color:"white"}} href="#">Resources</Nav.Link>
        <Nav.Link style={{color:"white"}} href="#">Partners</Nav.Link>
        <Nav.Link style={{color:"white"}} href="#">Company</Nav.Link>
        <Nav.Link style={{color:"white"}} href="#">MSaaS</Nav.Link>
        <Nav.Link style={{color:"white"}} href="#">Contact Us</Nav.Link>
      </Nav>
      <Form inline>
        <Nav.Link style={{color:"Green"}} >Order Status</Nav.Link>
        <Button variant="success">Get Your Instant Quotation</Button>
        <Nav.Link varstyle={{color:"white"}} >Sign In</Nav.Link>
      </Form>
    </Navbar.Collapse> */}
  </Navbar>
  )
}

export default NavigationBar
