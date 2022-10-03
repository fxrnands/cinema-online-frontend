import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Navbar, Container, Button } from "react-bootstrap";
import NavbarLogo from "../../assets/img/NavbarIcon.png";
import Login from "../Modal/LoginModal";
import Register from "../Modal/RegisterModal";

export default function NavbarUser() {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);

  const registerHere = (e) => {
    e.preventDefault();
    setRegisterShow(false);
    setLoginShow(true);
  };

  const loginHere = (e) => {
    e.preventDefault();
    setLoginShow(false);
    setRegisterShow(true);
  };
  return (
    <div>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ height: "46px" }}>
            <img src={NavbarLogo} />
          </Navbar.Brand>
          <div>
            <Button variant="dark" className="btnlogin me-2 fw-bold" onClick={() => setLoginShow(true)}>
              Login
            </Button>
            <Button variant="danger" className="btnregist fw-bold" onClick={() => setRegisterShow(true)}>
              Register
            </Button>
          </div>
        </Container>
      </Navbar>

      <Login loginHere={loginHere} loginShow={loginShow} setLoginShow={setLoginShow} />
      <Register registerHere={registerHere} registerShow={registerShow} setRegisterShow={setRegisterShow} />
    </div>
  );
}
