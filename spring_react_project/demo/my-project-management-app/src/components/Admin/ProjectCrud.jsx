import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ProjectCrud = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch projects from API or backend
    // setProjects(fetchedProjects);
  }, []);

  const handleAddProject = () => {
    // API call to add new project
    setProjects([...projects, newProject]);
    setShowModal(false);
  };

  const handleDeleteProject = (id) => {
    // API call to delete project
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="container">
      <h2>Project Management</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Project
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Project Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="projectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project description"
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddProject}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectCrud;
