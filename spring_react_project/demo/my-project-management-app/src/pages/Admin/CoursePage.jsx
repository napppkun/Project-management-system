import React from 'react';
import Navbar from '../../components/Admin/Navbar';
import CourseCrud from '../../components/Admin/CourseCrud';

const CoursePage = () => {
    return (
        <div>
            <Navbar />
            <CourseCrud />
        </div>
    );
}
export default CoursePage;