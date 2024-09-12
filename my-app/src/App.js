import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Departments from './Department';
import AddDepartment from './AddDepartment';
import Employees from './Employee'; 
import AddEmployee from './AddEmployee';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/add" element={<AddDepartment mode="add" />} />
        <Route path="/departments/update/:id" element={<AddDepartment mode="update" />} />
        <Route path="/employees" element={<Employees />} /> 
        <Route path="/employees/add" element={<AddEmployee mode="add" />} />
        <Route path="/employees/update/:id" element={<AddEmployee mode="update" />} />
      </Routes>
    </Router>
  );
}

export default App;
