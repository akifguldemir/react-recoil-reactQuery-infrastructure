import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import { userAtom } from '../../recoil/atoms/userAtom';
import { useRecoilState } from 'recoil';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

export default function Profile() {
  const [userState, setUserState] = useRecoilState(userAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery('userData', () => UserService.getUser(), {
    onSuccess: (data) => {
      setUserState(data.data);
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleLogout = () => {
    const result = logout();
    if (!result.isAuthenticated) navigate('/login');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="text-center">Profile</Card.Title>
                <Image src={userState.image} roundedCircle width="50" height="50" />
              </div>
              <Card.Text>
                <strong>First Name:</strong> {userState.firstName}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {userState.lastName}
              </Card.Text>
              <Card.Text>
                <strong>Age:</strong> {userState.age}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userState.email}
              </Card.Text>
              <div className="d-grid">
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}