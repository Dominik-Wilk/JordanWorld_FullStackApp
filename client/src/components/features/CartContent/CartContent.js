import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Spinner, Button, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {
  getCartProducts,
  loadCartProductsRequest,
} from '../../../redux/cartRedux';
import CartTable from '../CartTable/CartTable';
import styles from './CartContent.module.scss';

const CartContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState(null);
  const reduxCartProducts = useSelector(getCartProducts);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (reduxCartProducts) {
      setCartProducts(reduxCartProducts);
    }
  }, [reduxCartProducts]);

  useEffect(() => {
    dispatch(loadCartProductsRequest());
  }, [dispatch]);

  if (!cartProducts) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {cartProducts.cartItems.length === 0 ? (
        <p className="text-center">
          Your cart is empty, feel free to add something to order or save for
          later.
        </p>
      ) : (
        <>
          <div className={styles.proceed}>
            <CartTable items={cartProducts.cartItems} />
            <Row>
              <Col xs={12} md={10} lg={8} xl={6} className="mx-auto">
                <Button
                  onClick={handleShow}
                  className={`my-3 p-3 ${styles.button}`}
                >
                  Proceed Order
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>Are you sure you want to confirm your order?</p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            className={styles.buttonComeback}
            onClick={() => {
              handleClose();
              navigate('/');
            }}
          >
            Come back to see all products
          </Button>
          <Button
            className={styles.buttonConfirm}
            onClick={() => {
              handleClose();
              navigate('/proceed-order');
              window.location.reload();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartContent;
