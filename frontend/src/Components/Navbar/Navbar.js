import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logoutUser, selectUserRole } from '../../redux/slices/authSlice';
import logo from '../../Assets/soulscouts-logo.png';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate to login even if logout fails
      navigate('/login');
    }
  };

  const navLinks = {
    hr: [
      { title: 'HR Dashboard', path: '/hr-dashboard' },
      { title: 'HR Settings', path: '/settings' },
      { title: 'Employee Management', path: '/employee-management' },
      { title: 'Resource Library', path: '/library' },
      // { title: 'Manage Subscription', path: '/subscription' }
    ],
    employee: [
      { title: 'Employee Dashboard', path: '/employee-dashboard' },
      { title: 'Employee Settings', path: '/settings' },
      { title: 'Resource Library', path: '/library' },
      { title: 'Journal', path: '/journal' }
    ],
    coach: [
      { title: 'Coach Dashboard', path: '/coach-dashboard' },
      { title: 'Coach Settings', path: '/settings' },
      { title: 'Resource Library', path: '/library' }
    ],
    admin: [
      { title: 'Coach Management', path: '/coach-management' },
      { title: 'Company Management', path: '/company-management' },
      { title: 'Resource Library', path: '/library' }
    ]
  };

  return (
    <Navbar bg="light" className="px-4">
      <Navbar.Brand href="/">
        <img src={logo} alt="Logo" height="40" />
      </Navbar.Brand>
      <div className="ms-auto">
        <NavDropdown
          title="Links"
          id="nav-dropdown"
          align="end"
        >
          {navLinks[userRole]?.map((link, index) => (
            <NavDropdown.Item 
              key={index} 
              href={link.path}
            >
              {link.title}
            </NavDropdown.Item>
          ))}
          {/* Separate logout item with onClick handler */}
          <NavDropdown.Divider />
          <NavDropdown.Item 
            onClick={handleLogout}
            className="text-danger"
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </Navbar>
  );
};

export default Navigation;