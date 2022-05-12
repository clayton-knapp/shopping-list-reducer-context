import React from 'react';
import styles from '../App.css';
import { useState } from 'react';

export default function Item({ item, handleDeleteItem, handleUpdateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItemName, setUpdatedItemName] = useState('');

  return (
    <div className={styles['item']}>
      {isEditing
        ? <>
          <form action=""
            onSubmit={(e) => {
              // spread in existing item, and overwrite with new item name
              e.preventDefault();
              handleUpdateItem({ ...item, itemName: updatedItemName });
              setIsEditing(false);
            }}
          >
            <input
              type="text"
              placeholder='Edit item'
              value={updatedItemName}
              onChange={(e) => setUpdatedItemName(e.target.value)}
            />
            <button
              name='save'
              type='submit'
            >Save</button>
          </form>  
        </>
        : <>
            <input
              type="checkbox"
              name=""
              id=""
            checked={item.purchased}
            onChange={(e) => handleUpdateItem({ ...item, purchased: e.target.checked})}
            
            />
            <p
              style={{ textDecoration: item.purchased ? 'line-through' : null }}
            >{item.itemName}</p>
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
