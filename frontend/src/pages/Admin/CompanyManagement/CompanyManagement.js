import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import { fetchCompanies } from '../../../redux/slices/companySlice';
import { selectUserRole } from '../../../redux/slices/authSlice';
import Navbar from '../../../Components/Navbar/Navbar';

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const companies = useSelector(state => state.companies.list);
  const loading = useSelector(state => state.companies.loading);
  const error = useSelector(state => state.companies.error);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (userRole !== 'admin') {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h3>Access Denied</h3>
          <p>You do not have permission to view this page.</p>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="text-center text-danger">Error: {error}</div>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className="p-5">
          <div className="mb-4">
            <h2>Company Management</h2>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Domain</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>{company.domain}</td>
                  <td>{new Date(company.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {companies.length === 0 && !loading && !error && (
            <div className="text-center mt-3">No companies found</div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CompanyManagement;