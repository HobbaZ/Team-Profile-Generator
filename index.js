//Get all needed requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const generateHTML = require('./dist/generateHTML.js');
const employee = require('./lib/employee');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');
const manager = require('./lib/manager');

const employees = [];

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([

    //Employee name
    {
        name: 'name',
        type: 'input',
        message: 'Enter the employee\'s name',
        validate: function(name) {
            if (name) {
              return true;
            } else {
              return 'Please enter the employee\'s name';
            }
        }
    },
    
    //Employee email
    {
        name: 'email',
        type: 'input',
        message: 'Enter the employee\'s email',
        validate: function(email) {
            let test = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/); //regex from https://www.w3resource.com/javascript/form/email-validation.php
            if (test) {
              return true;
            } else {
              return 'Please enter a valid email address.';
            }
        }
    }, 

    //Employee id
    {
        name: 'id',
        type: 'number',
        message: 'Enter the employee\'s id',
        validate: function(id) {
            if (id) {
              return true;
            } else {
              return 'Please enter the employee\'s id number';
            }
        }
    }, 

    //Employee choices
    {
        name: 'employeeType',
        type: 'list',
        message: 'What is the employee type?',
        choices: ['Engineer', 'Intern', 'Manager'],
    },

    ]);
};

function setEmployeeType(answers) {
    let link = "";
    if (answers.employeeType ==="Engineer") {
        //

    } else if (answers.employeeType === "Intern") {
        //
    } else if (answers.employeeType === "Manager") {
        //
    }
    return link;
}

function init() {
    console.log(`
                ____________________TEAM PROFILE GENERATOR______________________
  
                    Follow the prompts to generate a team profile
                    
                    `)
      promptUser()
        .then((answers) => writeFileAsync('index.html', generateHTML(data)))
        .then(() => console.log(`
                                        Finished!
  
                              Successfully created team profile
        `))
        .catch((err) => console.error(err));
    };
  
    
    init();
