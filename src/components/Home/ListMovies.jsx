import { Link } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import { Card, Container } from "react-bootstrap";

function ListFilm() {
  let { data: film } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    console.log("testing:" ,response)
    return response.data.data;
  });
  console.log(film);

  return (
    <>
      <div style={{ marginTop: "50px", marginLeft: "8rem" }}>
        <h4 className=" text-white ">List Film</h4>
      </div>
      <Container style={{ marginBottom: "20px", justifyContent: "center" }}>
        {film?.map((item, index) => (
          <Link to={`/detail-film/${item.id}`} key={index}>
            <Card as={Link} to={`/detail-film/${item.id}`} style={{ width: "9rem", marginTop: "20px", marginLeft: "40px", border: "1px black solid", borderRadius: "40px", display: "inline-flex" }}>
              <Card.Img variant="top" src={item.thumbnailFilm} />
              <Card.Text></Card.Text>
            </Card>
          </Link>
        ))}
      </Container>
    </>
  );
}

export default ListFilm;
