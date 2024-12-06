import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import { addCompany, updateCompany, deleteCompany } from '../../../redux/slices/companySlice';
import Navbar from '../../../Components/Navbar/Navbar';

const CompanyManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const companies = useSelector(state => state.companies.list);
  const dispatch = useDispatch();
  const userRole = "admin";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    phoneNumber: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^(\+?\d{1,3}[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
        newErrors.phoneNumber = 'Please enter a valid 10-digit phone number (+1 (234) 567-8900)';
    }

    const domainRegex = /^@[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(formData.domain)) {
      newErrors.domain = 'Domain must start with @ and be in format: @company.com';
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
      if (selectedCompany) {
        dispatch(updateCompany({ ...formData, id: selectedCompany.id }));
      } else {
        dispatch(addCompany({ ...formData, id: Date.now() }));
      }
      setShowModal(false);
      setFormData({ name: '', email: '', domain: '', phoneNumber: '', address: '' });
      setErrors({});
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setFormData(company);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      dispatch(deleteCompany(id));
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
      <div className="p-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Company Management</h2>
          <Button 
            onClick={() => {
              setSelectedCompany(null);
              setShowModal(true);
            }}
            className="w-auto"
          >
            Add Company
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Domain</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.domain}</td>
                <td>{company.phoneNumber}</td>
                <td>{company.address}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEdit(company)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedCompany ? 'Edit Company' : 'Add Company'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
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
                <Form.Label>Company Domain</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.domain}
                  placeholder='@company.com'
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  isInvalid={!!errors.domain}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.domain}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.phoneNumber}
                  placeholder='+1 (234) 567-8900'
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  isInvalid={!!errors.phoneNumber}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {selectedCompany ? 'Update' : 'Add'} Company
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
    </div>
  );
};

export default CompanyManagement;