//Get all needed requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

//const generateHTML = require('./dist/generateHTML.js');
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');

const employeeTeam = [];

const writeFileAsync = util.promisify(fs.writeFile);

//Need to start prompts with manager
function initManager() {
    inquirer.prompt([
        //Employee name
    {
        name: 'name',
        type: 'input',
        message: 'Enter the team manager\'s name',
        validate: function(name) {
            if (name) {
              return true;
            } else {
              return 'Please enter the team manager\'s name';
            }
        }
    },

     //Employee email
     {
        name: 'email',
        type: 'input',
        message: (answers) => `Enter the team manager ${answers.name}\'s email address`,
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
        message: (answers) => `Enter ${answers.name}\'s id number`,
        validate: function(id) {
            if (id) {
              return true;
            } else {
              return 'Please enter the employee\'s id number';
            }
        }
    }, 

    //Manager office number
    {
        name: 'officeNumber',
        type: 'input',
        message: (answers) => `Please enter ${answers.name}\'s office number`,
    },
    ])

    .then((answers) => {
        const manager = new Manager(answers.name, answers.id ,answers.email, answers.officeNumber);
        employeeTeam.push(manager);
        teamOptions();
    });
}

//options to add intern or engineer to team or confirm tean
function teamOptions() {
    inquirer.prompt([
    //Manager office number
    {
        name: 'team',
        type: 'list',
        message: 'I would like to: ',
        choices: ['Add an Engineer', 'Add an Intern', 'Confirm my team'],
    },
    ])

    .then((answers) => {
        if(answers.team === 'Add an Engineer') {
            console.log('Engineer selected')
            teamMemberInfo(answers.team);
            return;
        } else if(answers.team === 'Add an Intern') {
            console.log('Intern selected')
            teamMemberInfo(answers.team);
            return;
        } else if(answers.team === 'Confirm my team') {
            confirmTeam();
            return;
        }
    });
};

function confirmTeam() {
    console.log (`You have ${employeeTeam.length} member/s in your team`);
    //print team members
    console.log('Your Team Consists Of: ')

    employeeTeam.forEach(member => {
        console.log(member);
    })

    console.log(`
                                        Finished!
  
                              Successfully created team profile`
    );
    fs.writeFileSync('index.html', generateHTML(employeeTeam)), (err) => console.error(err);

}

function teamMemberInfo(roleSelected) {
        inquirer.prompt([

    //Employee name
    {
        name: 'name',
        type: 'input',
        message: `Enter the ${roleSelected.replace('Add an ', '')}\'s name`,
        validate: function(name) {
            if (name) {
              return true;
            } else {
              return `Please enter the employee\'s name`;
            }
        }
    },
    
    //Employee email
    {
        name: 'email',
        type: 'input',
        message: (answers) => `Enter ${answers.name}\'s email`,
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
        message: (answers) => `Enter ${answers.name}\'s id number`,
        validate: function(id) {
            if (id) {
              return true;
            } else {
              return `Please enter ${answers.name}\'s id number`;
            }
        }
    }, 

    //Engineer github
    {
        name: 'github',
        type: 'input',
        message: (answers) => `Please enter ${answers.name}\'s Github username`,
        when: roleSelected === 'Add an Engineer',
    },

    //Intern school
    {
        name: 'school',
        type: 'input',
        message: (answers) => `Please enter the school ${answers.name} studied at`,
        when: roleSelected === 'Add an Intern',
    },

    ])
    //call teamOptions again
    .then((answers) => {
        if (roleSelected === 'Add an Intern') {
        teamMember = new Intern(answers.name, answers.id,answers.email, answers.school);
        }
        else if (roleSelected === 'Add an Engineer') {
        teamMember = new Engineer(answers.name, answers.id,answers.email, answers.github);
        }

        employeeTeam.push(teamMember)
        console.log(`${teamMember.getRole()} added`)
        teamOptions();
    });
};

function members(data) {
    for (let index = 0; index < employeeTeam.length; index++) {
        if (employeeTeam[index].getRole() === 'Engineer') {
            data = `<div class="card mr-1 mt-1">
            <div class="card-header">
                <h2 class="card-title">${employeeTeam[index].getRole()}</h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">Name: ${employeeTeam[index].name}</li>
                    <li class="list-group-item">Employment Id: ${employeeTeam[index].id}</li>
                    <li class="list-group-item text-dark">Email: <a href="mailto:${employeeTeam[index].email}">${employeeTeam[index].email}</a></li>
                    <li class="list-group-item text-dark">GitHub: <a href="https://github.com/${employeeTeam[index].github}" target="_blank">${employeeTeam[index].github}</a></li>
                </ul>
            </div>
            </div>`
        }

        if (employeeTeam[index].getRole() === 'Intern') {
            data = `<div class="card mr-1 mt-1">
            <div class="card-header">
                <h2 class="card-title">${employeeTeam[index].getRole()}</h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">Name: ${employeeTeam[index].name}</li>
                    <li class="list-group-item">Employment Id: ${employeeTeam[index].id}</li>
                    <li class="list-group-item text-dark">Email: <a href="mailto:${employeeTeam[index].email}">${employeeTeam[index].email}</a></li>
                    <li class="list-group-item text-dark">School: <${employeeTeam[index].school}</li>
                </ul>
            </div>
            </div>`
        }

        if (employeeTeam[index].getRole() === 'Manager') {
            data = `<div class="card">
            <div class="card-body">
                <h2 class="card-title">${employeeTeam[index].name}</h2>
                <h6 class="card-subtitle mb-2 text-muted">${employeeTeam[index].getRole()}</h6>
                <a href="mailto:${employeeTeam[index].email}" class="card-link">Email</a>
                <ul class="list-group">
                    <li class="list-group-item">Name: ${employeeTeam[index].name}</li>
                    <li class="list-group-item">Employment Id: ${employeeTeam[index].id}</li>
                    <li class="list-group-item text-dark">Email: <a href="mailto:${employeeTeam[index].email}">${employeeTeam[index].email}</a></li>

                </ul>
            </div>
            </div>`
        }        
    }
    return data;
}

const generateHTML = (employeeTeam) =>
    `    <!DOCTYPE html>
    <html lang="en-US">
    
      <head>
        <meta charset="UTF-8">
        <title>TEAM PROFILE GENERATOR</title>
    
        <!--bootstrap link-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
        <!--link reset css-->
        <link rel="stylesheet" href="assets/css/reset.css" />

        <!--icon kit link-->
        <script src="https://kit.fontawesome.com/4b926c6456.js" crossorigin="anonymous"></script>
    
        <!--link css-->
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
      </head>
    
    <body>
        <main>
    <div class="container-fluid">
        <div class="jumbotron jumbotron-fluid">
            <h1>Team Profile</h1>
        </div>

        <div class= "row">
        <div class="col-12" id="content">
        ${members(employeeTeam)}
        </div>
        </div>
    </div>
    </main>
    </body>
</html>`
;

const init = () => {
    console.log(`
                ____________________TEAM PROFILE GENERATOR______________________
  
                    Follow the prompts to generate a team profile
                    
                    `)
      initManager()
};
 
init();
