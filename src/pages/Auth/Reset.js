import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Reset.scss";
import reset from "../../assets/img/reset.png";
import auth from "../../firebase/Config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const resetP = getAuth(auth);
  const resetPassword = (event) => {
    event.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(resetP, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your Inbox for reset your Password");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className="reset">
      {isLoading && <Loader />}
      <div className="reset__box-img">
        <img className="reset__img" src={reset} alt="reset-img" />
      </div>
      <div className="reset__form-box">
        <h2 className="reset__title">RESET PASSWORD</h2>
        <form
          action=""
          onSubmit={resetPassword}
          method="get"
          className="reset__form"
        >
          <div className="reset__input">
            <input
              className="reset__placeholder"
              type="e-mail"
              placeholder="Enter your e-mail adress"
              required
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="reset__button-box">
            <button type="submit" className="reset__button">
              Reset
            </button>
          </div>
          <div className="reset__register">
            <Link className="reset__text-register" to="/login">
              Login
            </Link>
            <Link className="reset__text-register" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
