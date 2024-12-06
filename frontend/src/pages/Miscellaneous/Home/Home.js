import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Spinner logic
    const spinner = document.getElementById("spinner");
    const content = document.getElementById("content");
    setTimeout(() => {
      if (spinner) spinner.style.display = "none";
      if (content) content.style.display = "block";
    }, 1500);
  }, []);

  // Function to call the API and alert the response
  const fetchAPIResponse = async () => {
    try {
      const response = await fetch("http://localhost:5001/api");
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Error fetching the API: " + error.message);
    }
  };

  // Function to handle the "Login/Sign Up" button click
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <div id="liveAlertPlaceholder"></div>

      {/* Spinner */}
      <div className="spinner-container">
        <div
          id="spinner"
          className="spinner-border text-primary spinnerr"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      {/* Main Content */}
      <div id="content" style={{ display: "none" }} className="container">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="assets/main-logo-png.png" height="50px" alt="Logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#whyHeading">
                    Why Us
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-info"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    Tools for Tranquility
                  </button>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleLoginClick}
                >
                  Login/Sign Up
                </button>
                {/* New Button for API Call */}
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={fetchAPIResponse}
                >
                  Call API
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Home;