import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router";
import axios from "axios";
import Watch from "../Watch/Watch";
import Loader from "../Loader/Loader";

const Watches = () => {
  const history = useHistory();
  const [watches, setWatches] = useState(null);
  const { path } = useRouteMatch();
  useEffect(() => {
    axios
      .get("https://sheltered-ocean-21876.herokuapp.com/watches")
      .then((res) => setWatches(res.data));
  }, [watches?.length]);
  // dynamic routing
  const handlePurchase = (id) => {
    window.scrollTo(0, 40);
    history.push(`purchase/${id}`);
  };

  return (
    <div id="watches">
      <section className="container mobile-device my-5">
        <h2 className="text-center fw-bold">DISCOVER THE FULL COLLECTION</h2>
        <hr />
        <p className="text-muted text-center mx-5">
          Sophisticated engineering, most exquisite materials and iconic design;
          our six collections represent more than 150 years of watchmaking
          expertise.
        </p>
      </section>
      <section>
        <Container>
          {watches ? (
            <Row xs={1} md={2} lg={3} className="g-4 mb-5 ">
              {path === "/" || path === "/home"
                ? watches
                    ?.slice(0, 6)
                    .map((watch) => (
                      <Watch
                        key={watch._id}
                        watch={watch}
                        handlePurchase={handlePurchase}
                      />
                    ))
                : watches?.map((watch) => (
                    <Watch
                      key={watch._id}
                      watch={watch}
                      handlePurchase={handlePurchase}
                    />
                  ))}
            </Row>
          ) : (
            <Loader />
          )}
        </Container>
      </section>
    </div>
  );
};

export default Watches;
