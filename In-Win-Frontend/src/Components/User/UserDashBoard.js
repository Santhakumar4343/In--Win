import React, { useState } from "react";
import { Link, useNavigate,Location, useLocation } from "react-router-dom";

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
import Stocks from "../Stocks/Stocks.js";
import Gold from "../Gold/Gold.js";
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
import Metal from "../Gold/Metal.js";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SummaryImage from "../../assets/Summary0.png";
function UserDashboard() {
  const Navigate = useNavigate();
const location=useLocation();
  const [selectedNavLink, setSelectedNavLink] = useState("summary");
  const [showModal, setShowModal] = useState(false);
const userData=location.state?.userData.userName;


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
        return <Stocks />;
      case "metal":
        return <Metal />;
      case "realestate":
        return <Realestate />;
      case "fixeddeposits":
        return <FixedDeposits />;
      case "insurances":
        return <Insurance />;
      case "antiquepieces":
        return <AntiquePieces />;
      case "vehicles":
        return <Vehicles />;
      case "loans":
        return <Loans />;
      case "banka/cs":
        return <BankACs />;
      case "summary":
        return <Summary  />;
      case "profile":
        return <Profile />;
        case "monthlyExpenditure":
        return < MonthlyExpenditure/>;

      default:
        return null;
    }
  };

  const renderHeaderContent = () => {
    switch (selectedNavLink) {
      case "stocks":
        return "Stocks";
      case "metal":
        return "Metals";
      case "realestate":
        return "Real Estate";
      case "fixeddeposits":
        return "Fixed Deposits";
      case "insurances":
        return "Insurances";
      case "antiquepieces":
        return "Antique Pieces";
      case "vehicles":
        return "Vehicles";
      case "loans":
        return "Loans";
      case "banka/cs":
        return "Bank A/Cs";
      case "summary":
        return "Summary";
      case "profile":
        return "Profile";
      case "monthlyExpenditure":
        return "Monthly Expenses ";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-container" >

      <div className="nav-links container-fluid" >
        <ul className="list-unstyled">
        <li style={{ marginBottom: "5px" ,marginTop: "70px"}}>
            <BalanceIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("summary", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "summary" ? "bold" : "normal" }}>
              Summary
              {selectedNavLink === "summary" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <HouseIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("monthlyExpenditure", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none", fontWeight: selectedNavLink === "monthlyExpenditure" ? "bold" : "normal" }}>
            Monthly Bills {selectedNavLink === "monthlyExpenditure" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px",  }}>
            <CandlestickChartIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "7px" }} />
            <Link onClick={(e) => handleNavLinkClick("stocks", e)} style={{ color: "white", marginLeft: "5px", fontSize: "20px", marginTop: "20px", textDecoration: "none",fontWeight: selectedNavLink === "stocks" ? "bold" : "normal" }}>
              Stocks  {selectedNavLink === "stocks" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <ViewAgendaSharpIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("metal", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "metal" ? "bold" : "normal" }}>
             Metals {selectedNavLink === "metal" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <CorporateFareRoundedIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("realestate", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "realestate" ? "bold" : "normal" }}>
              Realestate {selectedNavLink === "realestate" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>

          <li style={{ marginBottom: "5px" }}>
            <SavingsIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("fixeddeposits", e)} style={{ color: "white", marginLeft: "10px", fontSize: "18px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "fixeddeposits" ? "bold" : "normal" }}>
              Fixed Deposits {selectedNavLink === "fixeddeposits" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>

          <li style={{ marginBottom: "5px" }}>
            <HealthAndSafetyIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("insurances", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "insurances" ? "bold" : "normal" }}>
              Insurances {selectedNavLink === "insurances" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <MuseumIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("antiquepieces", e)} style={{ color: "white", marginLeft: "10px", fontSize: "18px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "antiquepieces" ? "bold" : "normal" }}>
              Antique Pieces {selectedNavLink === "antiquepieces" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <DirectionsCarFilledIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("vehicles", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none" ,fontWeight: selectedNavLink === "vehicles" ? "bold" : "normal" }}>
              Vehicles {selectedNavLink === "vehicles" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <AccountBalanceIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("loans", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none", fontWeight: selectedNavLink === "loans" ? "bold" : "normal" }}>
              Loans {selectedNavLink === "loans" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
          <li style={{ marginBottom: "5px" }}>
            <AccountBalanceIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("banka/cs", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none", fontWeight: selectedNavLink === "banka/cs" ? "bold" : "normal" }}>
              Bank A/Cs  {selectedNavLink === "banka/cs" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
         
          <li style={{ marginBottom: "5px" }}>
            <AccountCircleIcon style={{ color: "white", fontSize: "18px", marginLeft: "10px", marginBottom: "8px" }} />
            <Link onClick={(e) => handleNavLinkClick("profile", e)} style={{ color: "white", marginLeft: "10px", fontSize: "20px", marginTop: "20px", textDecoration: "none", fontWeight: selectedNavLink === "profile" ? "bold" : "normal" }}>
              Profile {selectedNavLink === "profile" && <ArrowBackIcon style={{ color: "orange", fontSize: "28px", marginLeft: "5px" }} />}
            </Link>
          </li>
        </ul>
      </div>
     
{/* style={{ padding: "20px" }} */}
<div className="main-content" style={{ backgroundImage: `url(${SummaryImage})`, backgroundSize: "cover", backgroundPosition: "center",  }}>

      <h4 className="text-center" style={{ fontWeight: 1000, fontSize:"35px",fontFamily: "Segoe UI, sans-serif", color: "white" }}>
          {renderHeaderContent()}
        </h4>

        <div className="d-flex justify-content-end">
           
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            style={{ width: 100, height: 40, marginLeft: 15 ,color:"white"}}
            className="border border-light"
           
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
        <div className="content-container" style={{ overflowY: "auto" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;