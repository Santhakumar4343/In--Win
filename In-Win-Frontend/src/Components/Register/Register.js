import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import UserRegistration from "../Register/UserRegistration"
import NomineeRegistration from "../Register/NomineeRegistration";
import AdminRegistration from "../Register/AdminRegistration";

const Register = () => {
  const [role, setRole] = useState("User");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-end" style={{ marginRight: "50px" }}>
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          value={role}
          style={{ width: 100, height: 40, color: "white", borderColor: "white" }}
          onChange={handleRoleChange}
        >
          <MenuItem value={"User"}>User</MenuItem>
          <MenuItem value={"Nominee"}>Nominee</MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
        </Select>
      </div>
      <div className="Register-Main">
        {role === "User" && <UserRegistration />}
        {role === "Nominee" && <NomineeRegistration />}
        {role === "Admin" && <AdminRegistration />}
      </div>
    </div>
  );
};

export default Register;
