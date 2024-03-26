import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import styles from './Content.module.scss';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const Content = ({ children }) => (
  <Container className={styles.container}>
    <Navigation />
    <div className={styles.content}>{children}</div>
    <Footer />
  </Container>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
