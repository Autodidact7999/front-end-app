// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Mike Johnsons', email: 'mikej@abc.com', password: 'mikej' },
    { id: 2, name: 'Cindy Smiths', email: 'cinds@abc.com', password: 'cinds' },
    { id: 3, name: 'Julio Martins', email: 'julim@abc.com', password: 'julim' }
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);

  const handleButtonClick = (action) => {
    console.log(`in on${action}Click()`);
    if (action === 'Delete') {
      if (selectedCustomer.id !== -1) {
        setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
        setSelectedCustomer(blankCustomer);
      }
    } else if (action === 'Save') {
      if (selectedCustomer.id === -1) {
        const newCustomer = { ...selectedCustomer, id: customers.length + 1 };
        setCustomers([...customers, newCustomer]);
      } else {
        setCustomers(customers.map(customer => (customer.id === selectedCustomer.id ? selectedCustomer : customer)));
      }
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
