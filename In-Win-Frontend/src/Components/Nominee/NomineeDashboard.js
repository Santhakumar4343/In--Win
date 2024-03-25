import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BalanceIcon from '@mui/icons-material/Balance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MuseumIcon from '@mui/icons-material/Museum';
import SavingsIcon from '@mui/icons-material/Savings';
import NomineeStocks from "../Stocks/NomineeStocks.js"

import Realestate from "../Realestate/Realestate.js";
import "../User/UserDashBoard.css";
import FixedDeposits from "../FixedDeposits/FixedDeposits.js";
import Insurance from "../Insurane/Insurance.js";
import AntiquePieces from "../AntiquePieces/AntiquePieces.js";
import Vehicles from "../Vehicles/Vehicles.js";
import { CurrencyState } from "../../CurrencyContext.js";
import { MenuItem, Select } from "@mui/material";
import Loans from "../Loans/Loans.js";
import BankACs from "../Bank ACs/BankACs.js";
import Summary from "../Summary/Summary.js";
import Profile from "../Profile/Profile.js";
import MonthlyExpenditure from "../MonthlyExpenditure/MonthlyExpenditure.js"
import HouseIcon from '@mui/icons-material/House';
import NomineeMetal from "../Gold/NomineeMetal.js";
import NomineeRealestate from "../Realestate/NomineeRealestate.js"
import NomineeFds from "../FixedDeposits/NomineeFd.js"
import NomineeInsurance from "../Insurane/NomineeInsurance.js"
import AntiquePiecesNominee from "../AntiquePieces/AntiquePiecesNominee.js";
import NomineeVehicles from "../Vehicles/NomineeVehicles.js"
import NomineeLoans from "../Loans/NomineeLoans.js"
import NomineeBACs from "../Bank ACs/NomineeBAC.js"
import NomineeMB from "../MonthlyExpenditure/NomineeMonthyBills.js"
import NomineeSummary from "../Summary/NomineeSummary.js"
function UserDashboard() {



  const Navigate = useNavigate();

  const [selectedNavLink, setSelectedNavLink] = useState("summary");
  const [showModal, setShowModal] = useState(false);



  const { currency, setCurrency } = CurrencyState();
  // const handleLogout = () => {
  //   window.history.replaceState(null, '', '/');
  //   Navigate('/');
  // }

  // const handleProfile = () => {
  //   setShowModal(true);
  // }

  const handleNavLinkClick = (navLink, event) => {
    event.preventDefault();
    setSelectedNavLink(navLink);
  };

  const renderContent = () => {
    switch (selectedNavLink) {
      case "stocks":
        return <NomineeStocks />;
      case "metal":
        return <NomineeMetal />;
      case "realestate":
        return <NomineeRealestate />;
      case "fixeddeposits":
        return <NomineeFds />;
      case "insurances":
        return <NomineeInsurance />;
      case "antiquepieces":
        return <AntiquePiecesNominee />;
      case "vehicles":
        return <NomineeVehicles />;
      case "loans":
        return <NomineeLoans />;
      case "banka/cs":
        return <NomineeBACs />;
      case "summary":
        return < NomineeSummary/>;
      case "profile":
        return <Profile />;
        case "monthlyExpenditure":
        return < NomineeMB/>;

      default:
        return null;
    }
  };



  return (
    <div className="dashboard-container">

      <div className="nav-links container-fluid" >
        <ul className="list-unstyled">
        <li style={{ marginBottom: "5px" ,marginTop: "70px"}}>
            <BalanceIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("summary", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Summary
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <HouseIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("monthlyExpenditure", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
            Monthly Bills
            </Link>
          </li>
          <li style={{ marginBottom: "5px",  }}>
            <CandlestickChartIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "7px" }} />
            <Link onClick={(e) => handleNavLinkClick("stocks", e)} style={{ color: "white", marginLeft: "5px", fontSize: "20px", marginTop: "20px", textDecoration: "none", }}>
              Stocks
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <ViewAgendaSharpIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("metal", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
             Metal
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <CorporateFareRoundedIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("realestate", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Realestate
            </Link>
          </li>

          <li style={{ marginBottom: "5px" }}>
            <SavingsIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("fixeddeposits", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Fixed Deposits
            </Link>
          </li>

          <li style={{ marginBottom: "5px" }}>
            <HealthAndSafetyIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("insurances", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Insurances
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <MuseumIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("antiquepieces", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Antique Pieces
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <DirectionsCarFilledIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("vehicles", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Vehicles
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <AccountBalanceIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("loans", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Loans
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <AccountBalanceIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("banka/cs", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Bank A/Cs
            </Link>
          </li>
         
          <li style={{ marginBottom: "5px" }}>
            <AccountCircleIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("profile", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" }}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content" style={{ padding: "20px" }}>
      <h5 className="text-center" style={{  fontWeight: 700, fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" ,color:"black"}}>In-Win: ONiE Soft Wealth Management System</h5>

        <div className="d-flex justify-content-end">
          {/* <Dropdown style={{color:"black"}}>
              <Dropdown.Toggle  id="userDropdown">
                <CurrencyExchangeIcon ></CurrencyExchangeIcon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={{}} style={{ fontSize: '14px', color: "black" }}>USD</Dropdown.Item>
                <Dropdown.Item onClick={{}} style={{ fontSize: '14px', color: "black" }}>INR</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
           
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            style={{ width: 100, height: 40, marginLeft: 15 }}
            className="border border-dark"
            onChange={(e) => setCurrency(e.target.value)}
          >
             <MenuItem value={"AED"}>AED</MenuItem>
            <MenuItem value={"AUD"}>AUD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default UserDashboard;