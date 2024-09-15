import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Dashboard from '../../components/Admin/Dashboard';
import Navbar from '../../components/Admin/Navbar';

const AdminPage = () => {
    return (
        <div>
          <Navbar />
          <Dashboard />
        </div>
      );
};

export default AdminPage;