import React from "react";
import NavbarUser from "../../components/Navbar/NavbarUser";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import Dummy from "../../assets/dummy/dataDummy.json";

export default function UserListFilm() {
  return (
    <>
      <NavbarUser />
      <Container>
        <h2 style={{ color: "whitesmoke", marginTop: "20px" }}>My List Film</h2>
        {Dummy.map((data) => {
          return (
            <Card as={Link} to={`/detail-film/${data.id}`} style={{ width: "9rem", marginTop: "20px", marginLeft: "40px", border: "1px black solid", borderRadius: "40px", display: "inline-flex" }}>
              <Card.Img variant="top" src={data.image} />
              <Card.Text></Card.Text>
            </Card>
          );
        })}
      </Container>
    </>
  );
}
