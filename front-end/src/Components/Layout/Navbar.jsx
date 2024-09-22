import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="mb-1">
      <Container fluid>
        <img
          alt=""
          src="./images/logo.png"
          width="250"
          height="30"
          sName="d-inline-block align-top"
        />
        <img
          src="./user.svg"
          alt="Digitalflake Logo"
          className="img-fluid icon"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
