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
            "update an employee role"
        ]
    }
  ])
  .then((answers) => {


    if(answers.action == "view all departments") {
        db.query("SELECT * FROM department;", function(err, results) {
            console.table(results)
        })
    }

    if(answers.action == "add a department") {
        inquirer.prompt([
            {
                type: "input",
                name: "deptName",
                message: "What is the name of this new department?"
            }
        ])
        .then(answers => {
            db.query("INSERT INTO department(name) VALUES (?);", [answers.deptName], function(err, results) {
                console.log(results)
            })
        })
    }

  })


