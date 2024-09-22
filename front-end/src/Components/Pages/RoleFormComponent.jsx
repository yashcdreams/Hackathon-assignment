import React, { useEffect, useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addRoleApi, getRoleById, updateRoleApi } from "../../apis/role-apis";

const RoleFormComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [roleStatus, setRoleStatus] = useState(false);
  const [roleIdData, setRoleIdData] = useState({});
  const status = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      let response = await addRoleApi({ roleName });
      if (response) {
        navigate("/roles");
      }
    } else {
      const updates = {};
      if (roleName !== roleIdData.roleName) {
        updates.roleName = roleName;
      }
      if (roleStatus !== roleIdData.status) {
        updates.status = roleStatus;
      }

      if (Object.keys(updates).length > 0) {
        let response = await updateRoleApi({ id, ...updates });
        if (response) {
          navigate("/roles");
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchRole = async () => {
        try {
          const response = await getRoleById(id);
          setRoleName(response.data.data.roleName);
          setRoleStatus(response.data.data.status);
          setRoleIdData(response.data);
        } catch (error) {
          console.error("Failed to fetch role", error);
        }
      };

      fetchRole();
    }
  }, [id]);

  return (
    <>
      <Container fluid className="form-header">
        <Link to="/roles" className="back-arrow">
          ←
        </Link>
        <h5 className="form-title">{id ? "Edit Role" : "Add Role"}</h5>
      </Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            {id && (
              <>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={roleStatus}
                  name="userRole"
                  onChange={(e) => setRoleStatus(e.target.value === "true")}
                >
                  <option value="">Select</option>
                  {status.map((val, index) => (
                    <option key={index} value={val.value}>
                      {val.label}
                    </option>
                  ))}
                </Form.Control>
              </>
            )}
          </Col>
        </Row>
        <Button variant="outline-primary" type="submit" className="mt-3 me-5">
          <Link to={"/roles"}>Cancel</Link>
        </Button>
        <Button variant="primary" type="submit" className="mt-3">
          Save
        </Button>
      </Form>
    </>
  );
};

export default RoleFormComponent;
