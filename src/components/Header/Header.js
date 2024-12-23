import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtom';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ title }) => {
  const userState = useRecoilValue(userAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = logout();
    if (!result.isAuthenticated) navigate('/login');
  };

  const ProfilePage = () => {
    navigate('/profile');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item className="me-3">
              <span onClick={ProfilePage} className="navbar-text clickable">{userState.firstName} {userState.lastName}</span>
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;