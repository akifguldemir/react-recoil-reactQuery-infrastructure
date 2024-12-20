import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form as BootstrapForm, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const result = await login(values);
      if (result) {
        navigate('/protected');
      }
    } catch (error) {
      enqueueSnackbar('That was easy fail!')
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <BootstrapForm.Group controlId="formUsername">
                  <BootstrapForm.Label>Username</BootstrapForm.Label>
                  <Field name="username">
                    {({ field }) => (
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Enter username"
                        {...field}
                        isInvalid={touched.username && !!errors.username}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="username" component={BootstrapForm.Control.Feedback} type="invalid" />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPassword">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <Field name="password">
                    {({ field }) => (
                      <BootstrapForm.Control
                        type="password"
                        placeholder="Enter password"
                        {...field}
                        isInvalid={touched.password && !!errors.password}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="password" component={BootstrapForm.Control.Feedback} type="invalid" />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100 mt-3">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <SnackbarProvider />
    </Container>
  );
};
