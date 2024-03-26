import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUser } from '../../../redux/usersRedux';
import styles from './Navigation.module.scss';
import { useState } from 'react';

const Navigation = () => {
  const user = useSelector(getUser);
  const [expanded, setExpanded] = useState(false);
  const toggleNav = () => setExpanded(!expanded);
  return (
    <>
      <Navbar
        expand="lg"
        className={`rounded px-3 px-lg-2 mb-4 ${styles.navBar}`}
        expanded={expanded}
        onToggle={toggleNav}
      >
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <img
            src="/images/JordanWorld.png"
            alt="logo"
            className={styles.navLogo}
          ></img>
        </Navbar.Brand>
        <div className={styles.navCont}>
          <Navbar.Brand
            as={Link}
            to="/"
            className={styles.navBrand}
            onClick={() => setExpanded(false)}
          >
            Home
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to={user ? '/cart' : '/login'}
            className={styles.navBrand}
            onClick={() => setExpanded(false)}
          >
            Cart
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end pt-2 pt-lg-3"
        >
          <Nav className={styles.nav}>
            {user && (
              <div className={`mb-4 mb-lg-3 ${styles.loggedInfo}`}>
                <span>User:</span>
                {user.login}
              </div>
            )}
            {user && (
              <Nav.Link
                as={Link}
                to="/orders"
                className={`mb-lg-3 mr-lg-2 ${styles.navLink}`}
                onClick={() => setExpanded(false)}
              >
                Orders
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link
                as={Link}
                to="/login"
                className={`mb-lg-3 mr-lg-2 ${styles.navLink}`}
                onClick={() => setExpanded(false)}
              >
                Sign In
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                as={Link}
                to="/logout"
                className={`mb-lg-3 mr-lg-2 ${styles.navLink}`}
                onClick={() => setExpanded(false)}
              >
                Sign Out
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link
                as={Link}
                to="/register"
                className={`mb-lg-3 mr-lg-2 ${styles.navLink}`}
                onClick={() => setExpanded(false)}
              >
                Sign Up
              </Nav.Link>
            )}

            <Nav.Link
              as={Link}
              to="/about"
              className={`mb-lg-3 mr-lg-2 ${styles.navLink}`}
              onClick={() => setExpanded(false)}
            >
              About us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
