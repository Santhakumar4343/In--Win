import React, { useState, useEffect } from "react";
import "../Login/Basestyle.css";
import "../Login/Login.css";

import NomineeLogin from "../Login/NomineeLogin";
import AdminLogin from "../Login/AdminLogin";


import { MenuItem, Select } from "@mui/material";
import Gold from "./Gold";
import Silver from "./Silver";
import Platinum from "./Platinum";
import Diamonds from "./Diamonds";
import Jewellery from "./Jewellery";

const Metal = ({ }) => {
  const [metal, setMetal] = useState("gold");

  const handleMetalChange = (event) => {
    setMetal(event.target.value);
  };

  return (
    <div className="">
      <div className="" style={{ marginRight: "50px " ,marginBottom:"10px"}}>
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          value={metal}
          className="border border-light"
          style={{ width: 100, height: 40, color: "white"}}
          onChange={handleMetalChange}
        >
          <MenuItem value={"gold"}>Gold</MenuItem>
          <MenuItem value={"silver"}>Silver</MenuItem>
          <MenuItem value={"platinum"}>Platinum</MenuItem>
          <MenuItem value={"diamonds"}>Diamonds</MenuItem>
          <MenuItem value={"jewellery"}>Jewellery</MenuItem>
        </Select>
      </div>
      <div className="">
        {metal === "gold" && <Gold />}
        {metal === "silver" && <Silver />}
        {metal === "platinum" && <Platinum />}
        {metal === "diamonds" && <Diamonds />}
        {metal === "jewellery" && <Jewellery />}
       
      </div>
    </div>
  );
};

export default Metal;
