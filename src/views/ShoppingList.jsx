import React from 'react';
import styles from '../App.css';
import { useState, useReducer } from 'react';

// initial List state
const initialList = [
  { id: 1, item: 'Avocado', purchased: false },
  { id: 2, item: 'Bread', purchased: false },
  { id: 3, item: 'Mustard', purchased: false },
];

function listReducer(state, action) {

}


export default function ShoppingList() {

  // still track state of user input
  const [newItem, setNewItem] = useState('');

  // useReducer
  const [state, dispatch] = useReducer(listReducer, initialList);


  function handleSubmitItem(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form action=""
        onSubmit={handleSubmitItem}
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

    </div>
  )
}
