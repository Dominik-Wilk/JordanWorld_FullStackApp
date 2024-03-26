import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IMGS_URL } from '../../../config';
import styles from './ProductSummary.module.scss';

const ProductSummary = ({ id, title, photo, price }) => {
  const imageSrc = `${IMGS_URL}${photo}`;
  const selectedProduct = `/products/${id}`;

  const formattedPrice = parseFloat(price).toFixed(2);

  return (
    <div className={styles.cardContainer}>
      <Card className={`mb-4 mx-auto rounded ${styles.card}`}>
        <div className={styles.imgContainer}>
          <Card.Img src={`${imageSrc}.jpeg`} alt={title} />
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.cardText}>
            <span className={styles.priceLabel}>Price:</span>
            <span> $</span>
            <span>{formattedPrice}</span>
          </Card.Text>
          <Link to={selectedProduct}>
            <Button className={styles.buttonView}>View More</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

ProductSummary.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductSummary;
