import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Navbar from "../../../Components/Navbar/Navbar";

const Settings = () => {
  // const user = useSelector(state => state.auth.user);
  // const userRole = useSelector(state => state.auth.role);
  // const dispatch = useDispatch();

  const userRole = "hr";
  const user = {};

  const [formData, setFormData] = useState({
    profilePicture: user.profilePicture || '',
    fullName: user.fullName || '',
    phoneNumber: user.phoneNumber || '',
    domain: user.domain || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    emergencyContact: userRole === 'employee' ? (user.emergencyContact || {
      name: '',
      email: '',
      phone: ''
    }) : null
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // dispatch({ 
    //   type: 'UPDATE_USER_SETTINGS', 
    //   payload: formData 
    // });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      profilePicture: URL.createObjectURL(file)
    }));
  };

  return (
    <Container fluid>
      <Navbar/>
      <div class="p-5">
      <br/><br/>
      <h2>Settings</h2>
      <br/>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={3}>
            <Image 
              src={formData.profilePicture || "/api/placeholder/150/150"} 
              roundedCircle 
              width={150} 
              height={150}
            />
            <Form.Control 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
          </Col>
          <Col md={9}>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" value={user.company} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user.email} disabled />
            </Form.Group>
          </Col>
        </Row>

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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Form.Group>

        {userRole === 'employee' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Domain</Form.Label>
              <Form.Select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
              >
                <option value="">Select Domain</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </Form.Select>
            </Form.Group>

            <div className="mb-4">
              <h4>Emergency Contact</h4>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="emergency.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emergency.email"
                  value={formData.emergencyContact.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="emergency.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </>
        )}



        <h4>Change Password</h4>
        <Form.Group className="mb-3">
          <Form.Label>Old Password</Form.Label>
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

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
      </div>
    </Container>
  );
};

export default Settings;