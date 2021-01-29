var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Shalyn112!",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "Test",
        type: "list",
        message: "Hello User, What would you like to do?",
        choices: ["Add Department", "Add role", "Add employee", "View Departments", "View roles", "View employees", "Update roles"]
      })
      
  }



  function addDepartment(){
    inquirer
    .prompt({
      name: "depoName",
      type: "input",
      message: "What is the name of the Department?",
      
    })
    .then(function(answer){
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.depoName
        },
        function(err) {
          if (err) throw err;
          console.log("Updated Department");
          start();
        }
      )
    })
  }
  function addRoles(){
    inquirer
    .prompt({
      name: "roleName",
      type: "input",
      message: "What is the name of the role?",
      
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this position?"
    },
    {
      name: "depo_id",
      type: "input",
      message: "What department is this job in?"
    },

    )
    .then(function(answer){
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.roleName,
          salary: answer.salary,
          department_id: answer.depo_id

        },
        function(err) {
          if (err) throw err;
          console.log("Updated roles");
          start();
        }
      )
    })
  }
  function addEmployee(){
    inquirer
    .prompt({
      name: "FirstName",
      type: "input",
      message: "What is the First name of the Employee?",
      
    },
    {
      name: "LastName",
      type: "input",
      message: "What is the Last name of the Employee?"
    },
    {
      name: "role_id",
      type: "list",
      message: "What role does this employee have?"
    },

    )
    .then(function(answer){
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.roleName,
          salary: answer.salary,
          department_id: answer.depo_id

        },
        function(err) {
          if (err) throw err;
          console.log("Updated roles");
          start();
        }
      )
    })
  }