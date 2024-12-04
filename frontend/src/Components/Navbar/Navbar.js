import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../Assets/soulscouts-logo.png';

const Navigation = () => {
  //const userRole = useSelector(state => state.auth.role);
  const userRole = "employee";
  
  const navLinks = {
    HR: [
      { title: 'HR Dashboard', path: '/hr-dashboard' },
      { title: 'HR Settings', path: '/hr-settings' },
      { title: 'Employee Management', path: '/employee-management' },
      { title: 'Coach Management', path: '/coach-management' },
      { title: 'Resource Library Management', path: '/resource-management' },
      { title: 'Manage Subscription', path: '/subscription' },
      { title: 'Logout', path: '/logout' }
    ],
    employee: [
      { title: 'Employee Dashboard', path: '/employee-dashboard' },
      { title: 'Employee Settings', path: '/employee-settings' },
      { title: 'Resource Library', path: '/resources' },
      { title: 'Journal', path: '/journal' },
      { title: 'Logout', path: '/logout' }
    ],
    coach: [
      { title: 'Coach Dashboard', path: '/coach-dashboard' },
      { title: 'Coach Settings', path: '/coach-settings' },
      { title: 'Resource Library', path: '/resources' },
      { title: 'Logout', path: '/logout' }
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
            <NavDropdown.Item key={index} href={link.path}>
              {link.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </div>
    </Navbar>
  );
};

export default Navigation;