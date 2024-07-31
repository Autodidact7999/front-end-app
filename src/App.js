// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import { getAll, post, put, deleteById } from './restdb';

const App = () => {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);

  const getCustomers = () => {
    console.log('in getCustomers()');
    getAll(setCustomers);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(selectedCustomer.id === customer.id ? blankCustomer : customer);
  };

  const handleInputChange = (name, value) => {
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const handleSave = () => {
    if (selectedCustomer.id === -1) {
      post(selectedCustomer, getCustomers);
    } else {
      put(selectedCustomer.id, selectedCustomer, getCustomers);
    }
    setSelectedCustomer(blankCustomer);
  };

  const handleDelete = () => {
    if (selectedCustomer.id !== -1) {
      deleteById(selectedCustomer.id, getCustomers);
      setSelectedCustomer(blankCustomer);
    }
  };

  const handleCancel = () => {
    setSelectedCustomer(blankCustomer);
  };

  const formTitle = selectedCustomer.id === -1 ? 'Add' : 'Update';

  return (
    <div className="container">
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomer.id}
        onCustomerSelect={handleCustomerSelect}
      />
      <CustomerAddUpdateForm
        formTitle={formTitle}
        customer={selectedCustomer}
        onInputChange={handleInputChange}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;
