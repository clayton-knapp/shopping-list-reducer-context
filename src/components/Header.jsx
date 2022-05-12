import React from 'react';
import styles from '../App.css';
import { useListContext } from '../context/ListProvider';

export default function Header() {
  const { listState } = useListContext();


  return (
    <header className={styles['header']}>
      <h2>My Shopping List</h2>
      <h3>Total Items: {listState.length}</h3>
      <button
      
      >Clear Cart</button>
    </header>
  )
}
