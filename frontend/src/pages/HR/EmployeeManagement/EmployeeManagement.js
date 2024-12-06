import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Modal, Form, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { addEmployee, updateEmployee, deleteEmployee, assignCoach } from '../../../redux/slices/employeeSlice';
import Navbar from '../../../Components/Navbar/Navbar';
import { Navigate } from 'react-router-dom';

const EmployeeManagement = () => {
    // const userRole = useSelector(state => state.auth.role);
    const userRole = "HR";

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [domainFilter, setDomainFilter] = useState('all');
  const [coachFilter, setCoachFilter] = useState('all');

  //const companyId = useSelector(state => state.auth.user.companyId);
  const companyId = "123";
  const employees = useSelector(state => 
    state.employees.list.filter(e => e.companyId === companyId)
  );
  const coaches = useSelector(state => 
    state.coaches.list.filter(c => c.companyId === companyId)
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    profilePicture: '',
    fullName: '',
    email: '',
    domain: '',
    phoneNumber: '',
    emergencyContact: {
      fullName: '',
      email: '',
      phone: ''
    },
    password: 'Pass@123',
    companyId,
    coachId: '',
    coachName: 'Unassigned'
  });

  const [errors, setErrors] = useState({});

  if (userRole !== 'HR') {
    return (<Navigate to="/unauthorized" replace />);
}

  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    if (!nameRegex.test(formData.fullName.trim())) {
      newErrors.fullName = 'Name must be 2-50 characters and contain only letters, spaces, hyphens and apostrophes';
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^(\+?\d{1,3}[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.domain) {
      newErrors.domain = 'Please select a domain';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addEmployee({ ...formData, id: Date.now() }));
      setShowModal(false);
      setFormData({
        ...formData,
        fullName: '',
        email: '',
        domain: '',
        phoneNumber: '',
        emergencyContact: { fullName: '', email: '', phone: '' }
      });
    }
  };

  const filteredEmployees = employees
  .filter(employee => domainFilter === 'all' ? true : employee.domain === domainFilter)
  .filter(employee => {
    console.log('Coach Filter:', coachFilter);
    console.log('Employee Coach ID:', employee.coachId);
    
    if (coachFilter === 'all') return true;
    if (coachFilter === 'unassigned') return !employee.coachId || employee.coachName === 'Unassigned';
    return employee.coachId === parseInt(coachFilter);
  });

  return (
    <div>
      <Navbar />
      <Container>
      <br /><br />
      <h2 class="text-center">Employee Management</h2>
      <div class="p-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <Form.Select 
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="all">All Domains</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </Form.Select>
          <Form.Select
            value={coachFilter}
            onChange={(e) => setCoachFilter(e.target.value)}
          >
            <option value="all">All Coaches</option>
            <option value="unassigned">Unassigned</option>
            {coaches.map(coach => (
              <option key={coach.id} value={coach.id}>
                {coach.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <Button onClick={() => setShowModal(true)} className="w-auto">Add Employee</Button>
      </div>

      <Row className="g-4">
        {filteredEmployees.map(employee => (
          <Col xs={12} key={employee.id}>
            <Card>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img 
                    src={employee.profilePicture || "/api/placeholder/40/40"} 
                    alt="Profile" 
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div>
                    <Card.Title>{employee.fullName}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {employee.domain.charAt(0).toUpperCase() + employee.domain.slice(1)}
                    </Card.Subtitle>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">
                      Coach: {employee.coachName || 'Unassigned'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item 
                        onClick={() => dispatch(assignCoach({
                          employeeId: employee.id,
                          coachId: '',
                          coachName: 'Unassigned'
                        }))}
                      >
                        Unassigned
                      </Dropdown.Item>
                      {coaches.map(coach => (
                        <Dropdown.Item
                          key={coach.id}
                          onClick={() => dispatch(assignCoach({
                            employeeId: employee.id,
                            coachId: coach.id,
                            coachName: coach.name
                          }))}
                        >
                          {coach.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button 
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(deleteEmployee(employee.id))}
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
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                isInvalid={!!errors.fullName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
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
              <Form.Label>Domain</Form.Label>
              <Form.Select
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value})}
                isInvalid={!!errors.domain}
                required
              >
                <option value="">Select Domain</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.domain}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Form.Control
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </div>
    </Container>
    </div>
  );
};

export default EmployeeManagement;