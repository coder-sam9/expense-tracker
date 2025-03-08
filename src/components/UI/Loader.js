import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className={styles.text}>Fetching data, please wait...</p>
    </div>
  );
};

export default Loader;
