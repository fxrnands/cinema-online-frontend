import { Card, Container, Button } from "react-bootstrap";
import JumbotronBackground from "../../assets/img/deadpool-bg.png";
import JumbotronTitle from "../../assets/img/deadpool-logo.png";

function Jumbotron() {
  return (
    <Container>
      <Card className="bg-dark text-white mt-4">
        <Card.Img src={JumbotronBackground} alt="Background" />
        <Card.ImgOverlay style={{ padding: "50px" }}>
          <img src={JumbotronTitle} alt="Title" />
          <Card.Title style={{ marginTop: "20px" }}>Action</Card.Title>
          <Card.Title style={{ marginTop: "10px", marginBottom: "20px" }} className="text-danger">Rp. 99.000</Card.Title>
          <Card.Text style={{ width: "681px" }}>
            Hold onto your chimichangas, folks. From the studio that brought you all 3 Taken films comes the block-busting, fourth-wall-breaking masterpiece about Marvel Comics’ sexiest anti-hero! Starring God’s perfect idiot Ryan Reynolds
            and a bunch of other "actors," DEADPOOL is a giddy slice of awesomeness packed with more twists than Deadpool’s enemies’ intestines and more action than prom night. Amazeballs!
          </Card.Text>
          <Button variant="danger" type="submit">
            Buy Now
          </Button>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
}

export default Jumbotron;
