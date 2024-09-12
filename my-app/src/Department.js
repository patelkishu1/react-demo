import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDepartments, deleteDepartment } from './apiService';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        console.log('Fetched departments:', response.data); 
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleAddDepartment = () => {
    navigate('/departments/add');
  };

  const handleUpdateDepartment = (id) => {
    navigate(`/departments/update/${id}`);
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter(department => department.id !== id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Departments</h2>
        <button className="btn btn-primary" onClick={handleAddDepartment}>Add Department</button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map(department => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.departmentName}</td>
                <td>{department.departmentDescription}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => handleUpdateDepartment(department.id)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteDepartment(department.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No departments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;
