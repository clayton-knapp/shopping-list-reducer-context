import React from 'react';
import styles from '../App.css';

export default function Item({ item, handleDeleteItem }) {
  return (
    <div className={styles['item']}>
      <p>{item.item}</p>
      <button
        name='edit'
      >Edit</button>
      <button
        name='delete'
        onClick={() => handleDeleteItem(item.id)}
      >Delete</button>
    </div>
  )
}
