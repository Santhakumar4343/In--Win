
import './App.css';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashBoard from './Components/User/UserDashBoard';
import NomineeDashboard from './Components/Nominee/NomineeDashboard';
import ForgotPassword from './Components/Profile/ForgotPassword';
import SummaryImage from './assets/Summary_1.jpg';
function App() {
  return (
    <div className="App"  style={{ backgroundImage: `url(${SummaryImage})`, backgroundSize: 'cover' }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/userDashBoard" element={<UserDashBoard />}></Route>
          <Route path="/nomineeDashBoard" element={<NomineeDashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
