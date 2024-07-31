import React, { useState, useEffect } from 'react';
import './App.css';
import { getAll, post, put, deleteById } from './memdb.js';

const App = () => {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);

  useEffect(() => {
    const customers = getAll();
    setCustomers(customers);
  }, []);

  const handleButtonClick = (action) => {
    console.log(`in on${action}Click()`);
    if (action === 'Delete') {
      if (selectedCustomer.id !== -1) {
        deleteById(selectedCustomer.id);
        const customers = getAll();
        setCustomers(customers);
        setSelectedCustomer(blankCustomer);
      }
    } else if (action === 'Save') {
      if (selectedCustomer.id === -1) {
        post(selectedCustomer);
      } else {
        put(selectedCustomer.id, selectedCustomer);
      }
      const customers = getAll();
      setCustomers(customers);
      setSelectedCustomer(blankCustomer);
    } else if (action === 'Cancel') {
      setSelectedCustomer(blankCustomer);
    }
  };

  const handleCustomerClick = (customer) => {
    console.log('in handleListClick()');
    setSelectedCustomer(selectedCustomer.id === customer.id ? blankCustomer : customer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const formTitle = selectedCustomer.id === -1 ? 'Add' : 'Update';

  return (
    <div className="container">
      <div className="table-container">
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
              <tr
                key={customer.id}
                onClick={() => handleCustomerClick(customer)}
                className={selectedCustomer.id === customer.id ? 'selected' : ''}
              >
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-container">
        <h2>{formTitle}</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td><label>Name:</label></td>
                <td><input type="text" name="name" value={selectedCustomer.name} onChange={handleInputChange} placeholder="Customer Name" /></td>
              </tr>
              <tr>
                <td><label>Email:</label></td>
                <td><input type="email" name="email" value={selectedCustomer.email} onChange={handleInputChange} placeholder="name@company.com" /></td>
              </tr>
              <tr>
                <td><label>Pass:</label></td>
                <td><input type="password" name="password" value={selectedCustomer.password} onChange={handleInputChange} placeholder="password" /></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={() => handleButtonClick('Delete')}>Delete</button>
                  <button type="button" onClick={() => handleButtonClick('Save')}>Save</button>
                  <button type="button" onClick={() => handleButtonClick('Cancel')}>Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default App;
