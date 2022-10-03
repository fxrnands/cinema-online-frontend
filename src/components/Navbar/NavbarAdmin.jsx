import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/userContext";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import NavbarLogo from "../../assets/img/NavbarIcon.png";
import ProfilePicture from "../../assets/img/profile.jpg";

export default function NavbarAfterLogin() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand as={Link} to="/transaction" style={{ height: "46px" }}>
            <img src={NavbarLogo} />
          </Navbar.Brand>
          <div style={{ width: "50px" }}>
            <NavDropdown
              bg="dark"
              variant="dark"
              style={{ backgroundColor: "black", color: "white" }}
              as={Link}
              to="/profile"
              title={<img style={{ border: "1px red solid", width: "70%", borderRadius: "50px" }} src={ProfilePicture} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item bg="dark" variant="dark" as={Link} to="/add-film" href="#action/3.1">
                Add Film
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
