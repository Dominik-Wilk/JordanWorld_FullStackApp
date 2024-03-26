import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import OrderOverview from '../../features/OrderOverview/OrderOverview';
import { getUser, isUserLoading } from '../../../redux/usersRedux';

const OrderDetails = () => {
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const loading = useSelector(isUserLoading);

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
    <div>
      <h4 className="mb-3 text-left">Order Details</h4>
      <OrderOverview />
    </div>
  );
};

export default OrderDetails;
