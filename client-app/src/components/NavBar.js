import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand  href="/dashboard">
            <img
              alt=""
              src="logo_temp.png"
              width="40"
              height="40"
              className="d-inline-block align-center"
            />{' '}
            Wise Wallet</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/groups">Groups</Nav.Link>
            <Nav.Link href="/statements">Analyze Statements</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;