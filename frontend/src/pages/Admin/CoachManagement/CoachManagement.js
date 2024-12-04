import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Modal, Form, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { addCoach, updateCoach, deleteCoach, assignCompany } from '../../../redux/slices/coachSlice';
import Navbar from '../../../Components/Navbar/Navbar';

const CoachManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');
  const coaches = useSelector(state => state.coaches.list);
  const companies = useSelector(state => state.companies.list);
  const dispatch = useDispatch();
  const userRole = "admin";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    specialization: '',
    companyId: '',
    companyName: 'Unassigned'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = 'Name must be 2-50 characters and contain only letters, spaces, hyphens and apostrophes';
    }
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^(\+?\d{1,3}[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number (+1 (234) 567-8900)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (userRole !== 'admin') {
    return <div>Access Denied</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (selectedCoach) {
        dispatch(updateCoach({ ...formData, id: selectedCoach.id }));
      } else {
        dispatch(addCoach({ ...formData, id: Date.now() }));
      }
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        specialization: '',
        companyId: '',
        companyName: 'Unassigned'
      });
      setErrors({});
    }
  };

  const handleCompanyAssignment = (coachId, companyId, companyName) => {
    dispatch(assignCompany({ coachId, companyId, companyName }));
  };

  const handleEdit = (coach) => {
    setSelectedCoach(coach);
    setFormData(coach);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      dispatch(deleteCoach(id));
    }
  };

  const filteredCoaches = selectedCompanyFilter === 'all' 
  ? coaches 
  : selectedCompanyFilter === 'unassigned'
  ? coaches.filter(coach => !coach.companyId || coach.companyName === 'Unassigned')
  : coaches.filter(coach => coach.companyId && coach.companyId.toString() === selectedCompanyFilter.toString());

  return (
    <Container className="py-4">
      <Navbar />
      <br /><br />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Coach Management</h2>
        <div className="d-flex gap-3">
          <Form.Select 
            value={selectedCompanyFilter}
            onChange={(e) => setSelectedCompanyFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Companies</option>
            <option value="unassigned">Unassigned</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Form.Select>
          <Button onClick={() => {
            setSelectedCoach(null);
            setShowModal(true);
          }}>
            Add Coach
          </Button>
        </div>
      </div>

      <Row className="g-4">
        {filteredCoaches.map(coach => (
          <Col xs={12} key={coach.id}>
            <Card>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>{coach.name}</Card.Title>
                  <Card.Text>
                    Email: {coach.email}<br />
                    Phone: {coach.phoneNumber}<br />
                    Specialization: {coach.specialization}<br />
                    Company: {coach.companyName || 'Unassigned'}
                  </Card.Text>
                </div>
                <div className="d-flex gap-2">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id={`dropdown-${coach.id}`}>
                      Assign Company
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item 
                        onClick={() => handleCompanyAssignment(coach.id, '', 'Unassigned')}
                      >
                        Unassigned
                      </Dropdown.Item>
                      {companies.map(company => (
                        <Dropdown.Item
                          key={company.id}
                          onClick={() => handleCompanyAssignment(coach.id, company.id, company.name)}
                        >
                          {company.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button 
                    variant="outline-primary"
                    onClick={() => handleEdit(coach)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger"
                    onClick={() => handleDelete(coach.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCoach ? 'Edit Coach' : 'Add Coach'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={formData.phoneNumber}
                placeholder="+1 (234) 567-8900"
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                isInvalid={!!errors.phoneNumber}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {selectedCoach ? 'Update' : 'Add'} Coach
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CoachManagement;