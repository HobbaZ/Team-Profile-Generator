const Employee = require('../lib/employee'); //needs to go back to root then to lib to find file to test

describe("employee", () => {

    describe("init", () => {
        it("Should instantiate employee instance", () => { //constructor uses name, id, email params
            const employee = new Employee();
            expect(typeof(employee)).toBe("object");
        })
    })

    describe("testName", () => {
        it("Should create an employee name in constructor", () => { //constructor uses name, id, email params
            const nameTest = "Zac";
            const employee = new Employee(nameTest);
            expect(employee.name).toEqual(nameTest);
        })
    })

    describe("testId", () => {
        it("Should create an employee id in constructor", () => { //constructor uses name, id, email params
            const idTest = 1;
            const employee = new Employee("Zac", idTest);
            expect(employee.id).toEqual(idTest);
        })
    })

    describe("testEmail", () => {
        it("Should create an employee email in constructor", () => { //constructor uses name, id, email params
            const emailTest = "exampleemail@email";
            const employee = new Employee("Zac", 1, emailTest);
            expect(employee.email).toEqual(emailTest);
        })
    })
})