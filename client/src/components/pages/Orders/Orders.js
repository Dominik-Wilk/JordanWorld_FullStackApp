import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import OrdersContent from '../../features/OrdersContent/OrdersContent';
import { getUser, isUserLoading } from '../../../redux/usersRedux';
import styles from './Orders.module.scss';

const Orders = () => {
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
    <div className={`rounded ${styles.orders}`}>
      <h2 className="mb-3 text-center">Orders</h2>
      <OrdersContent />
    </div>
  );
};

export default Orders;
