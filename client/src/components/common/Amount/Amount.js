import React, { useState, useEffect } from 'react';
import { Button, FormControl, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './Amount.module.scss';

const Amount = ({ title, onAmountChange }) => {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  const handleIncrease = () => {
    if (amount < 10) {
      const newAmount = amount + 1;
      setAmount(newAmount);
    }
  };

  const handleDecrease = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      setAmount(newAmount);
    }
  };

  return (
    <Card className={`p-3 my-3 ${styles.amountCard}`}>
      <Row>
        <Col xs={12} className="pb-3">
          <h4 className={styles.title}>{title}</h4>
        </Col>
        <Col xs={12} className={styles.amountContainer}>
          <Button
            onClick={handleDecrease}
            disabled={amount <= 1}
            className={styles.button}
          >
            -
          </Button>
          <FormControl type="number" value={amount} readOnly />
          <Button
            onClick={handleIncrease}
            disabled={amount >= 10}
            className={styles.button}
          >
            +
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

Amount.propTypes = {
  title: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired,
};

export default Amount;
