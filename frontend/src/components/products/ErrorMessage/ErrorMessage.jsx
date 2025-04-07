import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <div className={styles.errorContainer}>
    <span className={styles.errorIcon}>⚠️</span>
    <p className={styles.errorText}>{message}</p>
  </div>
);

export default ErrorMessage;