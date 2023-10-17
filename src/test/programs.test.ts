import * as chai from "chai";
import axios from "axios";

const assert = chai.assert;

const host = "http://localhost:8080";

describe("API programs test", () => {

    before (async () => {
        await axios.get(host+"/empty/programs");
    });

    it("Empty db", async () => {
        const responseData = {"data":[]};

        const response = await axios.get(host+"/programs");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Add a program", async () => {
        const dataProgram1 = {
            name: "My Name",
            cover: "My Cover",
            // eslint-disable-next-line sonarjs/no-duplicate-string
            description: "My Description",
        };

        const responseData = {"message":"Data recorded successfully","id":[1]};

        const response = await axios.post(host+"/programs", dataProgram1);
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });


    it("Read first program", async () => {
        const responseData = {"data":[{"id": 1, "name": "My Name", "cover": "My Cover", "description": "My Description"}]};

        const response = await axios.get(host+"/programs/1");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Add a second program", async () => {
        const dataProgram2 = {
            name: "My Name 2",
            cover: "My Cover 2",
            description: "My Description 2",
        };

        const responseData = {"message":"Data recorded successfully","id":[2]};

        const response = await axios.post(host+"/programs", dataProgram2);
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Get all programs", async() => {
        const responseData = {"data":[{"id": 1, "name": "My Name", cover: "My Cover", "description": "My Description"}, {"id": 2, "name": "My Name 2", cover: "My Cover 2", "description": "My Description 2"}]};

        const response = await axios.get(host + "/programs");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Delete the second program", async() => {
        const responseData = {"id": "2", "message": "Program deleted"};

        const response = await axios.delete(host+ "/programs/2");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Cannot delete the second program twice", async() => {
        const responseData = {"error": 14, "message": "Program not found"};

        const response = await axios.delete(host+ "/programs/2");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Add a media to a program", async() => {
        const responseData = {"message":"Media updated"};

        const response = await axios.get(host+ "/programs/2/add/1");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Add the same media to a program twice", async() => {
        const responseData = {"error": 15, "message": "Media is still in a program"};

        const response = await axios.get(host+ "/programs/2/add/1");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });
});
