import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="news-letter my-5 py-5 mx-5">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-6">
          <div class="card">
            <div class="text-center">
              <img
                src="https://i.imgur.com/Dh7U4bp.png"
                width="200"
                alt="newsLetterImg"
              />
              <span class="d-block mt-3">
                Subscribe to our newsletter in order not to miss new arrivals
                <br /> promotions and discounts of our store
              </span>
              <div class="mx-5">
                <div class="input-group mb-3 mt-4">
                  <input
                    class="form-control"
                    placeholder="Enter email"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn shadow-none Orange"
                    type="button"
                    id="button-addon2"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
