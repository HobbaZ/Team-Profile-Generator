//Get all needed requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

//const generateHTML = require('./dist/generateHTML.js');
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const { Console } = require('console');

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
        message: (answers) => `${answers.name} is the team manager, please enter their office Number`,
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
    //send to generateHTML
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

function createTeamData(answers) {
    if (answers.employeeType === 'Engineer') {
    const engineer = new Engineer(answers.name, answers.id,answers.email, answers.github);
    console.log(engineer);
    }
    else if (answers.employeeType === 'Intern')  {
    const intern = new Intern(answers.name, answers.id,answers.email, answers.school);
    console.log(intern);
    }
    else if (answers.employeeType === 'Manager')  {
    const manager = new Manager(answers.name, answers.id,answers.email, answers.officeNumber);
    console.log(manager);
    }
    setTeam()
};


//const engineer = new Engineer(answers.name, answers.id,answers.email, getGithub(answers.github));
//console.log(engineer.github);

/*function setEmployeeType(answers) { 
    if (answers.employeeType === "Engineer") {
    const engineer = new Engineer(answers.name, answers.id,answers.email, getGithub(answers.github)); 
    console.log(engineer)  
    return engineer;  

    } else if (answers.employeeType === "Intern") {
        const intern = new Intern(answers.name, answers.id,answers.email, getSchool(answers.school));   
        return intern;  
    
    } else if (answers.employeeType === "Manager") {
        const manager = new Manager(answers.name, answers.id,answers.email, getOfficeNumber(answers.officeNumb));   
        return manager;
    }
}*/

/*const getSchool = () => {
    return inquirer.prompt([
//Github
{
    name: 'school',
    type: 'input',
    message: 'Enter the interns\'s school',
    validate: function(school) {
        if (school) {
            return true;
        } else {
            return 'Please enter the employee\'s github username';
        }
    }
},
]);
}

const generateHTML = (answers) =>
`
`;
*/

const init = () => {
    console.log(`
                ____________________TEAM PROFILE GENERATOR______________________
  
                    Follow the prompts to generate a team profile
                    
                    `)
      initManager()
        //.then((answers) => writeFileAsync('index.html', generateHTML(answers)))
        /*.then(() => console.log(`
                                        Finished!
  
                              Successfully created team profile
        `))
        .catch((err) => console.error(err));*/
    };
  
    
    init();
