import LoginForm from '../../features/LoginForm/LoginForm';
import { Row, Col } from 'react-bootstrap';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <Row>
      <Col>
        <h2 className={styles.title}>Login</h2>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Login;
