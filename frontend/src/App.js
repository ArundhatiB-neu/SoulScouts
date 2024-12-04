import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Miscellaneous/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import HRDashboard from "./pages/HR/Dashboard/Dashboard";

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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hrdashboard" element={<HRDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
