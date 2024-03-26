import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import CartSummary from '../../features/CartSummary/CartSummary';
import { getUser, isUserLoading } from '../../../redux/usersRedux';

const ProceedOrder = () => {
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
    <>
      <CartSummary />
    </>
  );
};

export default ProceedOrder;
