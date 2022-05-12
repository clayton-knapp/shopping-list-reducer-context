import React from 'react';
import styles from '../App.css';
import { useState, useReducer } from 'react';
import Item from '../components/Item';

// // initial List state
// const initialList = [
//   { id: 1, itemName: 'Avocado', purchased: false },
//   { id: 2, itemName: 'Bread', purchased: false },
//   { id: 3, itemName: 'Mustard', purchased: false },
// ];

// function listReducer(listState, action) {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       // returns an list array with the new item and the existing items spread in
//       return [
//         { id: Date.now(), itemName: action.payload.itemName, purchased: false },
//         ...listState
//       ];
//     case 'DELETE_ITEM':
//       // this filters through our list and only returns items with id's that DO NOT match the item we are trying to delete - hence not including it
//       return listState.filter((item) => item.id != action.payload.id);
//     case 'UPDATE_ITEM':
//       const newList = listState.map((item) => {
//         // if the an existing item id matches the updated item id return the existing item with the updated items attributes overwritten on top
//         if (item.id === action.payload.updatedItem.id) {
//           return {
//             ...item,
//             itemName: action.payload.updatedItem.itemName,
//             purchased: action.payload.updatedItem.purchased
//           };
//         } else {
//           // otherwise just return the item
//           return item;
//         }

//       })
//       // console.log('newList', newList);
//       return newList;
//   }
// }



export default function ShoppingList() {
  
  // still track state of user input
  const [newItem, setNewItem] = useState('');
  
  // // useReducer
  // const [listState, dispatch] = useReducer(listReducer, initialList);
  
  // console.log('listState', listState);

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch({ type: 'ADD_ITEM', payload: { itemName: newItem } });
    setNewItem('');
  }

  // function handleDeleteItem(id) {
  //   dispatch({ type: 'DELETE_ITEM', payload: { id: id } });
  // }

  // function handleUpdateItem(updatedItem) {
  //   console.log('updatedItem', updatedItem);
  //   dispatch({ type: 'UPDATE_ITEM', payload: { updatedItem } });
  // }

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
