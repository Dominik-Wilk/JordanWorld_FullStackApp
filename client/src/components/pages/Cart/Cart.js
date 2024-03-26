import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { getUser, isUserLoading } from '../../../redux/usersRedux';
import CartContent from '../../features/CartContent/CartContent';
import styles from './Cart.module.scss';

const Cart = () => {
  const user = useSelector(getUser);
  const loading = useSelector(isUserLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <h2 className={styles.title}>Cart</h2>
      <div className={`rounded ${styles.cart}`}>
        <CartContent />
      </div>
    </>
  );
};

export default Cart;
