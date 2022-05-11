import React from 'react';
import styles from '../App.css';

export default function Header() {
  return (
    <header className={styles['header']}>
      <h2>My Shopping List</h2>
      <h3>Total Items: </h3>
      <button
      
      >Clear Cart</button>
    </header>
  )
}
