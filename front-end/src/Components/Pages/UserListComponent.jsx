import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../Atoms/TableComponent";
import { deleteUserById, getUsersApi } from "../../apis/user-api";
import ActionModal from "../Atoms/Modal"; // Import the reusable modal

const UserListComponent = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const navigate = useNavigate();

  const columnHeader = [
    { label: "Id", value: "id" },
    { label: "Name", value: "name" },
    { label: "Mobile", value: "mobile" },
    { label: "Email-Id", value: "email" },
    { label: "Role", value: "userRole" },
    { label: "Status", value: "status" },
    { label: "Actions", value: "actions" },
  ];

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    await deleteUserById(userIdToDelete);
    setShowModal(false);
    fetchUsers();
  };

  const fetchUsers = async () => {
    const getUsersApiRes = await getUsersApi();
    const fetchedUsers = getUsersApiRes?.data?.data;

    const formattedRows = fetchedUsers?.map((user, index) => ({
      id: index + 1,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      userRole: user.userRole,
      status: (
        <span style={{ color: user.status ? "green" : "red" }}>
          {user.status ? "Active" : "Inactive"}
        </span>
      ),
      actions: (
        <td>
          <img
            src="./edit icon.svg"
            alt="edit icon"
            className="me-2"
            width="15"
            height="15"
            onClick={() => navigate(`/edit-user/${user._id}`)}
          />
          <img
            src="./delete icon.svg"
            alt="delete icon"
            className="me-2"
            width="15"
            height="15"
            onClick={() => handleShowModal(user._id)}
          />
        </td>
      ),
    }));
    setRows(formattedRows);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Tab.Container>
        <Tab.Content>
          <Container
            fluid
            className="d-flex justify-content-between align-items-center mt-3"
          >
            <h2>
              <FontAwesomeIcon className="icon" icon={faUsers} />
              User
            </h2>
            <Link to={"/add-user"} className="login-link ml-auto" type="button">
              Add New
            </Link>
          </Container>

          <TableComponent columnHeader={columnHeader} rows={rows} />
        </Tab.Content>
      </Tab.Container>

      <ActionModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAction={handleDeleteUser}
        title="Confirm Delete"
        bodyMessage="Are you sure you want to delete this user?"
        actionText="Delete"
        actionVariant="danger"
        cancelText="Cancel"
        cancelVariant="secondary"
      />
    </>
  );
};

export default UserListComponent;
