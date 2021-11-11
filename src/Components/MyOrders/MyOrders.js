import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Container, Badge, Row, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import "./myOrders.css";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState(null);
  const {
    currentUser: { email },
  } = useAuth();
  //getting the user bookings
  useEffect(() => {
    axios
      .get(`https://sheltered-ocean-21876.herokuapp.com/orders/${email}`)
      .then((res) => setMyOrders(res.data));
  }, [email]);

  //confirming deletion
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure to cancel it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        axios
          .delete(`https://sheltered-ocean-21876.herokuapp.com/orders/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = myOrders.filter(
                (myOrder) => myOrder._id !== id
              );
              setMyOrders(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      {myOrders ? (
        <Container
          style={{ color: "black", marginTop: "50px", marginBottom: "100px" }}
        >
          {!myOrders?.length ? (
            <div>
              <h1 className="text-center mt-5 pt-5">
                You don't have any Orders yet
              </h1>
            </div>
          ) : (
            <Row xs={1} sm={2} md={2} className="g-4">
              {myOrders?.map((myOrder) => {
                const {
                  _id,
                  status,
                  order: { name, image, shortDescription, price },
                } = myOrder;
                return (
                  <div
                    style={{ backGround: "rgb(17 24 39)", zIndex: 1000 }}
                    key={_id}
                  >
                    <div
                      style={{ borderRadius: "13px" }}
                      className="d-flex flex-column flex-lg-row border p-3 justify-content-start h-100"
                    >
                      <div className="me-5 w-100 mb-3">
                        <div className="d-flex align-items-center flex-column ">
                          <img
                            className="img-fluid rounded orderImage"
                            loading="lazy"
                            src={image}
                            alt={name}
                          />
                          <h5 className="mt-3">Price : ${price}</h5>
                        </div>
                      </div>
                      <div>
                        <h4>{name}</h4>
                        <Badge
                          className="px-2 pb-2 pt-1"
                          pill
                          bg={`${
                            status === "Pending"
                              ? "warning"
                              : status === "Rejected"
                              ? "danger"
                              : "success"
                          }`}
                        >
                          {status}
                        </Badge>
                        <p className="text-muted">{shortDescription}</p>
                      </div>
                      <div className="d-block ms-auto mt-auto">
                        <Button
                          onClick={() => handleCancel(_id)}
                          className="shadow-none ms-auto "
                          variant="danger"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyOrders;
