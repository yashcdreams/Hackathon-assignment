import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteRoleById, getRolesApi } from "../../apis/role-apis";
import TableComponent from "../Atoms/TableComponent";
import ActionModal from "../Atoms/Modal";

const RoleListComponent = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const handleCloseModal = () => setShowModal(false);
  // Updated columnHeader to use label and value
  const columnHeader = [
    { label: "ID", value: "id" },
    { label: "Role Name", value: "name" },
    { label: "Status", value: "status" },
    { label: "Actions", value: "actions" },
  ];

  const handleDeleteRole = async (id) => {
    const response = await deleteRoleById(userIdToDelete);
    if (response) {
      fetchRoles();
      setUserIdToDelete(null);
      setShowModal(false);
    }
  };

  const handleShowModal = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const fetchRoles = async () => {
    const getRolesApiRes = await getRolesApi();
    const fetchedRoles = getRolesApiRes?.data?.data;

    const formattedRows = fetchedRoles?.map((role, index) => ({
      id: index + 1,
      name: role.roleName,
      status: (
        <span style={{ color: role.status ? "green" : "red" }}>
          {role.status ? "Active" : "Inactive"}
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
            onClick={() => {
              navigate(`/edit-role/${role._id}`);
            }}
          />
          <img
            src="./delete icon.svg"
            alt="delete icon"
            className="me-2"
            width="15"
            height="15"
            onClick={() => handleShowModal(role._id)}
          />
        </td>
      ),
    }));
    setRows(formattedRows);
  };

  useEffect(() => {
    fetchRoles();
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
              <FontAwesomeIcon className="icon" icon={faUserShield} />
              Roles
            </h2>
            <Link to={"/add-role"} className="login-link ml-auto" type="button">
              Add New
            </Link>
          </Container>

          <TableComponent columnHeader={columnHeader} rows={rows} />
        </Tab.Content>
      </Tab.Container>
      <ActionModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAction={handleDeleteRole}
        title="Confirm Delete"
        bodyMessage="Are you sure you want to delete this role?"
        actionText="Delete"
        actionVariant="danger"
        cancelText="Cancel"
        cancelVariant="secondary"
      />
    </>
  );
};

export default RoleListComponent;
