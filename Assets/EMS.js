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
  database: "employee_db",
});

connection.connect(function (err) {
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
      choices: [
        "Add Department",
        "Add role",
        "Add employee",
        "View Departments",
        "View roles",
        "View employees",
        "Update roles",
      ],
    })
    .then(function (answer) {
      if (answer.Test === "Add Department") {
        addDepartment();
      } else if (answer.Test === "Add role") {
        addRoles();
      } else if (answer.Test === "Add employee") {
        addEmployee();
      } else if (answer.Test === "View Departments") {
        viewDepos();
      } else if (answer.Test === "View roles") {
        viewRoles();
      } else if (answer.Test === "View employees") {
        viewEmployees();
      } else if (answer.Test === "Update roles") {
        updateRoles();
      }
      else{
        connection.end();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "depoName",
      type: "input",
      message: "What is the name of the Department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.depoName,
        },
        function (err) {
          if (err) throw err;
          console.log("Updated Department");
          start();
        }
      );
    });
}
function addRoles() {
  connection.query("SELECT * FROM department", function(err, results){
    if (err) throw err;
 
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this position?",
      },
      {
        name: "depo_id",
        type: "rawlist",
        choices: function(){
          var departmentArray = [];
          for (var i =0; i<results.length; i++){
            departmentArray.push(results[i].name)
          }
          return departmentArray;
          
        },
        message: "What department is this job in?",
      }
    ])
    .then(function (answer) {
      console.log(answer);
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.roleName,
          salary: answer.salary,
          department_id: answer.depo_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Updated roles");
          start();
        }
      );
    });
})}
function addEmployee() {
  connection.query("SELECT * FROM role", function(err, results){
  inquirer
    .prompt([
      {
        name: "FirstName",
        type: "input",
        message: "What is the First name of the Employee?",
      },
      {
        name: "LastName",
        type: "input",
        message: "What is the Last name of the Employee?",
      },
      {
        name: "role_id",
        type: "rawlist",
        choices: function(){
          var rolesArray = [];
          for (var i =0; i<results.length; i++){
            rolesArray.push(results[i].title)
          }
          return rolesArray;
        },
        message: "What role does this employee have?"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.FirstName,
          last_name: answer.LastName,
          role_id: answer.role_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Updated roles");
          start();
        }
      );
    });
  })
}
function viewDepos() {
  connection.query("SELECT * FROM department", function(err, results){
    if (err) throw err;
    for (var i =0; i<results.length; i++){
      console.log(results[i].name)
    }
    start();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function(err, results){
    if (err) throw err;
    for (var i =0; i<results.length; i++){
      console.log("Title: " + results[i].title + " Salary: " + results[i].salary)
    }
    start();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function(err, results){
    if (err) throw err;
    for (var i =0; i<results.length; i++){
      console.log("Title: " + results[i].first_name + " " + results[i].last_name + " Job: " + results[i].role_id)
    }
    start();
  });
}

function updateRoles(){
  connection.query("SELECT * FROM employee LEFT JOIN role", function(err, results){
    if (err) throw err;
    inquirer
    .prompt([
      {
        name: "employeeUpdate",
        type: "rawlist",
        choices: function(){
          var employeeArray = [];
          for (var i =0; i<results.length; i++){
            employeeArray.push(results[i].first_name + " " + results[i].last_name)
          }
          return employeeArray;
        },
        message: "Which Employee would you like to change roles?",
      },
      {
        name: "roleUpdate",
        type: "rawlist",
        choices: function(){
          var rolesArray = [];
          for (var i =0; i<results.length; i++){
            rolesArray.push(results[i].title)
          }
          return rolesArray;
        },
        message: "What role would you like them to have?",

      }]
    )})
     
}