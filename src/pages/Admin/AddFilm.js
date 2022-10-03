import React, { useState, useEffect } from "react";
import { Button, Form, Container, FloatingLabel } from "react-bootstrap";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import { CgAttachment } from "react-icons/cg";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

function AddFilm() {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    thumbnailFilm: "",
    linkFilm: "",
    price: "",
    desc: "",
    categoryId: "",
  });

  const getCategories = async () => {
    try {
      const response = await API.get("/categorys");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log("handle change", e.target.name);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.thumbnailFilm[0], form.thumbnailFilm[0].name);
      formData.set("linkFilm", form.linkFilm);
      formData.set("price", form.price);
      formData.set("desc", form.desc);
      formData.set("category_id", form.categoryId);

      console.log(form);

      const response = await API.post("/film", formData, config);
      console.log(response);

      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <Container style={{ color: "white" }}>
        <h1 style={{ marginTop: "40px" }}>Add Film</h1>
        <Form onSubmit={(e) => handleSubmit.mutate(e)} style={{ marginBottom: "20px" }}>
          <div style={{ display: "inline-flex" }}>
            <Form.Group>
              <Form.Control type="text" name="title" id="title" onChange={handleChange} style={{ width: "57rem", marginRight: "5px" }} placeholder="Title" />
            </Form.Group>
            <Form.Label for="fileattach" className="d-block p-2 mb-4 ms-2 bg-dark text-white rounded border" type="file" style={{ cursor: "pointer", width: "12rem", textAlign: "center" }}>
              Attach Thumbnail
              <CgAttachment className="text-danger mx-2" />
            </Form.Label>
            <Form.Control type="file" id="fileattach" name="thumbnailFilm" onChange={handleChange} hidden />
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <select className="form-select bg-dark text-white" aria-label="Default select example" onChange={handleChange} name="categoryId">
              <option value="">Category</option>
              {categories.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <Form.Group className="mb-4">
            <Form.Control type="number" placeholder="Price" name="price" onChange={handleChange} className="bg-dark text-white" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control type="text" placeholder="Link Film" name="linkFilm" onChange={handleChange} className="bg-dark text-white" />
          </Form.Group>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control className="bg-dark" as="textarea" placeholder="Description" name="desc" onChange={handleChange} style={{ height: "100px" }} />
          </FloatingLabel>
          <Button variant="danger" className="mt-4" type="submit">
            Add Film
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddFilm;
