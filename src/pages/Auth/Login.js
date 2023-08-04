import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import login from "../../assets/img/login-password.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../../firebase/Config";
import Loader from "../../Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onTypeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onTypePassword = (event) => {
    setPassword(event.target.value);
  };
  const loginUser = getAuth(auth);
  const userLogin = (event) => {
    event.preventDefault();
    console.log(email, password);
    setIsLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      toast.error("E-mail or Password cannot be empty");
      return;
    }
    signInWithEmailAndPassword(loginUser, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success("Welcome to your account!");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="login">
        <div className="login__box-img">
          <img className="login__img" src={login} alt="login-img" />
        </div>
        <div className="login__form-box">
          <h2 className="login__title">LOGIN</h2>
          <form
            action=""
            method="get"
            onSubmit={userLogin}
            className="login__form"
          >
            <div className="login__input">
              <input
                className="login__placeholder"
                type="email"
                placeholder="Email"
                required
                onChange={onTypeEmail}
                value={email}
              />
            </div>
            <div className="login__input">
              <input
                className="login__placeholder"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onTypePassword}
              />
            </div>
            <div className="login__button-box">
              <button type="submit" className="login__button">
                Connect
              </button>
            </div>
            <div className="login__connect-box">
              <Link className="login__reset" to="/reset">
                Reset your Password
              </Link>
              <div className="login__register">
                <p className="login__text">Doesn't Have an account</p>
                <Link className="login__text-register" to="/register">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
