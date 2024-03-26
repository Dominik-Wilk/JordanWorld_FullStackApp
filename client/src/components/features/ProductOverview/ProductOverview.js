import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Alert,
  Form,
  Modal,
} from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Amount from '../../common/Amount/Amount';
import Picker from '../../common/Picker/Picker';
import {
  getProductById,
  loadProductsRequest,
} from '../../../redux/productsRedux';
import { getUser } from '../../../redux/usersRedux';
import { returnImgSrc } from '../../../utils/renderImgSrc';
import { API_URL } from '../../../config';
import styles from './ProductOverview.module.scss';

const ProductOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const data = useSelector((state) => getProductById(state, id));
  const user = useSelector(getUser);

  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState('Brown');
  const [size, setSize] = useState('10US');
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const formatPrice = (price) => parseFloat(price).toFixed(2);

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch, id]);

  const descriptionCardRef = useRef(null);

  useEffect(() => {
    const adjustDescriptionCardHeight = () => {
      const imageCardHeight = document.querySelector(
        `.${styles.cardImg}`,
      ).clientHeight;

      if (descriptionCardRef.current) {
        descriptionCardRef.current.style.height = `${imageCardHeight}px`;
      }
    };

    const firstImage = document.querySelector(`.${styles.imageContainer0} img`);
    if (firstImage && firstImage.complete) {
      adjustDescriptionCardHeight();
    } else {
      firstImage.addEventListener('load', adjustDescriptionCardHeight);
    }

    return () => {
      if (firstImage) {
        firstImage.removeEventListener('load', adjustDescriptionCardHeight);
      }
    };
  }, []);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!amount || amount < 1 || !color || !size) {
      setValidationError(
        'Please, ensure all fields are filled and amount is at least 1.',
      );
      return;
    }

    const cartData = {
      productId: id,
      amount: amount,
      color: color,
      size: size,
      comment: comment,
    };

    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(
          'Oops! Something went wrong while adding the item to your cart. Please try again later or contact our support through our contact page.',
        );
      }

      setValidationError(null);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setValidationError(
        <>
          We apologize, but the item couldn't be added to your Cart.
          <br />
          Please try again. We sincerely apologize for any inconvenience.
        </>,
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleImageClick = (index) => {
    openLightbox(index);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const images = [
    returnImgSrc(data.photo),
    returnImgSrc(`${data.photo}.1`),
    returnImgSrc(`${data.photo}.2`),
    returnImgSrc(`${data.photo}.3`),
  ];
  return (
    <div className={styles.productOverview}>
      <Row>
        <Col>
          <h2 className={`pb-3 ${styles.title}`}>{data.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={7} lg={6}>
          <Card className={`rounded ${styles.cardImg}`}>
            <Row className={styles.rowImg1}>
              <Col onClick={() => handleImageClick(0)}>
                <div
                  className={`${styles.imageContainer} ${styles.imageContainer0}`}
                >
                  <Card.Img src={images[0]} />
                </div>
              </Col>
            </Row>
            <Row className={styles.rowImg2}>
              <Col onClick={() => handleImageClick(1)}>
                <div
                  className={`${styles.imageContainer} ${styles.imageContainer1}`}
                >
                  <Card.Img src={images[1]} />
                </div>
              </Col>
              <Col onClick={() => handleImageClick(2)}>
                <div
                  className={`${styles.imageContainer} ${styles.imageContainer2}`}
                >
                  <Card.Img src={images[2]} />
                </div>
              </Col>
              <Col onClick={() => handleImageClick(3)}>
                <div
                  className={`${styles.imageContainer} ${styles.imageContainer3}`}
                >
                  <Card.Img src={images[3]} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={12} md={5} lg={6} className={styles.descriptionCol}>
          <Row>
            <Col>
              <Card
                ref={descriptionCardRef}
                className={`rounded m-0 ${styles.cardDescription}`}
              >
                <Card.Body className={styles.bodyDescription}>
                  {data.description
                    .split('\n')
                    .map((paragraph, index, array) => (
                      <React.Fragment key={index}>
                        <p className={styles.paragraph}>{paragraph}</p>
                      </React.Fragment>
                    ))}

                  <p className={`pt-md-0 ${styles.cost}`}>
                    <span className={styles.priceLabel}>Price: </span>
                    <span className={styles.dollar}>$</span>
                    <span className={styles.price}>
                      {formatPrice(data.price)}
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Picker
            title="Size"
            items={['7US', '8US', '9US', '10US', '11US', '12US']}
            onValueChange={setSize}
            defaultValue="10US"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Picker
            title="Color"
            items={['White', 'Beige', 'Brown', 'Green', 'Purple']}
            onValueChange={setColor}
            defaultValue="Brown"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Amount
            title="Amount"
            onAmountChange={setAmount}
            defaultValue={1}
            className={styles.amount}
          />
        </Col>
      </Row>
      {user && (
        <Row>
          <Col>
            <Card className={`rounded ${styles.cardComment}`}>
              <Card.Body>
                <div>
                  <h4 className={styles.comTitle}>Comment</h4>
                  <p className={styles.comInfo}>
                    If you want to add any comment or/and special instruction to
                    your order feel free to type it here.
                  </p>
                </div>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setComment(e.target.value)}
                  className={styles.comment}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {validationError && (
        <Alert variant="danger" className={styles.alert}>
          {validationError}
        </Alert>
      )}
      <Button
        onClick={handleAddToCart}
        className={`mx-auto d-block my-5 p-2 ${styles.button}`}
      >
        Add To Cart
      </Button>
      <Modal show={showModal} onHide={closeModal} className={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>Product successfully was added to cart.</p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button onClick={closeModal} className={styles.button}>
            Stay On Page
          </Button>
          <Button onClick={goToCart} className={styles.button}>
            Go To Cart
          </Button>
        </Modal.Footer>
      </Modal>
      {lightboxOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={handleLightboxClose}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          clickOutsideToClose={true}
          enableZoom={true}
        />
      )}
    </div>
  );
};

export default ProductOverview;
