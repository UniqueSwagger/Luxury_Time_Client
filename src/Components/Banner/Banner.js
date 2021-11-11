import React from "react";
import { Carousel, Container } from "react-bootstrap";
import banner1 from "../../images/banner-1.png";
import banner2 from "../../images/banner-2.png";
import banner3 from "../../images/banner-3.jpg";
import "./Banner.css";
const Banner = () => {
  return (
    <Container className="my-2">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="img-fluid d-block w-100"
            src={banner1}
            alt="Banner 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-fluid d-block w-100"
            src={banner2}
            alt="Banner 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "558px" }}
            className="img-fluid d-block w-100 banner3"
            src={banner3}
            alt="Banner 3"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Banner;
