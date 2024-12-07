// src/pages/Miscellaneous/Settings/Settings.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Navbar from "../../../Components/Navbar/Navbar";
import { updateSettings, changePassword, clearSettingsStatus } from '../../../redux/slices/settingsSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector(state => state.auth);
  const { loading, error, success, passwordChangeSuccess } = useSelector(state => state.settings);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    domain: user?.domain || '',
    specialization: user?.specialization || '',
    emergencyContact: role === 'employee' ? (user?.emergencyContact || {
      name: '',
      email: '',
      phone: ''
    }) : null,
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
        emergencyContact: role === 'employee' ? (user.emergencyContact || {
          name: '',
          email: '',
          phone: ''
        }) : null
      }));
    }

    // Clear settings status on component unmount
    return () => {
      dispatch(clearSettingsStatus());
    };
  }, [user, role, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('emergency')) {
      const [_, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearSettingsStatus());

    // Handle password change if provided
    if (formData.oldPassword && formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        dispatch({ type: 'settings/rejected', payload: "New passwords don't match" });
        return;
      }

      try {
        await dispatch(changePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })).unwrap();

        // Clear password fields
        setFormData(prev => ({
          ...prev,
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } catch (error) {
        // Error is handled by the slice
        return;
      }
    }

    // Update other settings
    const settingsData = {
      fullName: formData.fullName,
      phone: formData.phone,
      ...(role === 'employee' && {
        domain: formData.domain,
        emergencyContact: formData.emergencyContact
      }),
      ...(role === 'coach' && {
        specialization: formData.specialization
      })
    };

    dispatch(updateSettings(settingsData));
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'employee':
        return (
          <>
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

            <div className="mb-4">
              <h4>Emergency Contact</h4>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="emergency.name"
                  value={formData.emergencyContact?.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emergency.email"
                  value={formData.emergencyContact?.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="emergency.phone"
                  value={formData.emergencyContact?.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </>
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