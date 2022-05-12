import React from 'react';
import styles from '../App.css';

export default function Item({ item }) {
  return (
    <div className={styles['item']}>
      <p>{item.item}</p>
      <button
        name='edit'
      >Edit</button>
      <button
        name='delete'
      >Delete</button>
    </div>
  )
}
