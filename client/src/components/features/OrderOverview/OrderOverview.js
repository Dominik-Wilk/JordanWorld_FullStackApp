import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';

import { getOrderById, loadOrderByIdRequest } from '../../../redux/ordersRedux';
import { getProducts, loadProductsRequest } from '../../../redux/productsRedux';
import styles from './OrderOverview.module.scss';

const OrderOverview = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const data = useSelector((state) => getOrderById(state, id));
  const allProducts = useSelector((state) => getProducts(state));
  const isLoading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(loadOrderByIdRequest(id));
    dispatch(loadProductsRequest());
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {data && (
        <>
          <div className={styles.tableContainer}>
            <Table striped bordered hover className={`mb-4 ${styles.table}`}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.id}>{data.id}</td>
                  <td className={styles.date}>
                    {new Date(data.date).toLocaleString()}
                  </td>
                  <td className={styles.totalPrice}>
                    {parseFloat(data.priceSum).toFixed(2)} $
                  </td>
                  <td className={styles.comment1}>{data.comment}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="pb-3">
            <h4 className="mb-3 text-left">Product Details</h4>
            <div className={styles.tableContainer}>
              <Table striped bordered size="sm" className={styles.table}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Amount</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Product Price</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {data.orderItems.map((item) => {
                    const product = allProducts.find(
                      (p) => p.id === item.productId,
                    );

                    return (
                      <tr key={item.id}>
                        <td className={styles.productTitle}>
                          {product ? product.title : 'Product not found'}
                        </td>
                        <td className={styles.amount}>{item.amount}</td>
                        <td className={styles.color}>{item.color}</td>
                        <td className={styles.size}>{item.size}</td>
                        <td className={styles.price}>
                          {parseFloat(
                            product ? product.price : 'Product not found',
                          ).toFixed(2)}{' '}
                          $
                        </td>
                        <td className={styles.comment2}>{item.comment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderOverview;
