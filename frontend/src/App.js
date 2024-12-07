import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import { publicRoutes, protectedRoutes, ROLES } from "./routes/routeConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import all components
import Home from "./pages/Miscellaneous/Home/Home";
import HRDashboard from "./pages/HR/Dashboard/Dashboard";
import EmployeeDashboard from "./pages/Employee/Dashboard/EmployeeDashboard";
import CoachDashboard from "./pages/Coach/Coach-Dashboard/CoachDashboard";
import Settings from "./pages/Miscellaneous/Settings/Settings";
import ResourceLibrary from "./pages/Miscellaneous/ResourceLibrary/ResourceLibrary";
import CompanyManagement from "./pages/Admin/CompanyManagement/CompanyManagement";
import CoachManagement from "./pages/Admin/CoachManagement/CoachManagement";
import EmployeeManagement from "./pages/HR/EmployeeManagement/EmployeeManagement";
import Journal from "./pages/Employee/Journal/Journal";
import Signup from "./pages/Authentication/Signup/Signup";
import Login from "./pages/Authentication/Login/Login";

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

  // Component mapping
  const components = {
    Home,
    HRDashboard,
    EmployeeDashboard,
    CoachDashboard,
    Settings,
    ResourceLibrary,
    CompanyManagement,
    CoachManagement,
    EmployeeManagement,
    Journal,
    Signup,
    Login,
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map(({ path, component }) => (
            <Route
              key={path}
              path={path}
              element={React.createElement(components[component])}
            />
          ))}

          {/* Protected Routes */}
          {protectedRoutes.map(({ path, component, allowedRoles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  {React.createElement(components[component])}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;