import React from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import {Container} from 'react-bootstrap';
import EmployeeWellnessForm from '../../../Components/Employee-Wellness-Form/EmployeeWellnessForm';

const EmployeeDashboard = () => {
  return (
    <Container className = "py-5">
      <Navbar />
      <h2>Employee Dashboard</h2>
      <EmployeeWellnessForm />
    </Container>
  )
}

export default EmployeeDashboard