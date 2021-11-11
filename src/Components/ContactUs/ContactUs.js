import React from "react";
import "./ContactUs.css";
import { Button } from "react-bootstrap";
const ContactUs = () => {
  return (
    <div className="contact">
      <form
        className="form py-5"
        action="mailto:rahmanmahi02@gmail.com"
        style={{ borderRadius: "35px" }}
      >
        <div>
          <h2 style={{ textAlign: "center" }}>Contact Us If Necessary</h2>
        </div>
        <div className=" input-container">
          <div>
            <div className="styled-input wide">
              <input type="text" required />
              <label>Name</label>
            </div>
          </div>
          <div>
            <div className="styled-input">
              <input type="text" required />
              <label>Email</label>
            </div>
          </div>
          <div>
            <div className="styled-input" style={{ float: "right" }}>
              <input type="text" required />
              <label>Phone Number</label>
            </div>
          </div>
          <div>
            <div className="styled-input wide">
              <textarea required></textarea>
              <label>Message</label>
            </div>
          </div>
          <div>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
