// src/AddDepartment.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDepartmentById, addDepartment, updateDepartment } from './apiService';

function AddDepartment({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === 'update' && id) {
      const fetchDepartment = async () => {
        try {
          const response = await getDepartmentById(id);
          const { departmentName, departmentDescription } = response.data;
          setDepartmentName(departmentName);
          setDepartmentDescription(departmentDescription);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching department:', error);
          setLoading(false);
        }
      };
      fetchDepartment();
    } else {
      setLoading(false); // If in add mode, no need to fetch data
    }
  }, [id, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const department = { departmentName, departmentDescription };
      if (mode === 'add') {
        await addDepartment(department);
      } else {
        await updateDepartment(id, department);
      }
      navigate('/departments');
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{mode === 'add' ? 'Add Department' : 'Update Department'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departmentName" className="form-label">Department Name:</label>
          <input
            type="text"
            className="form-control"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter Department Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departmentDescription" className="form-label">Department Description:</label>
          <input
            type="text"
            className="form-control"
            id="departmentDescription"
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
            placeholder="Enter Department Description"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {mode === 'add' ? 'Submit' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
