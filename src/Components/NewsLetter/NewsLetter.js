import React from "react";
import "./NewsLetter.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
const NewsLetter = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.email) {
      axios
        .post("https://sheltered-ocean-21876.herokuapp.com/subscribe", data)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire(
              `Thanks  for your subscription`,
              "We will let you know of our new arrival, promotion and discounts"
            );
          }
        });
    }
  };
  return (
    <div className="news-letter my-5 py-5 mx-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="text-center">
              <img
                src="https://i.imgur.com/Dh7U4bp.png"
                width="200"
                alt="newsLetterImg"
              />
              <span className="d-block mt-3">
                Subscribe to our newsletter in order not to miss new arrivals
                <br /> promotions and discounts of our store
              </span>
              <div className="mx-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="input-group mb-3 mt-4"
                >
                  <input
                    {...register("email")}
                    required
                    className="form-control"
                    placeholder="Enter email"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <input
                    className="btn shadow-none Orange"
                    type="submit"
                    value="Subscribe"
                    id="button-addon2"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
