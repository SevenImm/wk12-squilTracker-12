var inquirer = require('inquirer');
var mysql = require("mysql2");
var cTable = require("console.table")

var db = mysql.createConnection({
    user: "root",
    password: "191450",
    database: "employeeTrackerDB",
    host: "127.0.0.1",
    port: 3306
})

db.connect(function(err) {
    if(err) {
        console.log(err)
        return;
    } else {
        console.log("DB connected!")
    }
})

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    },
  ])
  .then((answers) => {
    if (answers.action === "view all departments") {
      db.query("SELECT * FROM department;", function (err, results) {
        if (err) {
          console.error("Error retrieving departments:", err);
        } else {
          console.table(results);
        }
      });
    }

    if (answers.action === "add a department") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "deptName",
            message: "What is the name of this new department?",
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO department(name) VALUES (?);",
            [answers.deptName],
            function (err, results) {
              if (err) {
                console.error("Error adding department:", err);
              } else {
                console.log("Department added successfully!");
              }
            }
          );
        });
    }

    if (answers.action === "view all roles") {
      db.query("SELECT * FROM role;", function (err, results) {
        if (err) {
          console.error("Error retrieving roles:", err);
        } else {
          console.table(results);
        }
      });
    }

    if (answers.action === "add a role") {
      inquirer
        .prompt([
          // ... (prompt for role details)
          {
            type: "input",
            name: "title",
            message: "What is the name of this title?",
          },
          {
            type: "number",
            name: "salary",
            message: "How much is their salary?",
          },
          {
            type: "number",
            name: "department_id",
            message: "What is their department ID?",
          },
        ])
        .then((roleAnswers) => {
          db.query(
            "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);",
            [roleAnswers.title, roleAnswers.salary, roleAnswers.department_id],
            function (err, results) {
              if (err) {
                console.error("Error adding role:", err);
              } else {
                console.log("Role added successfully!");
              }
            }
          );
        });
    }

    if (answers.action === "view all employees") {
      db.query("SELECT * FROM employee;", function (err, results) {
        if (err) {
          console.error("Error retrieving employees:", err);
        } else {
          console.table(results);
        }
      });
    }

    if (answers.action === "add an employee") {
      inquirer
        .prompt([
          // ... (prompt for employee details)
          {
            type: "input",
            name: "first_name",
            message: "What is the first name?",
          },          {
            type: "input",
            name: "last_name",
            message: "What is the last name?",
          },
          {
            type: "number",
            name: "role_id",
            message: "How much is their role id?",
          },
          {
            type: "number",
            name: "manager_id",
            message: "What is their manager id?",
          },

        ])
        .then((employeeAnswers) => {
          db.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
            [
              employeeAnswers.first_name,
              employeeAnswers.last_name,
              employeeAnswers.role_id,
              employeeAnswers.manager_id,
            ],
            function (err, results) {
              if (err) {
                console.error("Error adding employee:", err);
              } else {
                console.log("Employee added successfully!");
              }
            }
          );
        });
    }

    if (answers.action === "update an employee role") {
      inquirer
        .prompt([
          // ... (prompt for employee and new role details)
        ])
        .then((updateAnswers) => {
          db.query(
            "UPDATE employee SET role_id = ? WHERE id = ?;",
            [updateAnswers.new_role_id, updateAnswers.employee_id],
            function (err, results) {
              if (err) {
                console.error("Error updating employee role:", err);
              } else {
                console.log("Employee role updated successfully!");
              }
            }
          );
        });
    }
  });