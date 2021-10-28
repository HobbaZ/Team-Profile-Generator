const Intern = require('../lib/intern');

describe("intern", () => {
    describe("testSchool", () => {
        it("Should create a school input in constructor", () => { //constructor uses name, id, email params
            const schoolTest = "example school";
            const intern = new Intern("Zac", 1, "exampleemail@email", schoolTest);
            expect(intern.school).toEqual(schoolTest);
        })
    })

    describe("testRole", () => {
        it("Should create a manager role in constructor", () => {
            const role = "Intern";
            const intern = new Intern("Zac", 1, "exampleemail@email", "example school");
            expect(intern.getRole()).toEqual(role);
            console.log(intern.getRole());
        })
    })
})