import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import ActionModal from "../Atoms/ModalComponent";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="mb-1">
        <Container fluid>
          <img
            alt="Digitalflake Logo"
            src="./images/logo.png"
            width="250"
            height="30"
            className="d-inline-block align-top"
          />
          <img src="./user.svg" alt="Digitalflake Logo" className="img-fluid icon" onClick={() => handleShowModal()} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <ActionModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAction={handleLogOut}
        title="Log Out"
        bodyMessage="Are you sure you want to Log Out?"
        actionText="Confirm"
        actionVariant="danger"
        cancelText="Delete"
        cancelVariant="secondary"
      />
    </>
  );
};

export default NavbarComponent;
