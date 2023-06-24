import React, { useState, useRef, useEffect } from 'react'
import swal from 'sweetalert';

function Add({ employees, setEmployees, setIsAdding }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, [])
  const handleAdd = e => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      return swal({
        icon: 'error',
        title: 'Error!',
        text: 'First Name and Second Name Should not be Empty',
        button: true,
      });
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return swal({
        icon: 'error',
        title: 'Invalid Email!',
        text: 'Please enter a valid email address.',
        button: true,
      });
    }
  
    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    employees.push(newEmployee);
    setEmployees(employees);
    setIsAdding(false);
  
    swal({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      button: false,
      timer: 1500,
    });
  
    // Save the updated employees list to local storage
    localStorage.setItem('employees', JSON.stringify(employees));
  };
  

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add