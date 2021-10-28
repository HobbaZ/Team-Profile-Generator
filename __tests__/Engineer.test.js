const Engineer = require('../lib/engineer');

describe("engineer", () => {
    describe("github", () => {
        it("Should create a github input in constructor", () => { //constructor uses name, id, email params
            const githubTest = "HobbaZ";
            const engineer = new Engineer("Zac", 1, "exampleemail@email", githubTest);
            expect(engineer.github).toEqual(githubTest);
        })
    })

    describe("getRole()", () => {
        it("Should create a engineer role in constructor", () => {
            const role = "Engineer";
            const engineer = new Engineer("Zac", 1, "exampleemail@email", "HobbaZ");
            expect(engineer.getRole()).toEqual(role);
            console.log(engineer.getRole());
        })
    })
})