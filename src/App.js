import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import { getAll, post, put, deleteById } from './memdb';

const App = () => {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);

  useEffect(() => {
    const customers = getAll();
    setCustomers(customers);
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(selectedCustomer.id === customer.id ? blankCustomer : customer);
  };

  const handleInputChange = (name, value) => {
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const handleSave = () => {
    if (selectedCustomer.id === -1) {
      post(selectedCustomer);
      const customers = getAll();
      setCustomers(customers);
      setSelectedCustomer(blankCustomer);
    } else {
      put(selectedCustomer.id, selectedCustomer);
      const customers = getAll();
      setCustomers(customers);
      setSelectedCustomer(blankCustomer);
    }
  };

  const handleDelete = () => {
    if (selectedCustomer.id !== -1) {
      deleteById(selectedCustomer.id);
      const customers = getAll();
      setCustomers(customers);
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
