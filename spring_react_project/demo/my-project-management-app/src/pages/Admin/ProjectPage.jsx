import React from 'react';
import Navbar from '../../components/Admin/Navbar';
import ProjectCrud from '../../components/Admin/ProjectCrud';
const ProjectPage = () => {
    return (
        <div>
            <Navbar />
            <ProjectCrud />
        </div>
    );
}

export default ProjectPage;