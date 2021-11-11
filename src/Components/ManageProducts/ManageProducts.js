import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

const Watches = () => {
  const [watches, setWatches] = useState(null);
  useEffect(() => {
    axios
      .get("https://sheltered-ocean-21876.herokuapp.com/watches")
      .then((res) => setWatches(res.data));
  }, [watches?.length]);

  //confirming deletion
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure to delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Removed!",
          "Successfully removed the watch from collection",
          "success"
        );
        axios
          .delete(`https://sheltered-ocean-21876.herokuapp.com/watches/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = watches.filter((watch) => watch._id !== id);
              setWatches(remaining);
            }
          });
      }
    });
  };

  return (
    <div>
      <Container className="text-black my-5 pb-5">
        {watches ? (
          <Row xs={1} md={2} lg={3} className="g-4 mb-5 ">
            {watches?.map((watch) => {
              const { name, image, price, _id } = watch;
              return (
                <Col key={_id}>
                  <Card className="border-0 h-100 text-center watch shadow ">
                    <div className="watch-image">
                      <Card.Img
                        className="img-fluid lazy-loaded w-50"
                        src={image}
                        loading="lazy"
                        alt={name}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>
                        <h6 className="fw-bold">{name}</h6>
                      </Card.Title>
                      <h5 className="mt-auto text-danger">${price}</h5>
                      <Button
                        onClick={() => handleRemove(_id)}
                        className="shadow-none mx-auto my-3"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  );
};

export default Watches;
