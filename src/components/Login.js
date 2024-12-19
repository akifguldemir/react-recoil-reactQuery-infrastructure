import React from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../recoil/atoms/authAtom';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Form as BootstrapForm, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values) => {
    // Simulate authentication
    if (values.username === 'user' && values.password === 'password') {
      setAuth({ isAuthenticated: true });
      history.push('/protected');
      alert('Login successful!');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <BootstrapForm.Group controlId="formUsername">
              <BootstrapForm.Label>Username</BootstrapForm.Label>
              <Field name="username">
                {({ field }) => (
                  <BootstrapForm.Control
                    type="text"
                    placeholder="Enter username"
                    {...field}
                    isInvalid={!!<ErrorMessage name="username" component="div" />}
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
                    isInvalid={!!<ErrorMessage name="password" component="div" />}
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
    </Container>
  );
};

export default Login;