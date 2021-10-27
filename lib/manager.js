const Employee = require('./employee');

base = require('./employee')

class Manager extends Employee {
    constructor(name, id, email, officeNumber)
    super(name, id, email) {
    this.officeNumber = this.officeNumber;
    }
    
    getRole() {
        return "Manager";
    }
    }