import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// window.confirm = jest.fn(() => true);


describe('Testing components and behavior of App', () => {
  
  it('Should display the initial list of items', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // see if Avocado displays
    screen.getByText(/avocado/i);

    // see if Bread displays
    screen.getByText(/bread/i);

    // see if Mustard displays
    screen.getByText(/mustard/i);
  });


  it('Should add to the list', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // grab input box
    const input = screen.getByRole('textbox');
    
    // type in new item
    userEvent.type(input, 'Lunchmeat');

    // grab submit button
    const button = screen.getByRole('button', {
      name: /add item/i
    });

    // click submit
    userEvent.click(button);

    // see if new item show up on list
    screen.getByText(/lunchmeat/i);
  });


  it('Should edit a list item', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // grab the edit button for mustard
    const editMustardButton = screen.getByRole('button', {
      name: /mustard\-edit/i
    });

    //click the edit button
    userEvent.click(editMustardButton);

    // grab the edit text input
    const input = screen.getByPlaceholderText(/edit item/i);

    // add text to input
    userEvent.type(input, 'Mayo');

    // grab the save button
    const saveButton = screen.getByRole('button', {
      name: /mustard\-save/i
    });

    // click save button
    userEvent.click(saveButton);

    // see if Mayo shows up
    screen.getByText(/mayo/i);

  });

  it('Should delete an existing item', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // find the delete button for bread
    const deleteBreadButton = screen.getByRole('button', {
      name: /bread\-delete/i
    })

    // click the delete button
    userEvent.click(deleteBreadButton);

    // make sure bread was removed
    // use queryBy to avoid throwing an error with get/find with no match present
    expect(screen.queryByText(/bread/i)).not.toBeInTheDocument();

  });

  it('Should check that clicking checkbox gives the item a strikethrough', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // grab the checkbox for Avocado
    const checkbox = screen.getByRole('checkbox', {
      name: /avocado\-checkbox/i
    });

    // click the checkbox
    userEvent.click(checkbox);

    // see if Avocado has line-through styling
    expect(screen.getByText(/avocado/i)).toHaveStyle('text-decoration: line-through');

  });

  it('Should test that Clear Cart button in header deletes all items', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // grab the clear cart button
    const clearCartButton = screen.getByRole('button', {
      name: /clear cart/i
    });


    // IMPORTANT - when we click the clear cart button an alert/confirm window will appear
    // we need to mock the confirm to true in order to successfully delete the items
    window.confirm = jest.fn(() => true);

    // click the clear cart button
    userEvent.click(clearCartButton);
    
    // expect none of the 3 initial items to be on screen
    expect(screen.queryByText(/avocado/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bread/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/mustard/i)).not.toBeInTheDocument();

  });


});