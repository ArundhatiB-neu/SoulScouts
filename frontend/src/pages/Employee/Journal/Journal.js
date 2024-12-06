// src/components/pages/Employee/Journal.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addEntry, 
  updateEntry, 
  deleteEntry, 
  selectUserEntries,
  setLoading,
  setError 
} from '../../../redux/slices/journalSlice';
import { Modal, Button, Card, Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';

const Journal = () => {
  const dispatch = useDispatch();
  //const { user, role, isAuthenticated } = useSelector(state => state.auth);

  const testAuthState = {
    user: {
      id: "emp001",
      fullName: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      company: "TechCorp",
      domain: "Engineering"
    },
    role: "employee",
    isAuthenticated: true
  };
  
  const { user, role, isAuthenticated } = testAuthState;

  const { entries, loading, error } = useSelector(state => state.journal);
  const userEntries = useSelector(state => selectUserEntries(state, user?.id));
  
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({ subject: '', content: '' });

  // Form validation
  const [formErrors, setFormErrors] = useState({ subject: '', content: '' });

  const validateForm = () => {
    let valid = true;
    const errors = { subject: '', content: '' };

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
      valid = false;
    }

    if (!formData.content.trim()) {
      errors.content = 'Content is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Authentication and role check
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'employee') {
    return <Navigate to="/unauthorized" replace />;
  }

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      const newEntry = {
        id: Date.now().toString(),
        userId: user.id,
        ...formData
      };
      dispatch(addEntry(newEntry));
      setShowCreateModal(false);
      setFormData({ subject: '', content: '' });
      setFormErrors({ subject: '', content: '' });
    } catch (err) {
      dispatch(setError('Failed to create journal entry. Please try again.'));
    }
  };

  const handleUpdate = async () => {
    if (selectedEntry.userId !== user.id) return;
    if (!validateForm()) return;
    
    try {
      dispatch(setLoading(true));
      dispatch(updateEntry({
        ...selectedEntry,
        ...formData,
        userId: user.id
      }));
      setShowModal(false);
      setFormErrors({ subject: '', content: '' });
    } catch (err) {
      dispatch(setError('Failed to update journal entry. Please try again.'));
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        dispatch(setLoading(true));
        dispatch(deleteEntry({
          entryId,
          userId: user.id
        }));
      } catch (err) {
        dispatch(setError('Failed to delete journal entry. Please try again.'));
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container className='p-4'>
      {error && (
        <Alert variant="danger" dismissible onClose={() => dispatch(setError(null))}>
          {error}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Journal</h2>
        <Button variant="primary" className='w-auto' onClick={() => setShowCreateModal(true)}>
          New Entry
        </Button>
      </div>

      {userEntries.length === 0 ? (
        <Alert variant="info">
          You haven't created any journal entries yet. Click "New Entry" to get started!
        </Alert>
      ) : (
        <Row className="g-4">
          {userEntries.map(entry => (
            <Col key={entry.id} xs={12}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title>{entry.subject}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Created: {formatDate(entry.createdTimeStamp)}
                      </Card.Subtitle>
                      <Card.Text  style={{ color: '#666' }}>
                        {truncateText(entry.content)}
                      </Card.Text>
                    </div>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setFormData({ subject: entry.subject, content: entry.content });
                          setShowModal(true);
                        }}
                      >
                        View/Edit
                      </Button>
                      <Button 
                        variant="outline-danger"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* View/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Journal Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                isInvalid={!!formErrors.subject}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.subject}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                isInvalid={!!formErrors.content}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.content}
              </Form.Control.Feedback>
            </Form.Group>
            {selectedEntry && (
              <div className="text-muted">
                <small>
                  Last edited: {formatDate(selectedEntry.lastEditTimeStamp)}
                </small>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Journal Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                isInvalid={!!formErrors.subject}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.subject}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                isInvalid={!!formErrors.content}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.content}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create Entry
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default Journal;