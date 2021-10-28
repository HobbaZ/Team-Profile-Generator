const manager = require('./lib/manager');

describe("manager", () => {
    describe("testOfficeNumber", () => {
        it("Should create a office number in constructor", () => {
            const officeNumber = "HobbaZ";
            const managerOfficeNumber = new manager.testOfficeNumber(officeNumber);
            expect(managerOfficeNumber).toEqual(officeNumber);
        })
    })

    describe("testRole", () => {
        it("Should create a manager role in constructor", () => {
            const role = "Manager";
            const managerRole = new manager.testRole(role);
            expect(managerRole).toEqual(role);
        })
    })
})