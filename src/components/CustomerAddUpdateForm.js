import React from 'react';

const CustomerAddUpdateForm = ({ formTitle, customer, onInputChange, onSave, onDelete, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleButtonClick = (action) => {
    if (action === 'Delete') {
      onDelete();
    } else if (action === 'Save') {
      onSave();
    } else if (action === 'Cancel') {
      onCancel();
    }
  };

  return (
    <div className="form-container">
      <h2>{formTitle}</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td><label>Name:</label></td>
              <td><input type="text" name="name" value={customer.name} onChange={handleInputChange} placeholder="Customer Name" /></td>
            </tr>
            <tr>
              <td><label>Email:</label></td>
              <td><input type="email" name="email" value={customer.email} onChange={handleInputChange} placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td><label>Pass:</label></td>
              <td><input type="password" name="password" value={customer.password} onChange={handleInputChange} placeholder="password" /></td>
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
  );
};

export default CustomerAddUpdateForm;
