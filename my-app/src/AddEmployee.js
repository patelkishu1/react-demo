// src/AddEmployee.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, addEmployee, updateEmployee } from './apiService';
import { getDepartments } from './apiService'; // Import getDepartments API call

function AddEmployee({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]); // State for departments
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    const fetchEmployee = async () => {
      if (mode === 'update' && id) {
        try {
          const response = await getEmployeeById(id);
          const { firstName, lastName, email, departmentId } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setDepartment(departmentId);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching employee:', error);
          setLoading(false);
        }
      } else {
        setLoading(false); // If in add mode, no need to fetch data
      }
    };

    fetchDepartments(); // Fetch departments
    fetchEmployee();
  }, [id, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, email, departmentId: +department };
    try {
      if (mode === 'add') {
        await addEmployee(employee);
      } else {
        await updateEmployee(id, employee);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{mode === 'add' ? 'Add Employee' : 'Update Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Employee First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter Employee First Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Employee Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Employee Last Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Employee Email ID:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Employee Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department:</label>
          <select
            id="department"
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => 
            (
              <option key={dept.id} value={dept.id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          {mode === 'add' ? 'Submit' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
