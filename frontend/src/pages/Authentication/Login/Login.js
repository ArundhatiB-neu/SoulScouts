import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, selectAuth } from '../../../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, role } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' // Added role field
  });

  const [formErrors, setFormErrors] = useState({});

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && role) {
      const dashboardRoutes = {
        hr: '/hr-dashboard',
        employee: '/employee-dashboard',
        coach: '/coach-dashboard',
        admin: '/admin-dashboard'
      };
      navigate(dashboardRoutes[role] || '/');
    }
  }, [isAuthenticated, role, navigate]);

  const validateForm = () => {
    const errors = {};
  
    // Email validation
    if (!formData.email) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    // Role validation
    if (!formData.role) {
      errors.role = 'Please select your role';
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(loginUser({
          email: formData.email,
          password: formData.password,
          role: formData.role // Use selected role instead of determining from email
        })).unwrap();
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  return (
    <Container className="login-container">
      <h1 className="text-center mb-4">Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            isInvalid={!!formErrors.email}
            placeholder="Enter your email"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            isInvalid={!!formErrors.password}
            placeholder="Enter your password"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            isInvalid={!!formErrors.role}
          >
            <option value="">Select your role</option>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
            <option value="coach">Coach</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formErrors.role}
          </Form.Control.Feedback>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
          className="w-100"
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="signup-link mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;