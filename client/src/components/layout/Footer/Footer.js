/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import styles from './Footer.module.scss';

const Footer = () => {
  const year = () => new Date().getFullYear();

  return (
    <footer className={`rounded`}>
      <div>
        <div className={styles.footerTitle}>
          <p>CONNECT WITH US</p>
        </div>
        <div className={`row no-gutters ${styles.icons}`}>
          <div className={`col`}>
            <div>
              <a href="#" className={styles.facebook}>
                <span className="fab fa-facebook"></span>
              </a>
            </div>
          </div>
          <div className={`col`}>
            <div>
              <a href="#" className={styles.pinterest}>
                <span className="fab fa-pinterest"></span>
              </a>
            </div>
          </div>
          <div className={`col`}>
            <div>
              <a href="#" className={styles.instagram}>
                <span className="fab fa-instagram"></span>
              </a>
            </div>
          </div>
          <div className={`col`}>
            <div>
              <a href="#" className={styles.youtube}>
                <span className="fab fa-youtube"></span>
              </a>
            </div>
          </div>
        </div>
        <div className={`col-12 ${styles.copyRight}`}>
          <div>
            <span>Copyright &copy; JordanWorld {year()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
