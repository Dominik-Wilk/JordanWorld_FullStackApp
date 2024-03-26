import React from 'react';
import { Row, Col } from 'react-bootstrap';

import styles from './About.module.scss';

const About = () => {
  return (
    <div className={`rounded ${styles.container}`}>
      <div className="my-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <p className={styles.title}>
              Welcome to <span>Jordan World</span> !
            </p>
            <br />
            <p>
              At <span>Jordan World</span>, we believe that the right pair of
              shoes can not only elevate your style but also enhance your
              comfort and confidence. That's why we curate an extensive
              collection of Air Jordan sneakers, ranging from iconic classics to
              the latest releases, catering to the unique preferences of our
              customers. Our footwear is not only stylish but also designed for
              various occasions, allowing you to express your individual style
              with every step. Explore our collection and find the perfect pair
              of Air Jordans that highlights your uniqueness and makes you feel
              confident.
            </p>
            <br />
            <p>
              Our commitment to quality extends beyond just the products we
              offer. We strive to create a seamless shopping experience for our
              customers, from browsing our online catalog to receiving your
              order at your doorstep.
            </p>
            <br />
            <p>
              Whether you're a sneaker enthusiast chasing the latest Air Jordan
              releases or seeking timeless classics, Jordan World has you
              covered. Our team is dedicated to staying on top of the sneaker
              trends to ensure that our customers have access to the best and
              most stylish options.
            </p>
            <br />
            <p>
              Thank you for choosing <span>Jordan World</span> as your ultimate
              online destination for Air Jordans. We look forward to serving you
              and providing you with an exceptional shopping experience, one
              step at a time.
            </p>
            <br />
            <img
              src="/images/JordanWorld.png"
              alt="Logo"
              className={styles.brand}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
