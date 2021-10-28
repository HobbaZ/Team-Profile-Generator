const engineer = require('./lib/engineer');

describe("engineer", () => {
    describe("testGithub", () => {
        it("Should create a github input in constructor", () => { //constructor uses name, id, email params
            const github = "HobbaZ";
            const engineerGithub = new engineer.testGithub(github);
            expect(engineerGithub).toEqual(github);
        })
    })

    describe("testRole", () => {
        it("Should create a engineer role in constructor", () => {
            const role = "Engineer";
            const engineerRole = new engineer.testRole(role);
            expect(engineerRole).toEqual(role);
        })
    })
})