import {
  createContext,
  useContext
} from 'react';

// creates empty bucket for state
const ListContext = createContext();


// Set up Provider component
export function ListProvider({ children }) {


  return (
    <ListContext.Provider
      // value= {{ listState, }}
    >
      {children}
    </ListContext.Provider>
  );
}


// custom hook
export function useListContext() {
  const context = useContext(ListContext);

  // guardrail statement to return error if component trying to access context is not wrapped in provider
  if (context === undefined)
    throw new Error('useList must be called from within a ListProvider');
  
  return context;
}