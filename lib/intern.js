const Employee = require('./lib/employee');

base = require('./lib/employee')

class Intern extends Employee {
    constructor(name, id, email, school)
    super(name, id, email) {
    this.school = this.school;
    }

    getSchool() {
        return school;
    }

    getRole() {
        return "Intern";
    }
    }