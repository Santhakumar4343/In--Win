import React, { useState } from "react";
import { Link, useNavigate,Location, useLocation } from "react-router-dom";
import SummaryImage from "../../assets/Summary_1.jpg";
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
import "../User/UserDashBoard.css";
import { CurrencyState } from "../../CurrencyContext.js";
import { MenuItem, Select } from "@mui/material";
import NomineeProfile from "../Profile/NomineeProfile.js"
import HouseIcon from '@mui/icons-material/House';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NomineeStocks from "../Stocks/NomineeStocks.js"
import NomineeSummary from "../Summary/NomineeSummary.js"
import NomineeMetal from "../Gold/NomineeMetal.js";
import NomineeRealestate from "../Realestate/NomineeRealestate.js"
import NomineeFds from "../FixedDeposits/NomineeFd.js"
import NomineeLoans from "../Loans/NomineeLoans.js"
import NomineeInsurance from "../Insurane/NomineeInsurance.js"
import AntiquePiecesNominee from "../AntiquePieces/AntiquePiecesNominee.js"
import NomineeVehicles from "../Vehicles/NomineeVehicles.js"
import NomineeBACs from "../Bank ACs/NomineeBAC.js"
import NomineeMB from "../MonthlyExpenditure/NomineeMonthyBills.js";
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
        return <NomineeProfile />;
        case "monthlyExpenditure":
        return < NomineeMB/>;

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
    <div className="dashboard-container">

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
      <div className="main-content" style={{ backgroundImage: `url(${SummaryImage})`,backgroundSize: "cover",backgroundPosition:"center" }}>
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