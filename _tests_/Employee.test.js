const employee = require('./lib/employee');

describe("employee", () => {
    describe("testName", () => {
        it("Should create an employee name in constructor", () => { //constructor uses name, id, email params
            const name = "Zac";
            const employeeName = new employee.testName(name);
            expect(employeeName).toEqual(name);
        })
    })

    describe("testId", () => {
        it("Should create an employee id in constructor", () => { //constructor uses name, id, email params
            const id = "32";
            const employeeId = new employee.testId(id);
            expect(employeeId).toEqual(id);
        })
    })

    describe("testEmail", () => {
        it("Should create an employee email in constructor", () => { //constructor uses name, id, email params
            const email = "zachobba@gmail.com";
            const employeeEmail = new employee(email);
            expect(employeeEmail).toEqual(email );
        })
    })
})