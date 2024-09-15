import { Link } from "react-router-dom";

const projects = [
  { name: "Data Analysis Project", description: "Analyzing student performance data using Python and Pandas.", image: "/placeholder.svg" },
  { name: "Web Development Portfolio", description: "A showcase of my web development skills using React and Node.js.", image: "/placeholder.svg" },
  { name: "Machine Learning Model", description: "Predicting housing prices using scikit-learn and TensorFlow.", image: "/placeholder.svg" },
];

const latestProject = {
  name: "IoT Smart Home System",
  description: "A cutting-edge IoT project integrating various smart home devices using Raspberry Pi and MQTT protocol.",
  image: "/placeholder.svg",
  date: "March 15, 2024"
};

const Index = () => {
  return (
    <div className="container">
      <section className="bg-primary text-white p-5 rounded-3 mb-5">
        <h2 className="display-4 mb-3">Welcome to My Project Showcase</h2>
        <p className="lead mb-4">
          Explore a collection of innovative projects demonstrating various skills and technologies.
        </p>
        <Link to="https://github.com" className="btn btn-light btn-lg">
          <i className="bi bi-github me-2"></i>
          View on GitHub
        </Link>
      </section>

      <section className="mb-5">
        <h2 className="h3 mb-4">Latest Published Project</h2>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title h4">{latestProject.name}</h3>
            <p className="card-text text-muted">Published on: {latestProject.date}</p>
            <img src={latestProject.image} alt={latestProject.name} className="img-fluid rounded mb-3" />
            <p className="card-text">{latestProject.description}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="h3 mb-4">Featured Projects</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projects.map((project, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img src={project.image} alt={project.name} className="card-img-top" />
                <div className="card-body">
                  <h3 className="card-title h5">{project.name}</h3>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;