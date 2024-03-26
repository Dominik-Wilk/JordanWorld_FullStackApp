import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <section className={`rounded ${styles.section}`}>
      <h2 className={styles.title}>
        <strong> Website Not Found </strong>
      </h2>
      <div>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </span>
        <p className={styles.errorMsg}>
          The page could not be found... <br />
          Please, make sure you have entered the correct website address...
        </p>
      </div>
    </section>
  );
};

export default NotFound;
