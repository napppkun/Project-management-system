import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/Admin/AdminPage';
import UserPage from '../pages/User/UserPage';
import ProjectCrud from '../pages/Admin/ProjectPage';
import CourseCrud from '../pages/Admin/CoursePage';
function AppRouter(){
  return (
    <Router>           
        <Routes>
            <Route path="/admin" element = {<AdminPage />} />
            <Route path="/admin/project-crud" element = {<ProjectCrud />} />
            <Route path="/admin/course-crud" element = {<CourseCrud />} />
            <Route path="/user" element = {<UserPage />} />                    
            
        </Routes>   
    </Router>
  );
};

export default AppRouter;