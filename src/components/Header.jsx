import React from 'react';
import styles from '../App.css';
import { useListContext } from '../context/ListProvider';

export default function Header() {
  const { listState, clearList } = useListContext();

  // STRETCH we want to find the number of un-purchased items (unchecked)
  const unpurchasedList = listState.filter((item) => item.purchased === false);
  // console.log('unpurchasedList', unpurchasedList);

  return (
    <header className={styles['header']}>
      <h2>My Shopping List</h2>
      <div>
        <h4>Items in Cart: {listState.length}</h4>
        <h4>Left to Purchase: {unpurchasedList.length}</h4>
      </div>
      <button
        onClick={() => {
          window.confirm('Are you sure you wish to clear your cart?') ? clearList() : null
        }}
      >Clear Cart</button>
    </header>
  )
}
