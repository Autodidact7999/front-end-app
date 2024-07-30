// src/App.js
import React, { useState } from 'react';

const App = () => {
  const [customers] = useState([
    { id: 1, name: 'Jack Jackson', email: 'jackj@abc.com', password: 'jackj' },
    { id: 2, name: 'Katie Kates', email: 'katiek@abc.com', password: 'katiek' },
    { id: 3, name: 'Glen Glenns', email: 'gleng@abc.com', password: 'gleng' }
  ]);

  const handleButtonClick = (action) => {
    console.log(`in on${action}Click()`);
  };

  const handleCustomerClick = (customer) => {
    console.log('in handleListClick()');
  };

  return (
    <div style={{ border: '1px solid black', padding: '20px', width: '300px', margin: 'auto' }}>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} onClick={() => handleCustomerClick(customer)}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Update</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" defaultValue="Jack Jackson" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" defaultValue="jackj@abc.com" />
        </div>
        <div>
          <label>Pass:</label>
          <input type="password" name="password" defaultValue="jackj" />
        </div>
        <div>
          <button type="button" onClick={() => handleButtonClick('Delete')}>Delete</button>
          <button type="button" onClick={() => handleButtonClick('Save')}>Save</button>
          <button type="button" onClick={() => handleButtonClick('Cancel')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default App;
