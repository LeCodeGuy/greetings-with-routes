import assert from "assert";
import database from "../routes/database.js";
import queries from "../services/greet-service.js";

const query = queries(database);//greetedUsers(database);

describe("The basic database web app", function () {
    this.timeout(6000);

    beforeEach(async function () {
        await query.resetData();//.none("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
    });

    it("should be able to add a user ", async function () {
        await query.addUser("Devan");

        let users = await query.all();
        assert.equal(1, users.length);
    });

    it("get details of a specific user ", async function () {
        await query.addUser("Elmar");

        let userData = await query.getUserData("Elmar");
        let expectedOutput = {
            count: 1,
            id: 1,
            name: "Elmar",
        };
        assert.deepEqual(expectedOutput, userData);
    });

    it("should be able to increment the user counter ", async function () {
        await query.addUser("Steve");
        await query.updateUser("Steve");
        await query.updateUser("Steve");

        let userCount = await query.getUserData("Steve");
        assert.equal(3, userCount.count);
    });

    it("Get a list of all greeted users", async function () {
        await query.addUser("Devan");
        await query.updateUser("Devan");
        await query.addUser("John-Pierre");

        let users = await query.all();
    
        let expectedOutput = [
            {
                id:1,
                name: "Devan",
                count: 2,
            },
            {
                id:2,
                name: "John-Pierre",
                count: 1,
            },
        ];

        assert.deepEqual(expectedOutput, users);
    });

    this.afterAll(function () {
        database.$pool.end;
    });
});