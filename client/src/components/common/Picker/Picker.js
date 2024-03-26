import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './Picker.module.scss';

const Picker = ({ title, items = [], onValueChange, defaultValue }) => {
  const [selectedItem, setSelectedItem] = useState(
    defaultValue || (items.length > 0 ? items[0] : ''),
  );

  useEffect(() => {
    if (items.length > 0) {
      onValueChange(selectedItem);
    }
  }, [items, onValueChange, selectedItem]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedItem(newValue);
    onValueChange(newValue);
  };

  return (
    <Card className="p-3 mt-3">
      <h4 className={`pb-3 ${styles.title}`}>{title}</h4>
      <Form>
        <Row>
          {items.map((item, index) => (
            <Col key={index} className={styles.pickContainer}>
              <Form.Label
                className={`${styles.formLabel} ${
                  item === selectedItem ? styles.active : ''
                }`}
              >
                {item}
              </Form.Label>
              <Form.Check
                type="checkbox"
                name={`${title}-group`}
                value={item}
                checked={item === selectedItem}
                onChange={handleChange}
                className={styles.formCheck}
              />
            </Col>
          ))}
        </Row>
      </Form>
    </Card>
  );
};

Picker.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onValueChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default Picker;
