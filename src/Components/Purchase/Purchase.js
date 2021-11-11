import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import Loader from "../Loader/Loader";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const Purchase = () => {
  const { id } = useParams();
  //getting user info
  const {
    currentUser: { displayName, email },
  } = useAuth();
  const [particularWatch, setParticularWatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    data.status = "Pending";
    data.order = particularWatch;
    axios
      .post("https://sheltered-ocean-21876.herokuapp.com/orders", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            "Ordered",
            `Successfully ordered ${particularWatch?.name}`,
            "success"
          );
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`https://sheltered-ocean-21876.herokuapp.com/watches/${id}`)
      .then((res) => setParticularWatch(res.data));
  }, [id]);
  return (
    <div className="my-5 ">
      {particularWatch ? (
        <div className="row ms-lg-5 me-lg-2 mx-3">
          <div
            style={{ borderRadius: "35px" }}
            className="col-lg-7 col-12 p-lg-5 p-3 border border-secondary mt-5 mb-2 me-5"
          >
            <h2>{particularWatch?.name}</h2>
            <h3 className="text-danger">Price: ${particularWatch?.price}</h3>
            <img
              className="img-fluid w-25 my-4"
              src={particularWatch?.image}
              alt=""
            />
            <h2>About </h2>
            <p>{particularWatch?.longDescription}</p>
          </div>
          <div
            style={{ borderRadius: "35px" }}
            className="col-lg-4 col-12 p-3 border border-secondary mt-5 mb-2 ms-lg-3"
          >
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">Full Name</Form.Label>
                <Form.Control
                  required
                  defaultValue={displayName}
                  type="text"
                  className="fs-5"
                  placeholder="Your Full Name"
                  {...register("name")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">Email address</Form.Label>
                <Form.Control
                  required
                  defaultValue={email}
                  type="email"
                  className="fs-5"
                  placeholder="Your Email"
                  {...register("email")}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">Your Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  className="fs-5"
                  placeholder="Your Phone Number"
                  {...register("phone")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">Address</Form.Label>
                <Form.Control
                  required
                  className="fs-5"
                  placeholder="Enter address"
                  {...register("address")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">Any special message</Form.Label>
                <Form.Control
                  className="fs-5"
                  as="textarea"
                  placeholder="Message"
                  rows={4}
                  {...register("message")}
                />
              </Form.Group>
              {loading ? (
                <Button
                  variant="primary"
                  className="my-5 w-100 p-2 fs-5 shadow-none"
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="my-5 w-100 p-2 fs-5 shadow-none "
                >
                  Place Order
                </Button>
              )}
            </Form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Purchase;
