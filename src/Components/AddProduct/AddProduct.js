import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Row, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ImageUploader from "react-images-upload";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import CommonButton from "../StyledComponents/CommonButton/CommonButton";

const AddService = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm(); // initialize the hook
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    if (!picture) {
      setError("Image is required");
      setLoading(false);
    } else {
      data.image = picture;
      axios
        .post("https://sheltered-ocean-21876.herokuapp.com/watches", data)
        .then(() => setLoading(false))
        .then(() => {
          Swal.fire(
            "Good job!",
            "Successfully added a new service!",
            "success"
          ).then(() => {
            window.scrollTo(0, 40);
            history.push("/watches");
          });
        });
    }
  };
  const [picture, setPicture] = useState("");
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setPicture(pictureDataURLs);
  };
  return (
    <Container
      style={{ borderRadius: "35px" }}
      className="p-5 bg-white my-5 text-black"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xs={1} sm={1} md={2}>
          <div className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Watch Name</Form.Label>
              <Form.Control
                {...register("name")}
                required
                type="text"
                placeholder="Enter Watch Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Short Description For The Watch
              </Form.Label>
              <Form.Control
                required
                {...register("shortDescription")}
                as="textarea"
                placeholder="Enter Short Description"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">About</Form.Label>
              <Form.Control
                required
                {...register("longDescription")}
                as="textarea"
                placeholder="About the watch"
                rows={3}
              />
            </Form.Group>
          </div>
          <div className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Control
                required
                type="number"
                {...register("price")}
                placeholder="Enter Price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Banner</Form.Label>
              <div>
                {picture ? (
                  <img className="w-25" src={picture ? picture : ""} alt="" />
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  ""
                )}
                <ImageUploader
                  withIcon
                  className="shadow w-100"
                  labelStyles={{ color: "black" }}
                  onChange={onDrop}
                  singleImage
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </div>
            </Form.Group>
            {loading ? (
              <CommonButton className="ms-auto d-block my-5 w-50" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </CommonButton>
            ) : (
              <CommonButton className="ms-auto d-block my-5 w-50" type="submit">
                Add Watch
              </CommonButton>
            )}
          </div>
        </Row>
      </Form>
    </Container>
  );
};

export default AddService;
