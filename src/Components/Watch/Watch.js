import React from "react";
import { Card, Col } from "react-bootstrap";
import Loader from "../Loader/Loader";
import CommonButton from "../StyledComponents/CommonButton/CommonButton";
import "./Watch.css";

const Watch = (props) => {
  const { name, image, shortDescription, price, _id } = props.watch;
  return (
    <>
      {name ? (
        <Col>
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
              <Card.Text className="text-muted">{shortDescription}</Card.Text>
              <h5 className="mt-auto text-danger">${price}</h5>
              <CommonButton
                className="mt-auto"
                onClick={() => props.handlePurchase(_id)}
                type="button"
              >
                Buy Now
              </CommonButton>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Watch;
