import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Card, Nav } from 'react-bootstrap';
import "./Home.css";
import heroImage from '../../../Assets/hero-image.png';
import mainLogo from '../../../Assets/soulscouts-logo.png';
import features1 from '../../../Assets/features-1.jpg';
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
      <div id="content" style={{ display: "none" }} className="container-fluid">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid d-flex justify-content-between">
            <a href="#" className="navbar-brand">
              <img src={mainLogo} height="40px" alt="Logo" />
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
              id="navbarSupportedContent" style={{ flexGrow: 0 }}
            >
              <form className="d-flex" role="search">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleLoginClick}
                >
                  Login/Sign Up
                </button>
              </form>
            </div>
          </div>
        </nav>

        <Container className="py-5">
        <Row className="align-items-center">
          <Col md={5} className="p-3">
            <h1 className="display-4 fw-bold mb-4">Navigate Your Path to Wellness</h1>
            <p className="lead mb-4">
              Empower your mental health journey with Soul Scouts. Our personalized tracker helps you reflect, 
              grow, and thrive. Track your mood, set meaningful goals, and uncover insights that guide you to 
              a happier, healthier you. Your wellness adventure starts here.
            </p>
            <Button variant="primary" size="lg">Begin Your Soul Search</Button>
          </Col>
          <Col md={{span: 6, offset:1}}  className="p-3 text-center">
            <img 
              src={heroImage}
              alt="Wellness Tracking" 
              className="img-fluid rounded-4 shadow-lg  float-right"
            />
          </Col>
        </Row>
      </Container>

      {/* Why SoulScouts Section */}
      <div className="bg-navy text-white text-center py-5 my-5">
        <Container>
          <h2 className="display-5 fw-bold mb-3">Why SoulScouts</h2>

          <p className="lead mx-auto my-4" style={{ maxWidth: '800px' }}>
            At SoulScouts, we're not just another wellness app. We combine cutting-edge technology and 
            genuine care, creating a platform where mental health support is tailored to you. Whether you need 
            tools to manage everyday stress, insights to better understand your emotions, or access to 
            professional support, SoulScouts is here to guide you.
          </p>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center display-6 fw-bold mb-5">What Sets Us Apart!</h2>
        
        {/* Feature 1 */}
        <Row className="align-items-center my-5">
          <Col md={6} className="text-center">
            <img 
              src={features1} 
              alt="Mood Tracking" 
              className="img-fluid rounded-4"
              width="80%"
            />
          </Col>
          <Col md={6}>
            <h3 className="display-8 fw-bold">Understand Yourself Better: Mood Tracking & Journaling</h3>
            <ul className="feature-list p-4">
              <li>Log your mood daily with an easy-to-use calendar that tracks your emotional journey</li>
              <li>Express your thoughts and feelings through journaling</li>
              <li>Leverage AI-powered insights that analyze your mood patterns</li>
              <li>Instantly connect to emergency hotlines and mental health resources</li>
              <li>Notify trusted contacts with a single click</li>
              <li>Access essential mental health support tools</li>
            </ul>
          </Col>
        </Row>

        {/* Feature 2 */}
        {/* <Row className="align-items-center mb-5 flex-md-row-reverse">
          <Col md={6}>
            <img 
              src="/feature2.png" 
              alt="Crisis Mode" 
              className="img-fluid rounded-4"
            />
          </Col>
          <Col md={6}>
            <h3>Crisis Mode: Help When You Need It Most</h3>
            <ul className="feature-list">
              <li>Instantly connect to emergency hotlines and mental health resources</li>
              <li>Notify trusted contacts with a single click</li>
              <li>Access essential mental health support tools</li>
            </ul>
          </Col>
        </Row> */}

        {/* Feature 3 */}
        {/* <Row className="align-items-center">
          <Col md={6}>
            <img 
              src="/feature3.png" 
              alt="Personalized Care" 
              className="img-fluid rounded-4"
            />
          </Col>
          <Col md={6}>
            <h3>Personalized Self-Care & Professional Support</h3>
            <ul className="feature-list">
              <li>Receive tailored self-care routines based on your mood patterns</li>
              <li>Explore a diverse library of mindfulness and meditation exercises</li>
              <li>Seamlessly connect with licensed therapists for teletherapy sessions</li>
            </ul>
          </Col>
        </Row> */}
      </Container>

      {/* Pricing Section */}
      {/* <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Take the First Step Today</h2>
          <p className="text-center mb-5">
            Join SoulScouts and start your journey toward mental wellness today.
          </p>
          
          <Row className="g-4 justify-content-center">
            {[
              {
                title: "Basic",
                price: "$5",
                features: "Mood tracking and Journaling",
                buttonText: "Get Basic"
              },
              {
                title: "Premium",
                price: "$8",
                features: "AI Insights and Crisis Mode",
                buttonText: "Get Premium"
              },
              {
                title: "Ultimate",
                price: "$10",
                features: "Full Access to All Features and Teletherapy Integration",
                buttonText: "Get Ultimate",
                popular: true
              }
            ].map((plan, index) => (
              <Col md={4} key={index}>
                <Card className={`pricing-card h-100 ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}
                  <Card.Body className="d-flex flex-column text-center">
                    <h3 className="fw-bold mb-3">{plan.title}</h3>
                    <div className="price mb-3">
                      <span className="h2">{plan.price}</span>
                      <span className="text-muted">/month</span>
                    </div>
                    <p className="mb-4">{plan.features}</p>
                    <Button 
                      variant={plan.popular ? "primary" : "outline-primary"}
                      className="mt-auto"
                    >
                      {plan.buttonText}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div> */}
      </div>
      <footer className="bg-dark text-white py-4">
      <Container className="d-flex justify-content-center">
        <Row className="justify-content-between text-center">
        <Col md={12} className="text-md-right">
            <a href="#" className="btn btn-primary btn-sm w-auto">SIGN UP</a>
          </Col>
          <Col md={12} className="text-md-left m-3" >
            <p className="mb-0">&copy; 2020 Copyright: MDBootstrap.com</p>
          </Col>
          
        </Row>
      </Container>
    </footer>
    </div>
  );
};

export default Home;