import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { createUserApi, getUserById, updateUserApi } from "../../apis/user-api";
import { getRolesApi } from "../../apis/role-apis";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserFormComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    userRole: {
      label: "",
      value: "",
    },
  });
  const [rolesOption, setRolesOption] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const [userIdData, setUserIdData] = useState({});
  const status = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = rolesOption.find(
      (role) => role.value === e.target.value
    );
    setUserData((prev) => ({ ...prev, userRole: selectedRole || {} }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      console.log({ userData });
      const createUserResp = await createUserApi(userData);
      if (createUserResp) {
        navigate("/users");
      }
    } else {
      const updates = {};
      if (userData.name !== userIdData.name) {
        updates.name = userData.name;
      }
      if (userData.mobile !== userIdData.mobile) {
        updates.mobile = userData.mobile;
      }
      if (userData.email !== userIdData.email) {
        updates.email = userData.email;
      }
      if (userData.userRole.value !== userIdData.roleId._id) {
        updates.roleId = userData.userRole.value;
      }
      if (userStatus !== userIdData.status) {
        updates.status = userStatus;
      }

      if (Object.keys(updates).length > 0) {
        const response = await updateUserApi({ id, ...updates });
        if (response) {
          navigate("/users");
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const response = await getUserById(id);
        setUserData({
          ...userData,
          name: response.data.data.name,
          mobile: response.data.data.mobile,
          email: response.data.data.email,
          userRole: {
            label: response.data.data.roleId.roleName,
            value: response.data.data.roleId._id,
          },
        });
        setUserStatus(response.data.data.status);
        setUserIdData(response.data.data);
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const getRoles = async () => {
      const rolesRes = await getRolesApi();
      const option = rolesRes.data.data.map((element) => ({
        label: element.roleName,
        value: element._id,
      }));
      setRolesOption(option);
    };
    getRoles();
  }, []);

  return (
    <>
      <Container fluid className="form-header">
        <Link to="/users" className="back-arrow">
          ←
        </Link>
        <h5 className="form-title">{id ? "Edit User" : "Add User"}</h5>
      </Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={userData.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicMob">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                value={userData.mobile}
                name="mobile"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={userData.userRole?.value || ""} // Ensure the value is tied to userRole.value
                name="userRole"
                onChange={handleRoleChange}
              >
                {rolesOption?.map((role, index) => (
                  <option key={index} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
          <Col md={4}>
            {id && (
              <>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={userStatus}
                  name="userRole"
                  onChange={(e) => setUserStatus(e.target.value === "true")}
                >
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
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UserFormComponent;
