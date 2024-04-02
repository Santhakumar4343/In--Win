import React, { useState, useEffect } from "react";
import "../Login/Basestyle.css";
import "../Login/Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { BASE_URl } from "../API/Api";

import ReCAPTCHA from "react-google-recaptcha";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = ({ }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};

    if (!values.userName) {
      error.userName = "User Name is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    }

    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    if (!captchaVerified) {
      alert("Please complete the captcha verification.");
      return;
    }
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      axios
        .post(`${BASE_URl}/api/nominees/login?userName=${user.userName}&password=${user.password}`)
        .then(async (res) => {
          if (res && res.status === 200) {
            const userData = res.data;

            const userUsername = userData.userName;
            navigate("/nomineeDashBoard", { state: { userData, userName: userUsername } });
            console.log("fgjifdgjidfgjdflkgjdfgklfg", userUsername);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setFormErrors({ password: "Incorrect password" });
          } else if (error.response && error.response.status === 404) {
            setFormErrors({ userName: "User name not found" });
          } else {
            console.error("Login error:", error);
            setFormErrors({ userName: "Login failed" });
          }
        });

    }
  };


  return (
    <div>
      
      <div className="Login-Main-Nominee">
      <h2 className="" style={{ marginLeft:"-200px",fontWeight: 700, fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", color: "white" }}><strong> In-Win: ONiE Soft</strong><br></br> <strong style={{marginLeft:"-100px"}}>Wealth Management System</strong></h2>
        <div className="login" style={{marginLeft:"40px"}}>

          <form>
          <h2
                className="text-center mt-1"
                style={{
                  fontWeight: 700,
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  color: "black",
                }}
              >
              Login
              </h2>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
              onChange={changeHandler}
              value={user.userName}
            />
            <p className="error">{formErrors.userName}</p>
            <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
            />
            <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </div>
          </div>
            <p className="error">{formErrors.password}</p>
            <ReCAPTCHA
              className="capcha"
              sitekey="6Lc_2pkpAAAAAJOgqj9SENH88SfnVAQ7xR6WePoy
            "
              onChange={() => setCaptchaVerified(true)}
            />
            <button className="button_common" onClick={loginHandler}>
              Login
            </button>
          </form>
          <NavLink to="/register">Not yet registered? Register Now</NavLink><br></br>
          <NavLink to="/forgot-password-nominee">Forgot Password </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
