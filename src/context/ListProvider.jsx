import {
  createContext,
  useContext
} from 'react';
import {
  useReducer,
  useEffect
} from 'react';


// initial List state
const initialList =
  // JSON.parse(localStorage.getItem('list-state')) ||
  [
  { id: 1, itemName: 'Avocado', purchased: false },
  { id: 2, itemName: 'Bread', purchased: false },
  { id: 3, itemName: 'Mustard', purchased: false },
];

// const listState = JSON.parse(localStorage.getItem('list-state'));

// reducer function
function listReducer(listState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // returns an list array with the new item and the existing items spread in
      return [
        { id: Date.now(), itemName: action.payload.itemName, purchased: false },
        ...listState
      ];
    case 'DELETE_ITEM':
      // this filters through our list and only returns items with id's that DO NOT match the item we are trying to delete - hence not including it
      return listState.filter((item) => item.id != action.payload.id);
    case 'UPDATE_ITEM':
      const newList = listState.map((item) => {
        // if the an existing item id matches the updated item id return the existing item with the updated items attributes overwritten on top
        if (item.id === action.payload.updatedItem.id) {
          return {
            ...item,
            itemName: action.payload.updatedItem.itemName,
            purchased: action.payload.updatedItem.purchased
          };
        } else {
          // otherwise just return the item
          return item;
        }

      })
      // console.log('newList', newList);
      return newList;
    case 'CLEAR_LIST':
      return [];
  }
}


// creates empty bucket for state
const ListContext = createContext();


// Set up Provider component
export function ListProvider({ children }) {

  // get the list from local storage
  const listFromStorage = JSON.parse(localStorage.getItem('list-state'));

  // console.log('listFromStorage', listFromStorage);

  // useReducer - initialize with listFromStorage if exists otherwise with initialList
  const [listState, dispatch] = useReducer(listReducer, listFromStorage || initialList);
  
  // console.log('listState', listState);
  
  // useEffect to save every state change in local storage - must come after reducer
  useEffect(() => {
    localStorage.setItem('list-state', JSON.stringify(listState));
  }, [listState]);
  


  // CRUD functions to dispatch to listReducer
  function handleAddItem(newItem) {
    dispatch({ type: 'ADD_ITEM', payload: { itemName: newItem } });
  }

  function handleDeleteItem(id) {
    dispatch({ type: 'DELETE_ITEM', payload: { id: id } });
  }

  function handleUpdateItem(updatedItem) {
    // console.log('updatedItem', updatedItem);
    dispatch({ type: 'UPDATE_ITEM', payload: { updatedItem } });
  }

  function clearList() {
    dispatch({ type: 'CLEAR_LIST' });
  }

  return (
    <ListContext.Provider
      value={{
        listState,
        handleAddItem,
        handleDeleteItem,
        handleUpdateItem,
        clearList
      }}
    >
      {children}
    </ListContext.Provider>
  );
}


// custom hook so we don't have to import ListContext and useContext into every component
export function useListContext() {
  const context = useContext(ListContext);

  // guardrail statement to return error if component trying to access context is not wrapped in provider
  if (context === undefined)
    throw new Error('useList must be called from within a ListProvider');
  
  return context;
}