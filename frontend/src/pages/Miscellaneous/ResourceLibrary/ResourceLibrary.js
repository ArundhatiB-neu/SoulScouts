import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { addResource, updateResource, deleteResource } from '../../../redux/store';
import Navbar from '../../../Components/Navbar/Navbar';
import './ResourceLibrary.css';

const ResourceLibrary = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const resources = useSelector(state => state.resources.list);
  const categories = useSelector(state => state.resources.categories);
  //const userRole = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const userRole = "hr";
  
  const isAdmin = userRole === 'admin';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedResource) {
      dispatch(updateResource({ ...formData, id: selectedResource.id }));
    } else {
      dispatch(addResource({ ...formData, id: Date.now() }));
    }
    setShowModal(false);
    setFormData({ title: '', description: '', link: '', category: '' });
  };

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setFormData(resource);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      dispatch(deleteResource(id));
    }
  };

  const filteredResources = selectedCategory 
    ? resources.filter(resource => resource.category === selectedCategory)
    : resources;

  return (
    <Container className="py-4">
      <Navbar/>
      <br/><br/>
      <h1>Resource Library</h1>
      <br/>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {isAdmin && (
          <Button 
            variant="primary"
            onClick={() => {
              setSelectedResource(null);
              setShowModal(true);
            }}
          >
            Add Resource
          </Button>
        )}
        <Form.Select 
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredResources.map(resource => (
          <Col key={resource.id}>
            <Card className="resource-card">
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                <Card.Img 
                  variant="top" 
                  src={`https://img.youtube.com/vi/${getYouTubeId(resource.link)}/mqdefault.jpg`}
                  alt={resource.title}
                />
              </a>
              <Card.Body>
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
                {isAdmin && (
                  <div className="mt-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="me-2" 
                      onClick={() => handleEdit(resource)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDelete(resource.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {isAdmin && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedResource ? 'Edit Resource' : 'Add Resource'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                {selectedResource ? 'Update' : 'Add'} Resource
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default ResourceLibrary;