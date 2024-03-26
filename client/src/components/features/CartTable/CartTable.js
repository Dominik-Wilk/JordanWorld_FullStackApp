import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { getProducts } from '../../../redux/productsRedux';
import {
  deleteCartItemRequest,
  loadCartProductsRequest,
  updateCartItemRequest,
} from '../../../redux/cartRedux';
import { returnImgSrc } from '../../../utils/renderImgSrc';
import styles from './CartTable.module.scss';

const CartTable = ({ items }) => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => getProducts(state));
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editedItems, setEditedItems] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDelete = (item) => {
    const productDetails = allProducts.find(
      (product) => product.id === item.productId,
    );
    setItemToDelete({ item, productDetails });
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete && itemToDelete.item) {
      dispatch(deleteCartItemRequest(itemToDelete.item.id))
        .then(() => {
          dispatch(loadCartProductsRequest());
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleEditChange = (itemId, field, value) => {
    let processedValue = field === 'amount' ? parseInt(value, 10) : value;

    if (field === 'amount') {
      processedValue = Math.min(Math.max(processedValue, 1), 10);
    }

    setEditedItems((prevState) => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        [field]: processedValue,
      },
    }));
  };

  const updateChanges = (itemId) => {
    const itemData = editedItems[itemId];
    if (itemData) {
      dispatch(updateCartItemRequest(itemId, itemData))
        .then(() => {
          setShowConfirmationModal(true);
        })
        .catch((error) => {
          console.error('Error updating item:', error);
        });
    }
  };

  useEffect(() => {
    const initialEditedItems = items.reduce((ascc, item) => {
      ascc[item.id] = {
        amount: item.amount,
        size: item.size,
        color: item.color,
        comment: item.comment,
      };
      return ascc;
    }, {});
    setEditedItems(initialEditedItems);
  }, [items]);

  const totalAmount = items.reduce((ascc, item) => {
    const currentEditableItem = editedItems[item.id] || {};
    return ascc + currentEditableItem.amount;
  }, 0);

  const totalSum = items.reduce((ascc, item) => {
    const productDetails = allProducts.find(
      (product) => product.id === item.productId,
    );
    const currentEditableItem = editedItems[item.id] || {};
    return ascc + productDetails.price * currentEditableItem.amount;
  }, 0);

  return (
    <div className={styles.cartTable}>
      <div className={styles.tableContainer}>
        <Table striped bordered hover className={styles.tableProducts}>
          <thead>
            <tr className={styles.namesColumn}>
              <th></th>
              <th>Photo</th>
              <th>Model</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price </th>
              <th>Total Price </th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {items.map((item, index) => {
              const productDetails = allProducts.find(
                (product) => product.id === item.productId,
              );
              const currentEditableItem = editedItems[item.id] || {};
              const totalPrice =
                productDetails.price * currentEditableItem.amount;

              return (
                <tr key={item.id}>
                  <td className={styles.number}>{index + 1}</td>
                  <td className={styles.image}>
                    <img src={returnImgSrc(productDetails.photo)} alt="Shoes" />
                  </td>
                  <td className={styles.title}>{productDetails.title}</td>
                  <td className={styles.amount}>
                    <Form.Control
                      className={styles.amountOptions}
                      type="number"
                      value={currentEditableItem.amount}
                      onChange={(e) =>
                        handleEditChange(item.id, 'amount', e.target.value)
                      }
                      min="1"
                      max="10"
                    />
                  </td>
                  <td className={styles.size}>
                    <Form.Select
                      className={styles.sizeOptions}
                      value={currentEditableItem.size}
                      onChange={(e) =>
                        handleEditChange(item.id, 'size', e.target.value)
                      }
                    >
                      <option value="7US">7US</option>
                      <option value="8US">8US</option>
                      <option value="9US">9US</option>
                      <option value="10US">10US</option>
                      <option value="11US">11US</option>
                      <option value="12US">12US</option>
                    </Form.Select>
                  </td>
                  <td className={styles.color}>
                    <Form.Select
                      className={styles.colorOptions}
                      value={currentEditableItem.color}
                      onChange={(e) =>
                        handleEditChange(item.id, 'color', e.target.value)
                      }
                    >
                      <option value="White">White</option>
                      <option value="Beige">Beige</option>
                      <option value="Brown">Brown</option>
                      <option value="Green">Green</option>
                      <option value="Purple">Purple</option>
                    </Form.Select>
                  </td>
                  <td className={styles.priceItem}>
                    $ {parseFloat(productDetails.price).toFixed(2)}
                  </td>
                  <td className={styles.totalPrice}>
                    $ {parseFloat(totalPrice).toFixed(2)}
                  </td>

                  <td className={styles.comment}>
                    <Form.Control
                      as="textarea"
                      value={currentEditableItem.comment}
                      onChange={(e) =>
                        handleEditChange(item.id, 'comment', e.target.value)
                      }
                    />
                  </td>
                  <td className={styles.tableButtons}>
                    <Button
                      className={styles.buttonDelete}
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                    <Button
                      className={styles.buttonUpdate}
                      onClick={() => updateChanges(item.id)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row>
        <Col xs={12} md={10} lg={8} xl={6} className="mx-auto">
          <Table bordered className={styles.tableTotal}>
            <thead>
              <tr className={styles.namesTotal}>
                <th className={styles.amountTotal}>Total Amount</th>
                <th className={styles.priceTotal}>Total Price </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalAmount}</td>
                <td>$ {parseFloat(totalSum).toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className={styles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>
            Are you sure you want to delete{' '}
            {itemToDelete && itemToDelete.productDetails
              ? itemToDelete.productDetails.title
              : ''}
            ?
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button onClick={() => setShowModal(false)} className={styles.button}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} className={styles.button1}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>Data has been successfully saved!</p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            onClick={() => {
              setShowConfirmationModal(false);
              dispatch(loadCartProductsRequest());
              window.location.reload();
            }}
            className={styles.button}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CartTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productId: PropTypes.number.isRequired,
      amount: PropTypes.number,
      size: PropTypes.string,
      color: PropTypes.string,
      comment: PropTypes.string,
    }),
  ).isRequired,
};

export default CartTable;
