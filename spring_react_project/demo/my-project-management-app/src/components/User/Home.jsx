import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
  const projects = [
    { id: 1, name: 'Project A', description: 'Description A' },
    { id: 2, name: 'Project B', description: 'Description B' },
    // Example data
  ];

  return (
    <div className="container">
      <h2>Featured Projects</h2>
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4" key={project.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;