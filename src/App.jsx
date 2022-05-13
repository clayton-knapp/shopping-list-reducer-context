import Header from './components/Header';
import ShoppingList from './views/ShoppingList';
import './App.css';
import { ListProvider } from './context/ListProvider';

export default function App() {
  return (
    <>
      <ListProvider>
        <Header />
        <ShoppingList />
      </ListProvider>
    </>
  );
}
