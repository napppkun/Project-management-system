import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../services/CourseService';

const CourseCrud = () => {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({ id: null, name: '', description: '', credits: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add', 'update', 'delete'
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setIsLoading(true);
        try {
            const response = await getCourses();
            setCourses(response.data);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCourse = async () => {
        setIsLoading(true);
        try {
            await createCourse(formData);
            showNotification('Course added successfully');
            loadCourses(); // Reload courses after adding
            handleCloseModal();
        } catch (error) {
            console.error('Error adding course:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateCourse = async () => {
        setIsLoading(true);
        try {
            await updateCourse(formData.id, formData);
            showNotification('Course updated successfully');
            loadCourses(); // Reload courses after updating
            handleCloseModal();
        } catch (error) {
            console.error('Error updating course:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCourse = async () => {
        setIsLoading(true);
        try {
            await deleteCourse(courseToDelete.id);
            showNotification('Course deleted successfully');
            loadCourses(); // Reload courses after deleting
            setCourseToDelete(null);
            handleCloseConfirmModal();
        } catch (error) {
            console.error('Error deleting course:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowModal = (course = { id: null, name: '', description: '', credits: '' }, type = 'add') => {
        setFormData(course);
        setIsEdit(type === 'edit');
        setActionType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: null, name: '', description: '', credits: '' });
    };

    const handleShowConfirmModal = (course, type) => {
        setCourseToDelete(course);
        setActionType(type);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        setCourseToDelete(null);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Course Management</h1>
            <Button
                variant="primary"
                onClick={() => handleShowModal({}, 'add')}
                disabled={isLoading}
            >
                Add Course
            </Button>
            {notification && <Alert variant="success" className="mt-3">{notification}</Alert>}
            {isLoading && <Spinner animation="border" className="mt-3" />}
            <Table striped bordered hover className="mt-4" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Credits</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleShowModal(course, 'edit')}
                                    disabled={isLoading}
                                >
                                    Edit
                                </Button>{' '}
                                <Button
                                    variant="danger"
                                    onClick={() => handleShowConfirmModal(course, 'delete')}
                                    disabled={isLoading}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Course Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit Course' : 'Add Course'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter course name"
                                disabled={isLoading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter course description"
                                disabled={isLoading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Credits</Form.Label>
                            <Form.Control
                                type="number"
                                name="credits"
                                value={formData.credits}
                                onChange={handleChange}
                                placeholder="Enter course credits"
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={isLoading}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={isEdit ? handleUpdateCourse : handleAddCourse}
                        disabled={isLoading}
                    >
                        {isEdit ? 'Update Course' : 'Add Course'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {actionType} this course?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        variant={actionType === 'delete' ? 'danger' : 'primary'}
                        onClick={actionType === 'delete' ? handleDeleteCourse : () => {
                            handleCloseConfirmModal();
                            actionType === 'add' ? handleAddCourse() : handleUpdateCourse();
                        }}
                        disabled={isLoading}
                    >
                        {actionType === 'delete' ? 'Delete' : actionType === 'add' ? 'Add' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CourseCrud;