import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import { z } from 'zod';

import { getUser } from '../../../redux/usersRedux';
import { API_AUTH_URL } from '../../../config';
import styles from './RegisterForm.module.scss';

const registrationSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    passwordRepeat: z.string(),
    name: z.string().min(1, { message: 'Name is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Passwords do not match',
    path: ['passwordRepeat'],
  });

const RegisterForm = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
    name: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = result.error.issues.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(newErrors);
      setStatus('clientError');
      return;
    }

    const data = {
      ...formData,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    setStatus('loading');

    fetch(`${API_AUTH_URL}/register`, options)
      .then((res) => {
        let status = res.status;
        return res.json().then((data) => ({ ...data, status }));
      })
      .then((data) => {
        if (data.status === 201) {
          setStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else if (data.status === 400) {
          setStatus('clientError');
        } else if (data.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      });
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (user) {
    return (
      <Alert variant="success" className={styles.alert}>
        <Alert.Heading>Account Already Active</Alert.Heading>
        <p>
          Your account is already active. If you want to create a new one,
          please log out first.
        </p>
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={`rounded ${styles.form}`}>
        {status === 'success' && (
          <Alert variant="success" className={styles.alert}>
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been registered! Now you can log in...</p>
          </Alert>
        )}

        {status === 'serverError' && (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant="danger" className={styles.alert}>
            <Alert.Heading>No enough data!</Alert.Heading>
            <p>You have to fill all the fields!</p>
          </Alert>
        )}

        {status === 'loginError' && (
          <Alert variant="warning" className={styles.alert}>
            <Alert.Heading>User with this login exist!</Alert.Heading>
            <p>You need to use different login!</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation="border" role="status" className="d-block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label className={styles.formLabel}>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Please type your name..."
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className={styles.formLabel}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChangePassword}
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

        <Form.Group className="mb-3" controlId="formPasswordRepeat">
          <Form.Label className={styles.formLabel}>Repeat Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showRepeatPassword ? 'text' : 'password'}
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleChange}
              placeholder="Please re-type your password..."
              isInvalid={errors.passwordRepeat || errors.passwordMismatch}
            />
            <InputGroup.Text
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? (
                <RxEyeOpen className={styles.eye} />
              ) : (
                <RxEyeClosed className={styles.eye} />
              )}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.passwordRepeat || errors.passwordMismatch}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label className={styles.formLabel}>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Please type your address..."
            isInvalid={errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" className={styles.buttonSubmit}>
          Sign up
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
