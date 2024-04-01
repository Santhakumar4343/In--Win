import React, { useEffect, useState } from "react";
import "../Login/Basestyle.css";
import "../Register/Register.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { BASE_URl } from "../API/Api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SummaryImage from "../../assets/Summary_1.jpg";
const ForgotPasswordForNominee = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const error = {};
    if (!password) {
      error.password = "Password is required";
    } else if (password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    return error;
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const sendOtp = () => {
    const emailErrors = {};
    if (!validateEmail(email)) {
      emailErrors.email = "Invalid email format";
      setErrors(emailErrors);
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    axios
      .post(`${BASE_URl}/api/nominees/update-password`, formData)
      .then((res) => {
        sessionStorage.setItem("verifiedEmail", email);
        setStep(2);
      })
      .catch((error) => {
        alert("Invalid Email! Please try again.");
      });
  };
  const verifyOtp = () => {
    axios
      .post(`${BASE_URl}/api/nominees/verify-otp/forgotpassword?otp=${otp}`)
      .then((res) => {
        sessionStorage.setItem("verifiedEmail", email);
        setStep(3);
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP! Please try again.");
      });
  };

  const savePassword = () => {

    const passwordErrors = validatePassword(newPassword);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    const formData = new FormData();
    formData.append("newPassword", newPassword);

    const emailFromSession = sessionStorage.getItem("verifiedEmail");
    if (!emailFromSession) {
      console.error("Email not verified or session expired");
      return;
    }

    axios
      .post(`${BASE_URl}/api/nominees/set-new-password`, formData)
      .then((res) => {
        sessionStorage.removeItem("verifiedEmail");
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      <div className="Register-Main-forgotPassword"  style={{ backgroundImage: `url(${SummaryImage})`, backgroundSize: 'cover' }}>
        <div className="register">
          {step === 1 && (
            <div>
              <h2>Forgot Password</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "320px", height: "50px", borderRadius: "10px" }}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <div className="d-flex">
              <button className="button_common_forgot" onClick={sendOtp}>
                Send OTP
              </button>
              <button className="button_common_forgot" onClick={() => navigate("/")}>
  Cancel
</button>
</div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Enter OTP</h2>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ width: "320px", height: "50px", borderRadius: "10px" }}
              />
              <button className="button_common" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Set New Password</h2>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  style={{width:"320px",height:"50px",borderRadius:"10px"}}
                />
                <div
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
              {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
              <button className="button_common" onClick={savePassword}>
                Save Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForNominee;