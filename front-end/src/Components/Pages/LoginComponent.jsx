import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userLoginApi } from "../../apis/user-api";

const LoginComponent = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const data = {
      email: userData.email,
      password: btoa(userData.password),
    };
    const user = await userLoginApi(data);
    if (user.status) {
      navigate("/home");
      setValidated(true);
      localStorage.setItem("token", user.data.data.token);
    }
    console.log(user.data.message);
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        className="login"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <img
            alt=""
            src="./images/image.png"
            width="250"
            height="150"
            className="d-inline-block align-center"
          />
        </div>
        <Row className="mb-3">
          <Form.Group controlId="validationCustom01">
            <Form.Label>Email-Id</Form.Label>
            <Form.Control
              required
              type="email"
              value={userData.email}
              name="email"
              onChange={handleChange}
            />
            <Form.Control.Feedback>
              Please enter valid email Id
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
          <Link to="/forgot-password" className="login-link ml-auto">
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
