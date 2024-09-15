import { useState } from "react";

const AdminProjectManagement = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: "AI Chatbot", student: "John Doe", status: "pending" },
    { id: 2, title: "IoT Smart Home", student: "Jane Smith", status: "approved" },
    { id: 3, title: "Blockchain Voting System", student: "Bob Johnson", status: "pending" },
  ]);

  const handleApprove = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status: "approved" } : project
    ));
  };

  const handleReject = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status: "rejected" } : project
    ));
  };

  return (
    <div className="container">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title mb-0">Project Management</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.student}</td>
                    <td>
                      <span className={`badge bg-${project.status === "approved" ? "success" : project.status === "rejected" ? "danger" : "warning"}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>
                      {project.status === "pending" && (
                        <div className="btn-group" role="group">
                          <button onClick={() => handleApprove(project.id)} className="btn btn-outline-success btn-sm">
                            <i className="bi bi-check-circle me-1"></i>
                            Approve
                          </button>
                          <button onClick={() => handleReject(project.id)} className="btn btn-outline-danger btn-sm">
                            <i className="bi bi-x-circle me-1"></i>
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectManagement;