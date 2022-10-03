import { Button, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../assets/userContext";
import NavbarUser from "../../components/Navbar/NavbarUser";
import CinemaOnline from "../../assets/img/CinemaOnline.png";
import { useQuery, useMutation } from "react-query";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function DetailFilm() {
  const [show, setShow] = useState(false);
  const [state] = useContext(UserContext);

  let navigate = useNavigate();
  let { id } = useParams();
  let { data: film } = useQuery("productCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });
  console.log(film);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-ny35KDHwbSjQOX6u";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async () => {
    try {
      const data = {
        price: film.price,
      };
      console.log(data);

      const body = JSON.stringify(data);

      const config = {
        headers: {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body,
        },
      };
      console.log(config);

      const response = await API.post("/transaction", config);
      console.log(response);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          navigate("/profile");
        },
        onPending: function (result) {
          navigate("/profile");
        },
        onError: function (result) {},
        onClose: function () {
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <NavbarUser />
      <Row>
        <Col>
          <Card.Img variant="top" style={{ padding: "70px", width: "105%" }} src={film?.thumbnailFilm} />
        </Col>
        <Col md={7}>
          <div className="mt-5 text-white fw-bold d-flex" style={{ fontSize: "30px" }}>
            <div>{film?.title}</div>
            <Button variant="danger" onClick={handleShow} style={{ marginLeft: "24rem", fontWeight: "bold" }}>
              Buy Now
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header className="bg-black" closeButton>
                <Modal.Title>
                  <img style={{ width: "80%", marginLeft: "5rem" }} src={CinemaOnline} />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-black">
                <div style={{ fontSize: "20px", color: "whitesmoke", fontWeight: "700" }}>{film?.title}</div>
                <div style={{ color: "whitesmoke" }}>Total : Rp. {film?.price}</div>
                <div>
                  <Form.Group className="mb-3 mt-2">
                    <Form.Control type="email" placeholder="Input your number account" />
                    <Button className="mt-3" variant="danger">
                      Attach Payment
                    </Button>
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer className="bg-black">
                <Button variant="danger" style={{ width: "100%" }} onClick={() => handleBuy.mutate()} type="submit">
                  Pay
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="mt-4">
            <iframe width="660" height="315" src={film?.linkFilm} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="mt-3">
            <p className="fw-bold text-white">{film?.category?.name}</p>
            <p className="fw-bold text-danger">Rp. {film?.price}</p>
            <p style={{ width: "660px", color: "white" }}>{film?.desc}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailFilm;
