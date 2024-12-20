import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtom';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const userState = useRecoilValue(userAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item className="mr-3">
            <span className="navbar-text">{userState.firstName} {userState.lastName}</span>
          </Nav.Item>
          <Nav.Item>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;