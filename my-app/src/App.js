// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Departments from './Department';
import AddDepartment from './AddDepartment';
import Employees from './Employee'; // Import Employee List component
import AddEmployee from './AddEmployee'; // Import Add/Update Employee component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/add" element={<AddDepartment mode="add" />} />
        <Route path="/departments/update/:id" element={<AddDepartment mode="update" />} />
        <Route path="/employees" element={<Employees />} /> {/* Employee List route */}
        <Route path="/employees/add" element={<AddEmployee mode="add" />} /> {/* Add Employee route */}
        <Route path="/employees/update/:id" element={<AddEmployee mode="update" />} /> {/* Update Employee route */}
      </Routes>
    </Router>
  );
}

export default App;
