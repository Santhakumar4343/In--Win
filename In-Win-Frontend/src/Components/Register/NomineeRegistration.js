import React, { useEffect, useState } from "react";
import "../Login/Basestyle.css";
import "../Register/Register.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { BASE_URl } from "../API/Api";
import { MenuItem, Select } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const [user, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    userType: "Nomine",
    owner: "",
  });
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("User");

  const changeHandler = async (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  
    // Validate input fields
    const newErrors = { ...formErrors };
  
    switch (name) {
      case "userName":
        // Synchronous validation
        newErrors.userName =
          value.length < 3 ? "Username must be 3 characters" : "";
  
        // Asynchronous validation
        try {
          const response = await axios.get(
            `${BASE_URl}/api/nominees/allUsernames`
          );
          if (response.data.includes(value)) {
            newErrors.userName = "Username already exists";
          }
        } catch (error) {
          console.error("Error fetching usernames:", error);
          newErrors.userName = "Error fetching usernames";
        }
        break;
  
      case "owner":
        // Synchronous validation
        newErrors.owner =
          value.length < 3 ? "Enter a valid owner name" : "";
  
        // Asynchronous validation
        try {
          const response = await axios.get(
            `${BASE_URl}/api/nominees/getAllOwners`
          );
          if (!response.data.includes(value)) {
            newErrors.owner = "Owner not found";
          }
        } catch (error) {
          console.error("Error fetching owner names:", error);
          newErrors.owner = "Error fetching owner names";
        }
        break;
  
      case "email":
        // Synchronous validation
        newErrors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format"
          : "";
  
        // Asynchronous validation
        try {
          const response = await axios.get(
            `${BASE_URl}/api/nominees/allEmails`
          );
          if (response.data.includes(value)) {
            newErrors.email = "Email already exists";
          }
        } catch (error) {
          console.error("Error fetching emails:", error);
          newErrors.email = "Error fetching emails";
        }
        break;
  
      case "mobileNumber":
        // Synchronous validation
        newErrors.mobileNumber =
          value.trim() === ""
            ? ""
            : !/^[6-9]\d{9}$/.test(value)
            ? "Invalid mobile number"
            : "";
  
        // Asynchronous validation
        try {
          const response = await axios.get(
            `${BASE_URl}/api/nominees/getAllMobileNumber`
          );
          if (response.data.includes(value)) {
            newErrors.mobileNumber = "Mobile number already exists";
          }
        } catch (error) {
          console.error("Error fetching mobile numbers:", error);
          newErrors.mobileNumber = "Error fetching mobile numbers";
        }
        break;
  
      default:
        break;
    }
  
    // Update the form errors state
    setFormErrors(newErrors);
  };
  

  const validateForm = (values) => {
    const error = {};
    const regex = /^[a-z0-9.]+@[a-z]+\.[a-z]+$/;
    const mobileValidation = /^[6-9]\d{9}$/;

    if (!values.userName) {
      error.userName = "User Name is required";
    } else if (values.userName.length < 3) {
      error.userName = "enter a valid user name";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.mobileNumber) {
      error.mobileNumber = "Mobile Number is required";
    } else if (!mobileValidation.test(values.mobileNumber)) {
      error.mobileNumber = "Enter a valid Mobile Number!";
    }
    return error;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await changeHandler({ target: { name: "userName", value: user.userName } });
    await changeHandler({ target: { name: "email", value: user.email } });
    await changeHandler({ target: { name: "owner", value: user.owner } });
    await changeHandler({
      target: { name: "mobileNumber", value: user.mobileNumber },
    });

    // Check if required fields are empty
    if (!user.userName || !user.email || !user.mobileNumber || !user.owner) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // If there are no errors, proceed with API call
    if (
      !formErrors.userName &&
      !formErrors.email &&
      !formErrors.mobileNumber &&
      !formErrors.owner
    ) {
      axios
        .post(`${BASE_URl}/api/users/send-otp`, user)
        .then((res) => {
          setOtpModalOpen(true);
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
        });
    }
  };

  const verifyOtp = () => {
    axios
      .post(`${BASE_URl}/api/nominees/verify-otp?otp=${otp}`)
      .then((res) => {
        alert("Your registered successfully!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div>
      {/* <div className="d-flex justify-content-end" style={{marginRight:"50px"}}>
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          value={role}
          style={{ width: 100, height: 40, color: "white", borderColor: "white" }}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value={"User"}>User</MenuItem>
          <MenuItem value={"Nominee"}>Nominee</MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
        </Select>

      </div> */}
      <div className="Register-Main">
        <h2
          className=""
          style={{
            marginLeft: "-200px",
            fontWeight: 700,
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            color: "white",
          }}
        >
          <strong> In-Win: ONiE Soft</strong>
          <br></br>{" "}
          <strong style={{ marginLeft: "-100px" }}>
            Wealth Management System
          </strong>
        </h2>
        {!otpModalOpen && (
          <div className="register" style={{ marginLeft: "40px" }}>
            <form>
              <h2
                className="text-center mt-1"
                style={{
                  fontWeight: 700,
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  color: "black",
                }}
              >
              Sign-Up
              </h2>
              <input
                type="text"
                name="userName"
                id="fname"
                placeholder="User Name"
                onChange={changeHandler}
                value={user.userName}
              />
              <p className="error">{formErrors.userName}</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email}
              />
              <p className="error">{formErrors.email}</p>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={changeHandler}
                  value={user.password}
                />
                <div
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
              <p className="error">{formErrors.password}</p>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Mobile Number"
                onChange={changeHandler}
                value={user.mobileNumber}
              />
              <p className="error">{formErrors.mobileNumber}</p>
              <input
                type="text"
                name="owner"
                id="owner"
                placeholder="Owner Name"
                onChange={changeHandler}
                value={user.owner}
              />
              <p className="error">{user.owner && formErrors.owner}</p> 
              <button className="button_common" onClick={signupHandler} disabled={loading}>
                {loading ? "Sign-Up..." : "Sign-Up"}
              </button>
            </form>
            <NavLink to="/">Already Sign-Up? Login</NavLink>
          </div>
        )}
        {otpModalOpen && (
          <div className="otp-modal" style={{ marginLeft: "40px" }}>
            <h1>Enter OTP</h1>
            <input
              className="otp-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="otp-button" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
