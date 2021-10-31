//Get all needed requirements
const inquirer = require('inquirer');
const fs = require('fs');

const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');

const employeeTeam = [];

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
    fs.writeFileSync('example-index.html', generateHTML(employeeTeam)), (err) => console.error(err);

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

function members(employeeTeam) {
    let data= '';
    for (let index = 0; index < employeeTeam.length; index++) {

        data += `<div class="col-sm-6 col-lg-4">
        <div class="card mx-1 mb-2 mt-2">
        <div class="card-header">
                <h1 class="card-title">${employeeTeam[index].name}</h1>
                <h6 class="card-subtitle mb-2">`
                
                if (employeeTeam[index].getRole() ==='Engineer') {
                data += `<i class="fas fa-laptop-code"></i>`
                }

                if (employeeTeam[index].getRole() === 'Manager') {
                    data += `<i class="fas fa-users"></i>`
                }

                if (employeeTeam[index].getRole() === 'Intern') {
                    data += `<i class="fas fa-user-circle"></i> `
                }

                data += `   ${employeeTeam[index].getRole()}</h6>
                </div>
                <div class="card-body">

                <ul class="list-group">
                    <li class="list-group-item"><i class="fas fa-id-card-alt"></i> Employment ID: ${employeeTeam[index].id}</li>
                    <li class="list-group-item"><i class="far fa-envelope"></i> Email: <a href="mailto:${employeeTeam[index].email}">${employeeTeam[index].email}</a></li>`

                    if (employeeTeam[index].getRole() === 'Engineer') {
                    data +=`<li class="list-group-item"><i class="fab fa-github"></i> GitHub: <a href="https://github.com/${employeeTeam[index].github}" target="_blank">${employeeTeam[index].github}</a></li>`
                    }
                    if (employeeTeam[index].getRole() === 'Intern') {
                    data +=`<li class="list-group-item"><i class="fas fa-graduation-cap"></i> School: ${employeeTeam[index].school}</li>`
                    }
                    if (employeeTeam[index].getRole() === 'Manager') {
                    data +=`<li class="list-group-item"><i class="fas fa-phone-alt"></i> Office Number: ${employeeTeam[index].officeNumber}</li>`
                    }

            data += `</ul>
            </div>
            </div>
            </div>`
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
        <link rel="stylesheet" href="./dist/reset.css" />

        <!--icon kit link-->
        <script src="https://kit.fontawesome.com/4b926c6456.js" crossorigin="anonymous"></script>
    
        <!--Google Fonts Link-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet">

        <!--link css-->
        <link rel="stylesheet" type="text/css" href="./dist/style.css">
      </head>
    
    <body>

        
        <header class="jumbotron">
        <h1 class="display-3">Team Profile Generator</h1>
        </header>

        <main>
    <div class="container">
        <div class= "row">
        ${members(employeeTeam)}
        </div>
    </div>
    </main>

    <footer>Zac Hobba 2021</footer>
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
