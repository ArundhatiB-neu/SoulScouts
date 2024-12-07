import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../../redux/slices/authSlice';
import { LoginUser } from '../../../Services/AuthService';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const determineUserRole = (email) => {
    const domain = email.split('@')[1];
  
    switch (domain) {
      case 'soulscouts.com':
        return 'coach';
      case 'company.com':  //use if we have to check for hr
        return 'HR'; 
      default:
        return 'employee';
    }
  };

  const onSubmit  = async (data) => {

     const payLoad = {
       email: data.email,
       password: data.password
     }
    
     try {
      const res = await LoginUser(payLoad)

      if (res.status === 201) {
         dispatch(
           loginSuccess({
             user: {
               id: res?.data?.user?.id,
               email: res?.data?.user?.email,
               fullName: res?.data?.user?.fullName,
               token: res?.data?.token
             },
             role: determineUserRole(data.email),
           })
         );
         navigate('/dashboard');
      }
     } catch (error) {
       console.error('loging error: ', error)
     }
  
  };

  return (
    <Container className="login-container">
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email address (e.g., example@domain.com)',
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                hasNumber: (value) =>
                  /\d/.test(value) || 'Password must contain at least one number',
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  'Password must contain at least one special character',
              },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
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
