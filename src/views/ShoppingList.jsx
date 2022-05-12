import React from 'react';
import styles from '../App.css';
import { useState, useReducer } from 'react';
import Item from '../components/Item';

// initial List state
const initialList = [
  { id: 1, item: 'Avocado', purchased: false },
  { id: 2, item: 'Bread', purchased: false },
  { id: 3, item: 'Mustard', purchased: false },
];

function listReducer(listState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        { id: Date.now(), item: action.payload.item, purchased: false },
        ...listState
      ];
    case 'DELETE_ITEM':
      // this filters through our list and only returns items with id's that DO NOT match the item we are trying to delete - hence not including it
      return listState.filter((item) => item.id != action.payload.id);
  }

}


export default function ShoppingList() {

  // still track state of user input
  const [newItem, setNewItem] = useState('');

  // useReducer
  const [listState, dispatch] = useReducer(listReducer, initialList);


  function handleAddItem(e) {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: { item: newItem } });
    setNewItem('');
  }

  function handleDeleteItem(id) {
    dispatch({ type: 'DELETE_ITEM', payload: { id: id } });
  }

  return (
    <div className={styles['list-page']}>
      <form action=""
        onSubmit={handleAddItem}
      >
        <input
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
              />
            </li>
          )
        }
      </ul>

    </div>
  )
}
