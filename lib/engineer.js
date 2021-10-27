const Employee = require('./employee');

base = require('./employee')

class Engineer extends Employee {
    constructor(name, id, email, github)
    super(name, id, email) {
        this.github = this.github;
    }

    getSchool() {
        return github;
    }
    
    getRole() {
        return "Engineer";
    }
    }