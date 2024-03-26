import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './OrdersTable.module.scss';

const OrdersTable = ({ items }) => {
  return (
    <div className={styles.ordersTable}>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Date</th>
            <th>Price</th>
            <th>Address</th>
            <th>Email</th>
            <th>Client Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((order, index) => (
            <tr key={order.id}>
              <td className={styles.number}>{index + 1}</td>
              <td className={styles.date}>
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className={styles.price}>
                {parseFloat(order.priceSum).toFixed(2)} $
              </td>
              <td className={styles.address}>{order.address}</td>
              <td className={styles.email}>{order.email}</td>
              <td className={styles.clientName}>{order.clientName}</td>
              <td>
                <Link to={`/orders/${order.id}`}>
                  <Button className={styles.button}>Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

OrdersTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      priceSum: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      clientName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default OrdersTable;
