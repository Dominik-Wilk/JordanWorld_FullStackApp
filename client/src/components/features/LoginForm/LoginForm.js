import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import { z } from 'zod';

import { API_AUTH_URL } from '../../../config';
import { logIn, getUser } from '../../../redux/usersRedux';
import styles from './LoginForm.module.scss';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({
      email: login,
      password: password,
    });
    if (!result.success) {
      const newErrors = result.error.issues.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(newErrors);
      setStatus('clientError');
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login, password }),
    };

    setStatus('loading');
    fetch(`${API_AUTH_URL}/login`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setStatus('success');
        dispatch(logIn(data));
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        if (error.message === 'Bad Request') {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      });
  };

  if (user) {
    return (
      <Alert variant="success" className={styles.alert}>
        <Alert.Heading>You have been successfully logged in!</Alert.Heading>
        <p>Now you can start adding product into basket and make a order.</p>
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={`rounded ${styles.form}`}>
        {status === 'serverError' && (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Login or password are incorrect...</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation="border" role="status" className="d-block mx-auto">
            <span className="visually-hidden">Please wait a moment...</span>
          </Spinner>
        )}

        <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label className={styles.formLabel}>E-mail</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Please type your email..."
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className={styles.formLabel}>Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please type your password..."
              isInvalid={errors.password}
            />
            <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <RxEyeOpen className={styles.eye} />
              ) : (
                <RxEyeClosed className={styles.eye} />
              )}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" className={styles.buttonSubmit}>
          Sign in
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
