import React, { useContext, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { UserContext } from "../../assets/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function RegisterModal({ registerShow, setRegisterShow, registerHere }) {
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      console.log(body);

      const response = await API.post("/register", body, config);
      console.log(response);

      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success, please login to continue..
          </Alert>
        );

        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
      if (error.message == "Request failed with status code 400") {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Failed, please fill all fields..
          </Alert>
        );
        setMessage(alertPassword);
      }
      if (error.response.data.code == 403) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Email has already been registered!
          </Alert>
        );
        setMessage(alertPassword);
      }
    }
  });

  return (
    <>
      <Modal show={registerShow} onHide={() => setRegisterShow(false)} animation={true}>
        <Modal.Header className="bg-dark">
          <Modal.Title className="bg-dark text-white">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" id="ShowPass" value={password} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" name="fullName" value={fullName} onChange={handleChange} />
            </Form.Group>
            <Button style={{ width: "100%" }} variant="danger" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark justify-content-center align-center">
          <p style={{ color: "white" }}>
            Already have an account?
            <a style={{ color: "white" }} onClick={registerHere} className="btnHere text-decoration-none ms-1">
              Click here
            </a>
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;
