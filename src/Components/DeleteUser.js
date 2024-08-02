import React from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const DeleteUser = ({ userId, onConfirmDelete, onCancel }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:9090/user/${userId}`)
      .then((response) => {
        onConfirmDelete(userId);
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUser;
