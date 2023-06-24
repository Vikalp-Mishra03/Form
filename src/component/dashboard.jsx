import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Header from './header';
import List from './list';
import Add from './add';
import Edit from './edit';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

 
  useEffect(() => {
    // Retrieve employee data from local storage
    const storedEmployees = localStorage.getItem('employees');
    
    if (storedEmployees) {
      // Parse the stored data from JSON to an array
      const parsedEmployees = JSON.parse(storedEmployees);
      setEmployees(parsedEmployees);
    } else {
      // Use default employee data if no data is found in local storage
      setEmployees(employees);
    }
  }, []);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    swal({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      buttons: {
        cancel: 'No, cancel!',
        confirm: 'Yes, delete it!',
      },
    }).then((result) => {
      if (result) {
        const updatedEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
  
        const deletedEmployee = employees.find((employee) => employee.id === id);
        swal({
          icon: 'success',
          title: 'Deleted!',
          text: `${deletedEmployee.firstName} ${deletedEmployee.lastName}'s data has been deleted.`,
          button: false,
          timer: 1500,
        });
  
        // Save the updated employees list to local storage
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      }
    });
  };
  

  return (
    <div className="container">
      {/* List */}
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
      )}
      {/* Add */}
      {isAdding && (
        <Add employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding} />
      )}
      {/* Edit */}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Dashboard;
