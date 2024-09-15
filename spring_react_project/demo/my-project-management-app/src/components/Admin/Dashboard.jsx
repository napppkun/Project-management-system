import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const dashboard = () => {
    return (
        <div>
            <div className="container mt-5">
                <h1 className="mb-4">Admin Panel</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Projects</div>
                            <div className="card-body">
                                <h5 className="card-title">Number of Projects</h5>
                                <p className="card-text">42</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Students</div>
                            <div className="card-body">
                                <h5 className="card-title">Number of Students</h5>
                                <p className="card-text">120</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Courses</div>
                            <div className="card-body">
                                <h5 className="card-title">Number of Courses</h5>
                                <p className="card-text">10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default dashboard;