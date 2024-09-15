import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

// Get all courses
export const getCourses = async () => {
    return await axios.get(API_URL);
};

// Get a single course by ID
export const getCourseById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Create a new course
export const createCourse = async (course) => {
    return await axios.post(API_URL, course);
};

// Update an existing course
export const updateCourse = async (id, course) => {
    return await axios.put(`${API_URL}/${id}`, course);
};

// Delete a course
export const deleteCourse = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};