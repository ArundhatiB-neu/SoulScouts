import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Miscellaneous/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HRDashboard from "./pages/HR/Dashboard/Dashboard";
import Settings from "./pages/Miscellaneous/Settings/Settings";
import ResourceLibrary from "./pages/Miscellaneous/ResourceLibrary/ResourceLibrary";
import CompanyManagement from "./pages/Admin/CompanyManagement/CompanyManagement";
import CoachManagement from "./pages/Admin/CoachManagement/CoachManagement";
import EmployeeManagement from "./pages/HR/Dashboard/EmployeeManagement/EmployeeManagement";
import Journal from "./pages/Employee/Journal/Journal";
import { Provider } from "react-redux";
import store from "./redux/store";
import Signup from "./pages/Authentication/Signup/Signup";
import Login from "./pages/Authentication/Login/Login";
import EmployeeDashboard from "./pages/Employee/Dashboard/EmployeeDashboard";

const App = () => {
  useEffect(() => {
    const initializeTooltips = () => {
      if (window.bootstrap) {
        const tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
      } else {
        console.error("Bootstrap is not loaded correctly.");
      }
    };

    initializeTooltips();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hr-dashboard" element={<HRDashboard/>}/>
          <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/library" element={<ResourceLibrary/>}/>
          <Route path="/company-management" element={<CompanyManagement/>}/>
          <Route path="/coach-management" element={<CoachManagement/>}/>
          <Route path="/employee-management" element={<EmployeeManagement/>}/>
          <Route path="/journal" element={<Journal/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
