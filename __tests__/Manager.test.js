const Manager = require('../lib/manager');

describe("manager", () => {
    describe("testOfficeNumber", () => {
        it("Should create a office number in constructor", () => {
            const officeNumTest = 12;
            const manager = new Manager("Zac", 1, "exampleemail@email",officeNumTest);
            expect(manager.officeNumber).toEqual(officeNumTest);
        });
    });

    describe("testRole", () => {
        it("Should create a manager role in constructor", () => {
            const role = "Manager";
            const manager = new Manager(role);
            expect(manager.getRole()).toEqual(role);
            console.log(manager.getRole());
        });
    });
})