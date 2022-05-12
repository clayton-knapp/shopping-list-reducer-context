import React from 'react';
import styles from '../App.css';
import { useState } from 'react';

export default function Item({ item, handleDeleteItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState('');

  return (
    <div className={styles['item']}>
      {isEditing
        ? <>
          <form action="">
            <input
              type="text"
              placeholder='Edit item'
              value={updatedItem}
              onChange={(e) => setUpdatedItem(e.target.value)}
            />
            <button
              onSubmit={() => {
                setIsEditing(false);
              }}
            >Save</button>
          </form>  
        </>
        : <>
            <p>{item.item}</p>
            <button
              name='edit'
              onClick={() => {
                setIsEditing(true);
                }}
            >Edit</button>
          </>
      }
    
      <button
        name='delete'
        onClick={() => handleDeleteItem(item.id)}
      >Delete</button>
    </div>
  )
}
