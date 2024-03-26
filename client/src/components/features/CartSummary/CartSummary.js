import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Table, Spinner, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {
  loadCartProductsRequest,
  getCartProducts,
  getCartError,
} from '../../../redux/cartRedux';
import { getProducts } from '../../../redux/productsRedux';
import { loadFullUser, getFullUser } from '../../../redux/usersRedux';
import { returnImgSrc } from '../../../utils/renderImgSrc';
import { API_URL } from '../../../config';
import styles from './CartSummary.module.scss';

const CartSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(getCartProducts);
  const allProducts = useSelector(getProducts);
  const error = useSelector(getCartError);
  const userData = useSelector(getFullUser);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    address: '',
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    dispatch(loadCartProductsRequest());
    dispatch(loadFullUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      userData &&
      userData.payload &&
      userData.payload.user &&
      userData.payload.user.data
    ) {
      setFormData({
        clientName: userData.payload.user.data.name || '',
        email: userData.payload.user.data.email || '',
        address: userData.payload.user.data.address || '',
      });
    }
  }, [userData]);

  const submitOrder = async () => {
    const orderData = {
      userId: userData.payload.user.data.id,
      date: new Date().toISOString(),
      priceSum: totalSum.toString(),
      ...formData,
      cartItems: cartItems.cartItems,
    };

    try {
      const response = await fetch(`${API_URL}/orders/proceed-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Order created successfully:', responseData);
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      } else {
        console.error('Failed to create order:', responseData);
      }
    } catch (error) {
      console.error('There was an error sending the order:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cartItems) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const totalAmount = cartItems.cartItems.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  const totalSum = cartItems.cartItems.reduce((acc, item) => {
    const productDetails = allProducts.find(
      (product) => product.id === item.productId,
    );
    return acc + productDetails.price * item.amount;
  }, 0);

  return (
    <>
      <div className={styles.cartTable}>
        <div className={`rounded ${styles.tableContainer1}`}>
          <h2 className={`mb-3 ${styles.title}`}>Cart Summary</h2>
          <Table striped bordered hover className={styles.table1}>
            <thead>
              <tr className={styles.names}>
                <th>#</th>
                <th>Product Photo</th>
                <th>Product Title</th>
                <th>Amount</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price </th>
                <th>Total Price </th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.cartItems.map((item, index) => {
                const productDetails = allProducts.find(
                  (product) => product.id === item.productId,
                );
                const totalPrice = productDetails.price * item.amount;

                return (
                  <tr key={item.id}>
                    <td className={styles.number}>{index + 1}</td>
                    <td className={styles.image}>
                      <img
                        src={returnImgSrc(productDetails.photo)}
                        alt="Product"
                      />
                    </td>
                    <td className={styles.productTitle}>
                      {productDetails.title}
                    </td>
                    <td className={styles.amount}>{item.amount}</td>
                    <td className={styles.size}>{item.size}</td>
                    <td className={styles.color}>{item.color}</td>
                    <td className={styles.price}>
                      {parseFloat(productDetails.price).toFixed(2)} $
                    </td>
                    <td className={styles.totalPrice}>
                      {parseFloat(totalPrice).toFixed(2)} $
                    </td>
                    <td className={styles.comment}>{item.comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div className={`rounded ${styles.tableContainer2}`}>
          <Row>
            <Col xs={12} md={10} lg={8} xl={6} className="mx-auto">
              <div className="py-3">
                <Table bordered className={styles.table2}>
                  <thead>
                    <tr>
                      <th>Total Amount</th>
                      <th>Total Price </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{totalAmount}</td>
                      <td>{parseFloat(totalSum).toFixed(2)} $</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className={styles.cart}>
        <div className={`rounded ${styles.container}`}>
          <Row>
            <Col xs={12} md={10} lg={8} xl={6} className="mx-auto">
              <Form className={styles.form}>
                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>
                    Client Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Add a comment to your order..."
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Button
            onClick={handleShow}
            variant="warning"
            className={`mx-auto d-block my-3 p-3 ${styles.button}`}
          >
            Send Order
          </Button>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className={styles.modalTitle}>
                Confirm Order
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <p>Are you sure you want to send your Order?</p>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
              <Button
                className={styles.button1}
                onClick={() => {
                  handleClose();
                  navigate('/cart');
                }}
              >
                Back to Cart
              </Button>
              <Button
                className={styles.button2}
                onClick={() => {
                  handleClose();
                  submitOrder();
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
