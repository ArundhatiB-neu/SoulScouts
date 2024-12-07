import React, { useState } from 'react';
import { Container, Tabs, Tab, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupHR, signupEmployee, signupCoach } from '../../../Services/AuthService';
import { Link } from 'react-router-dom';
import { signupSuccess } from '../../../redux/slices/authSlice';
import './Signup.css';

const DOMAINS = ["Engineering", "Marketing", "Sales"];
const SPECIALIZATIONS = ["Therapy", "Music Therapy", "Art Therapy", "Meditation", "Yoga"];

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const { loading, error } = useSelector(state => state.auth);
  const [key, setKey] = useState('hr');
  const companies = useSelector(state => state.companies); // Assuming companies stored in Redux

  const auth = useSelector(state => state.auth);
const { loading, error } = auth || {};
  
  const [hrForm, setHrForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    domain: '',
    password: '',
    confirmPassword: ''
  });

  const [employeeForm, setEmployeeForm] = useState({
    fullName: '',
    company: '',
    emailPrefix: '',
    companyDomain: '',
    domain: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [coachForm, setCoachForm] = useState({
    fullName: '',
    emailPrefix: '',
    phone: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = (type, form) => {
    const newErrors = {};
   
    // Validate name
    if (!form.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(form.fullName)) {
      newErrors.fullName = 'Name should only contain letters and be 2-50 characters';
    }
   
    // Validate phone if provided
    if (form.phone && !/^\+?[\d]{10,15}$/.test(form.phone.replace(/[\s-]/g,''))) {
      newErrors.phone = 'Phone number must be 10-15 digits';
    }
   
    // Validate password
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
   
    // Validate password confirmation
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
   
    // Type-specific validations
    const typeValidations = {
      hr: () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!form.companyName?.trim() || form.companyName.length < 2) {
          newErrors.companyName = 'Company name must be at least 2 characters';
        }
        if (!form.domain?.trim()) {
          newErrors.domain = 'Domain is required';
        } else if (!/^@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(form.domain)) {
          newErrors.domain = 'Invalid domain format (e.g. @company.com)';
        }
      },
      employee: () => {
        if (!form.company) {
          newErrors.company = 'Please select a company';
        }
        if (!form.emailPrefix?.trim()) {
          newErrors.emailPrefix = 'Email prefix is required';
        } else if (!/^[a-zA-Z0-9._-]+$/.test(form.emailPrefix)) {
          newErrors.emailPrefix = 'Invalid email prefix format';
        }
        if (!form.domain) {
          newErrors.domain = 'Please select a domain';
        }
      },
      coach: () => {
        if (!form.emailPrefix?.trim()) {
          newErrors.emailPrefix = 'Email prefix is required';
        } else if (!/^[a-zA-Z0-9._-]+$/.test(form.emailPrefix)) {
          newErrors.emailPrefix = 'Invalid email prefix format';
        }
        if (!form.specialization) {
          newErrors.specialization = 'Please select a specialization';
        }
      }
    };
   
    typeValidations[type]?.();
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
   };
   
   const validatePassword = (password) => {
    if (!password) return 'Password is required';
    
    const requirements = [
      { regex: /.{8,}/, message: 'At least 8 characters' },
      { regex: /[A-Z]/, message: 'One uppercase letter' },
      { regex: /[a-z]/, message: 'One lowercase letter' },
      { regex: /[0-9]/, message: 'One number' },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'One special character' }
    ];
   
    const failed = requirements.filter(r => !r.regex.test(password));
    if (failed.length > 0) {
      return 'Password must contain: ' + failed.map(r => r.message).join(', ');
    }
   
    return '';
   };

//   const handleSubmit = (type) => async (e) => {
//     e.preventDefault();
//     const form = type === 'hr' ? hrForm : type === 'employee' ? employeeForm : coachForm;
    
//     if (validateForm(type, form)) {
//       try {
//         let userData = {...form};
        
//         if (type === 'employee') {
//           const company = companies.list.find(c => c.id === parseInt(form.company));
//           userData.email = `${form.emailPrefix}${company.domain}`;
//         } else if (type === 'coach') {
//           userData.email = `${form.emailPrefix}@soulscouts.com`;
//         }
  
//         await dispatch(
//           type === 'hr' ? signupHR(userData) :
//           type === 'employee' ? signupEmployee(userData) :
//           signupCoach(userData)
//         ).unwrap();
  
//         navigate('/dashboard');
//       } catch (err) {
//         console.error('Signup failed:', err);
//       }
//     }
//   };


const handleSubmit = (type) => async (e) => {
  e.preventDefault();
  const form = type === 'hr' ? hrForm : type === 'employee' ? employeeForm : coachForm;
  
  let response; 

  if (validateForm(type, form)) {
    try {
      let userData = { ...form };
      
      if (type === 'employee') {
        const company = companies.list.find((c) => c.id === parseInt(form.company));
        userData.email = `${form.emailPrefix}${company.domain}`;
      } else if (type === 'coach') {
        userData.email = `${form.emailPrefix}@soulscouts.com`;
      }

      if (type === 'hr') {
        response = await signupHR(userData);
      } else if (type === 'employee') {
        response = await signupEmployee(userData);
      } else if (type === 'coach') {
        response = await signupCoach(userData);
      } else {
        throw new Error('Invalid user type');
      }
  
      if (response?.status === 201) {
        dispatch(signupSuccess(response.data));
        navigate('/dashboard');
      }
      

      // Dispatch success and navigate to dashboard
      dispatch(signupSuccess(userData));
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      // Optionally handle error messaging to the user here
    }
  }
};

  return (
    <Container className="signup-container">
      <h1 className="text-center mb-4">Sign Up</h1>
      <Tabs
        id="signup-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="hr" title="HR">
          <Form onSubmit={handleSubmit('hr')}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={hrForm.fullName}
                onChange={(e) => setHrForm({...hrForm, fullName: e.target.value})}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={hrForm.email}
                onChange={(e) => setHrForm({...hrForm, email: e.target.value})}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Form.Control
                type="tel"
                value={hrForm.phone}
                onChange={(e) => setHrForm({...hrForm, phone: e.target.value})}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={hrForm.companyName}
                onChange={(e) => setHrForm({...hrForm, companyName: e.target.value})}
                isInvalid={!!errors.companyName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.companyName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type="text"
                placeholder="@company.com"
                value={hrForm.domain}
                onChange={(e) => setHrForm({...hrForm, domain: e.target.value})}
                isInvalid={!!errors.domain}
              />
              <Form.Control.Feedback type="invalid">
                {errors.domain}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={hrForm.password}
                onChange={(e) => setHrForm({...hrForm, password: e.target.value})}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={hrForm.confirmPassword}
                onChange={(e) => setHrForm({...hrForm, confirmPassword: e.target.value})}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <div className="signup-link">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Tab>

        <Tab eventKey="employee" title="Employee">
          <Form onSubmit={handleSubmit('employee')}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={employeeForm.fullName}
                onChange={(e) => setEmployeeForm({...employeeForm, fullName: e.target.value})}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Company</Form.Label>
  <Form.Select
    value={employeeForm.company}
    onChange={(e) => {
      const selectedCompany = companies.list.find(c => c.id === parseInt(e.target.value));
      setEmployeeForm({
        ...employeeForm,
        company: e.target.value,
        companyDomain: selectedCompany?.domain || '@company.com'
      });
    }}
    isInvalid={!!errors.company}
  >
    <option value="">Select Company</option>
    {companies.list.map(company => (
      <option key={company.id} value={company.id}>
        {company.name}
      </option>
    ))}
  </Form.Select>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Email</Form.Label>
  <InputGroup>
    <Form.Control
      type="text"
      value={employeeForm.emailPrefix}
      onChange={(e) => setEmployeeForm({...employeeForm, emailPrefix: e.target.value})}
      placeholder="email prefix"
      isInvalid={!!errors.emailPrefix}
    />
    <InputGroup.Text>
      {employeeForm.companyDomain || '@company.com'}
    </InputGroup.Text>
  </InputGroup>
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Domain</Form.Label>
              <Form.Select
                value={employeeForm.domain}
                onChange={(e) => setEmployeeForm({...employeeForm, domain: e.target.value})}
                isInvalid={!!errors.domain}
              >
                <option value="">Select Domain</option>
                {DOMAINS.map(domain => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.domain}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Form.Control
                type="tel"
                value={employeeForm.phone}
                onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={employeeForm.password}
                onChange={(e) => setEmployeeForm({...employeeForm, password: e.target.value})}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={employeeForm.confirmPassword}
                onChange={(e) => setEmployeeForm({...employeeForm, confirmPassword: e.target.value})}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <div className="signup-link">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Tab>

        <Tab eventKey="coach" title="Coach">
          <Form onSubmit={handleSubmit('coach')}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={coachForm.fullName}
                onChange={(e) => setCoachForm({...coachForm, fullName: e.target.value})}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <InputGroup>
                <Form.Control
                type="text"
                value={coachForm.emailPrefix}
                onChange={(e) => setCoachForm({...coachForm, emailPrefix: e.target.value})}
                placeholder="email prefix"
                isInvalid={!!errors.emailPrefix}
                />
                <InputGroup.Text className="email-domain">
                @soulscouts.com
                </InputGroup.Text>
            </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Form.Control
                type="tel"
                value={coachForm.phone}
                onChange={(e) => setCoachForm({...coachForm, phone: e.target.value})}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Select
                value={coachForm.specialization}
                onChange={(e) => setCoachForm({...coachForm, specialization: e.target.value})}
                isInvalid={!!errors.specialization}
              >
                <option value="">Select Specialization</option>
                {SPECIALIZATIONS.map(spec => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.specialization}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={coachForm.password}
                onChange={(e) => setCoachForm({...coachForm, password: e.target.value})}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={coachForm.confirmPassword}
                onChange={(e) => setCoachForm({...coachForm, confirmPassword: e.target.value})}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <div className="signup-link">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Signup;