import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { UserContext } from "../../assets/userContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

function LoginModal({ loginShow, setLoginShow, loginHere }) {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      console.log("user submit", state);

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      // Checking process

      if (response.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        // console.log(response);
        // Status check
        if (response.data.data.role === "admin") {
          navigate("/transaction");
        } else {
          navigate("/user");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.code == 403) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Email not found!
          </Alert>
        );
        setMessage(alertPassword);
      }
      if (error.response.data.code == 404) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Password not match!
          </Alert>
        );
        setMessage(alertPassword);
      }
    }
  });

  return (
    <>
      <Modal style={{ borderRadius: "40px" }} show={loginShow} onHide={() => setLoginShow(false)} animation={true}>
        <Modal.Header className="bg-dark">
          <Modal.Title className="text-white">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" id="ShowPass" value={password} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button style={{ width: "100%" }} variant="danger" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark justify-content-center align-center">
          <p style={{ color: "white" }}>
            Don't have an account?
            <a style={{ color: "white" }} onClick={loginHere} className="btnHere text-decoration-none ms-1">
              Click here
            </a>
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
