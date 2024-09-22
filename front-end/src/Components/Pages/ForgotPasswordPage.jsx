import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <Container fluid className="login">
      <h2>Did you forget your password?</h2>
      <p>
        Enter your email address and we'll send you a link to restore password
      </p>
      <Form>
        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="primary">Request reset link</Button>
          <Link to="/" className="login-link ml-auto">
            back to log in
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPasswordPage;
