import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
  
    // Email validation
    if (!formData.email) {
      errors.email = 'Email address is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address (e.g., example@domain.com)';
    }
  
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(formData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // For testing, hardcode a successful login
      dispatch(loginSuccess({
        user: {
          id: 1,
          email: formData.email,
          fullName: 'Test User'
        },
        role: determineUserRole(formData.email)
      }));
      navigate('/dashboard');
    }
  };

  const determineUserRole = (email) => {
    if (email.endsWith('@soulscouts.com')) return 'coach';
    // Check against companies list for HR
    // For now, return 'employee' as default
    return 'employee';
  };

  return (
    <Container className="login-container">
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            isInvalid={!!formErrors.email}
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
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;