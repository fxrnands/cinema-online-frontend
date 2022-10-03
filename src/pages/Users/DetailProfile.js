import React, { useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ProfilePicture from "../../assets/img/profile.jpg";
import NavbarUser from "../../components/Navbar/NavbarUser";
import { UserContext } from "../../assets/userContext";

export default function DetailProfile() {
  const [state] = useContext(UserContext);
  return (
    <>
      <NavbarUser />
      <Container>
        <Row>
          <Col>
            <h2 style={{ color: "whitesmoke", marginTop: "40px", marginBottom: "40px" }}>My Profile</h2>
            <div style={{ display: "inline-flex" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={ProfilePicture} />
              </Card>
              <div className="ms-3">
                <h4 style={{ color: "#CD2E71", fontWeight: "bold", marginBottom: "20px" }}>Full Name</h4>
                <p style={{ color: "white", fontWeight: "600" }}>{state.user.fullName}</p>
                <h4 style={{ color: "#CD2E71", fontWeight: "bold", marginBottom: "20px" }}>Email</h4>
                <p style={{ color: "white", fontWeight: "600" }}>{state.user.email}</p>
                <h4 style={{ color: "#CD2E71", fontWeight: "bold", marginBottom: "20px" }}>Phone</h4>
                <p style={{ color: "white", fontWeight: "600" }}>081286317715</p>
              </div>
            </div>
          </Col>
          <Col>
            <h2 style={{ color: "whitesmoke", marginTop: "40px", marginBottom: "20px" }}>Transaction History</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}
