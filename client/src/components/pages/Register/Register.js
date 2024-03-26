import RegisterForm from '../../features/RegisterForm/RegisterForm';
import { Row, Col } from 'react-bootstrap';
import styles from './Register.module.scss';

const Register = () => {
  return (
    <Row>
      <Col>
        <h2 className={styles.title}>Register</h2>
        <RegisterForm />
      </Col>
    </Row>
  );
};

export default Register;
