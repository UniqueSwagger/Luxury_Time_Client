import React from "react";
import Banner from "../Banner/Banner";
import CommonButton from "../StyledComponents/CommonButton/CommonButton";
import Watches from "../Watches/Watches";
import { useHistory } from "react-router-dom";
import CustomerReview from "../CustomerReview/CustomerReview";
import ContactUs from "../ContactUs/ContactUs";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
  const history = useHistory();
  const handleExplore = () => {
    window.scrollTo(0, 40);
    history.push("/watches");
  };
  return (
    <div>
      <Banner />
      <div>
        <Watches />
        <CommonButton onClick={handleExplore} className="mx-auto d-block mb-5">
          Explore More
        </CommonButton>
      </div>
      <CustomerReview />
      <ContactUs />
      <NewsLetter />
    </div>
  );
};

export default Home;
