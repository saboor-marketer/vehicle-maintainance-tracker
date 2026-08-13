import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/vehicles', label: 'Vehicles' },
    { path: '/maintenance', label: 'Maintenance' },
    { path: '/reminders', label: 'Reminders' },
    { path: '/expenses', label: 'Expenses' }
  ];

  return (
    <BSNavbar bg="white" expand="lg" className="mb-4">
      <Container fluid>
        <BSNavbar.Brand as={Link} to="/">
          🚗 Vehicle Maintenance Tracker
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map(item => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
