import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import registerLogo from "../../assets/img/login.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/Config";
import Loader from "../../Loader/Loader";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");

  const navigate = useNavigate();
  const onUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmP = (event) => {
    setConfirmP(event.target.value);
  };
  const register = getAuth(auth);
  const registerSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (password !== confirmP) {
      toast.error("Your Passwords doesn't match!");
    }
    createUserWithEmailAndPassword(register, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Congratulations, your account have been created!");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="register">
        <div className="register__form-box">
          <h2 className="register__title">REGISTER</h2>
          <form
            action=""
            method="get"
            className="register__form"
            onSubmit={registerSubmit}
          >
            <div className="register__input">
              <input
                onChange={onUserNameChange}
                value={userName}
                className="register__placeholder"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="register__input">
              <input
                value={email}
                onChange={onChangeEmail}
                className="register__placeholder"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="register__input">
              <input
                onChange={onChangePassword}
                value={password}
                className="register__placeholder"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="register__input">
              <input
                onChange={onConfirmP}
                value={confirmP}
                className="register__placeholder"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="register__button-box">
              <button type="submit" className="register__button">
                Register
              </button>
            </div>
            <div className="register__register">
              <p className="register__text">Already an account</p>
              <Link className="register__text-register" to="/login">
                Login
              </Link>
            </div>
          </form>
        </div>
        <div className="register__box-img">
          <img
            className="register__img"
            src={registerLogo}
            alt="register-img"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
