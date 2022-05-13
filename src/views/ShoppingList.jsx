import React from 'react';
import styles from '../App.css';
import { useState, useReducer } from 'react';
import Item from '../components/Item';
import { useListContext } from '../context/ListProvider';

export default function ShoppingList() {
  
  // use context
  const { listState, handleAddItem, handleDeleteItem, handleUpdateItem } = useListContext();

  // still track state of user input
  const [newItem, setNewItem] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    handleAddItem(newItem);
    setNewItem('');
  }

  return (
    <div className={styles['list-page']}>
      <form action=""
        onSubmit={handleSubmit}
      >
        <input
          required
          type="text"
          placeholder='New item'
          name='newItem'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button>Add Item</button>
      </form>
      <ul>
        {
          listState.map((item) => 
            <li key={item.id}>
              <Item
                item={item}
                handleDeleteItem={handleDeleteItem}
                handleUpdateItem={handleUpdateItem}
              />
            </li>
          )
        }
      </ul>

    </div>
  )
}
