import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Department API
export const getDepartments = () => axios.get(`${API_URL}/departments`);
export const getDepartmentById = (id) => axios.get(`${API_URL}/departments/${id}`);
export const addDepartment = (department) => axios.post(`${API_URL}/departments`, department);
export const updateDepartment = (id, department) => axios.put(`${API_URL}/departments/${id}`, department);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/departments/${id}`);

// Employee API
export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/employees/${id}`);
export const addEmployee = (employee) => axios.post(`${API_URL}/employees`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/employees/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`);
