const intern = require('./lib/intern');

describe("intern", () => {
    describe("testSchool", () => {
        it("Should create a school input in constructor", () => { //constructor uses name, id, email params
            const school = "example School";
            const internSchool = new intern.testSchool(school);
            expect(internSchool).toEqual(school);
        })
    })

    describe("testRole", () => {
        it("Should create a manager role in constructor", () => {
            const role = "Intern";
            const internRole = new intern.testRole(role);
            expect(internRole).toEqual(role);
        })
    })
})