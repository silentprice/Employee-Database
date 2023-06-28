const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db'
  },
);

db.connect((err) => {
  if (err) throw err
  console.log('connected to database')
  displayMainMenu()
})

// Function to display the main menu and handle user input
function displayMainMenu() {
    inquirer
      .prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      })
      .then((answer) => {
        switch (answer.choice) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            connection.end();
            break;
        }
      });
  }

  function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
      if (err) throw err
      console.table(data)
      displayMainMenu()
    })
  }

  function viewAllRoles() {
    db.query('SELECT * FROM role', (err, data) => {
      if (err) throw err
      console.table(data)
      displayMainMenu()
    })
  }

  function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, data) => {
      if (err) throw err
      console.table(data)
      displayMainMenu()
    })
  }

  function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new department you want to add?'
      }
    ]).then(answer => {
      db.query('INSERT INTO department SET ?', {
        name: answer.deptName
      })
      console.log('Expanding the company!')
      viewAllDepartments()
      displayMainMenu()
    })
  }
  function addRole() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'positionName',
        message: 'What is the name role you like to add?'
      }
    ]).then(answer => {
      db.query('INSERT INTO role SET ?', {
        name: answer.deptName
      })
      console.log('Expanding the company!')
      viewAllRoles()
      displayMainMenu()
    })
  }
  function addEmployee() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'employeeName',
        message: 'What is the name of the new employee hired?'
      }
    ]).then(answer => {
      db.query('INSERT INTO employee SET ?', {
        name: answer.deptName
      })
      console.log('Expanding the company!')
      viewAllEmployees()
      displayMainMenu()
    })
  }
  function updateEmployeeRole() {
    // Prompt for employee ID and new role ID
    inquirer.prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee you want to update:'
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the new role ID for the employee:'
      }
    ]).then(answers => {
      // Update the employee role in the database
      db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], (err, result) => {
        if (err) throw err;
        console.log('Employee role updated successfully!');
        viewAllEmployees();
        displayMainMenu();
      });
    });
  }
  

  module.exports = displayMainMenu