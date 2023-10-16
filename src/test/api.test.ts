import * as chai from "chai";
import axios from "axios";

const assert = chai.assert;

const host = "http://localhost:8080";

describe("API test", () => {

    before (async () => {
        await axios.get(host+"/empty/medias");
    });

    it("Empty db", async () => {
        const responseData = {"data":[]};

        const response = await axios.get(host+"/medias");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Add a media", async () => {
        const dataMedia1 = {
            name: "My Name",
            duration: 10,
            file: "My File",
            // eslint-disable-next-line sonarjs/no-duplicate-string
            description: "My Description",
        };

        const responseData = {"message":"Data recorded successfully","id":[1]};

        const response = await axios.post(host+"/medias", dataMedia1);
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });


    it("Read first media", async () => {
        const responseData = {"data":[{"id": 1, "name": "My Name", "duration": 10, "file": "My File", "description": "My Description"}]};

        const response = await axios.get(host+"/medias/1");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Add a second media", async () => {
        const dataMedia2 = {
            name: "My Name 2",
            duration: 20,
            file: "My File 2",
            description: "My Description 2",
        };

        const responseData = {"message":"Data recorded successfully","id":[2]};

        const response = await axios.post(host+"/medias", dataMedia2);
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Get all medias", async() => {
        const responseData = {"data":[{"id": 1, "name": "My Name", duration: 10, file: "My File", "description": "My Description"}, {"id": 2, "name": "My Name 2", duration: 20, file: "My File 2", "description": "My Description 2"}]};

        const response = await axios.get(host + "/medias");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Delete the second media", async() => {
        const responseData = {"id": "2", "message": "Media deleted"};

        const response = await axios.delete(host+ "/medias/2");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Cannot delete the second media twice", async() => {
        const responseData = {"error": 4, "message": "Media not found"};

        const response = await axios.delete(host+ "/medias/2");
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });

    it("Update the name of the first element", async() => {
        const responseData = {"message": "Media updated"};
        const data = {
            name: "My New Name",
        };

        const response = await axios.put(host+"/medias/1", data);
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, responseData);
    });
});
