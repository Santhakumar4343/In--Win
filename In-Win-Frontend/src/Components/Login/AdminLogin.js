import React, { useState, useEffect } from "react";
import "../Login/Basestyle.css";
import "../Login/Login.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { BASE_URl } from "../API/Api";
import { CommentSharp } from "@mui/icons-material";

const Login = ({  }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    userName: "",
    password: "",
  });

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

  const loginHandler =  (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      axios
        .post(`${BASE_URl}/api/users/login?userName=${user.userName}&password=${user.password}`)
        .then(async (res) => {
            if (res && res.status === 200) {
              const userData = res.data;
             
                    const userUsername = userData.userName;
                    navigate("/userDashBoard", { state: { userData, userName: userUsername } });
                console.log("fgjifdgjidfgjdflkgjdfgklfg",userUsername);
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
    <div className="Login-Main">
    <div className="login">
      <form>
        <h1>Login</h1>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="User Name"
          onChange={changeHandler}
          value={user.userName}
        />
        <p className="error">{formErrors.userName}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className="error">{formErrors.password}</p>
        <button className="button_common" onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/register">Not yet registered? Register Now</NavLink>
    </div>
    </div>
  );
};

export default Login;
