import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar"; // Assuming Sidebar is in the same directory
import NavbarComponent from "./Navbar";
import { Outlet } from "react-router-dom";

const MainComponent = () => {
  return (
    <>
      <NavbarComponent />

      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={9}>
            <div className="content-wrapper p-3">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainComponent;
