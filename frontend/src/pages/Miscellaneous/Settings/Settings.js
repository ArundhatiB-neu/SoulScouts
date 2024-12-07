// src/pages/Miscellaneous/Settings/Settings.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Navbar from "../../../Components/Navbar/Navbar";
import { updateSettings, changePassword, clearSettingsStatus } from '../../../redux/slices/settingsSlice';

import { fetchUserData } from '../../../redux/slices/authSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector(state => state.auth);
  const { loading, error, success, passwordChangeSuccess } = useSelector(state => state.settings);
  const authState = useSelector(state => state.auth);
console.log('Auth state:', authState);
console.log('User data:', authState.user);

useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('Current token in localStorage:', token);
  
  if (!user) {
    console.log('About to fetch user data with token...');
    dispatch(fetchUserData())
      .unwrap()
      .then(data => console.log('Fetch successful:', data))
      .catch(err => console.error('Fetch failed:', err));
  }
}, [dispatch, user]);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    domain: user?.domain || '',
    specialization: user?.specialization || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Reset form when user data changes
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        phone: user.phone || '',
        domain: user.domain || '',
        specialization: user.specialization || '',
      }));
    }

    // Clear settings status on component unmount
    return () => {
      dispatch(clearSettingsStatus());
    };
  }, [user, role, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePasswordForm = () => {
    if (!formData.oldPassword) {
      dispatch({ type: 'settings/rejected', payload: "Current password is required" });
      return false;
    }
    
    if (!formData.newPassword) {
      dispatch({ type: 'settings/rejected', payload: "New password is required" });
      return false;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      dispatch({ type: 'settings/rejected', payload: "New passwords don't match" });
      return false;
    }
  
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      dispatch({ 
        type: 'settings/rejected', 
        payload: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      });
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearSettingsStatus());
  
    // Handle password change if provided
    if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
      if (!validatePasswordForm()) {
        return;
      }
  
      try {
        await dispatch(changePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })).unwrap();
  
        setFormData(prev => ({
          ...prev,
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } catch (error) {
        return;
      }
    }
  
    // ... rest of the settings update code
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'employee':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Domain</Form.Label>
            <Form.Select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
            >
              <option value="">Select Domain</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </Form.Select>
          </Form.Group>
        );
      case 'coach':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            >
              <option value="">Select Specialization</option>
              <option value="Therapy">Therapy</option>
              <option value="Music Therapy">Music Therapy</option>
              <option value="Art Therapy">Art Therapy</option>
              <option value="Meditation">Meditation</option>
              <option value="Yoga">Yoga</option>
            </Form.Select>
          </Form.Group>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div className="p-5">
          <br /><br />
          <h2>Settings</h2>
          <br />

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Settings updated successfully!</Alert>}
          {passwordChangeSuccess && <Alert variant="success">Password updated successfully!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control 
                type="text" 
                value={user?.company?.name || ''} 
                disabled 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={user?.email || ''} 
                disabled 
              />
            </Form.Group>

            {role !== 'admin' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </Form.Group>
              </>
            )}

            {renderRoleSpecificFields()}

            <h4>Change Password</h4>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className='w-auto'
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Settings;