import styles from './Notification.module.css';

const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  return <div className={!isError ? styles.success : styles.error}>{message}</div>;
};

export default Notification;
