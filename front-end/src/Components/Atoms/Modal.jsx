import React from "react";
import { Modal, Button } from "react-bootstrap";

const ActionModal = ({
  show,
  handleClose,
  handleAction,
  title,
  bodyMessage,
  actionText = "Confirm",
  actionVariant = "primary",
  cancelText = "Cancel",
  cancelVariant = "secondary",
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelVariant} onClick={handleClose}>
          {cancelText}
        </Button>
        <Button variant={actionVariant} onClick={handleAction}>
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionModal;
