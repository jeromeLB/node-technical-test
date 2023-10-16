import database from "../db";
import { APIError} from "../APIErrors";

async function getPrograms(id?: number):Promise<object> {
    const getProgramsRequest = database.table("programs");
    if (id) {
        getProgramsRequest.where("id", id);
    }
    const totalCount = await getProgramsRequest.clone().count();
    const data = await getProgramsRequest.clone().select();
    return {
        totalCount: totalCount[0]["count"],
        data: data,
    };
}

async function postProgram(name: string, cover: string, description: string) {
    if (!name || !cover || !description) {
        return new APIError(1, "Fields must not be empty");
    } else {
        return await database.table("programs").insert({
            name: name,
            cover: cover,
            description: description,
        }, "id");
    }
}

async function deleteProgram (id: number) {
    return await database.table("programs")
        .where("id", id)
        .del()
        .then((result) => {
            if (result === 1) {
                return {
                    message: "Program deleted",
                    id: id,
                };
            } else {
                return new APIError(14, "Program not found");
            }
        })
        .catch((error) => {
            return new APIError(13, "Program cannot be deleted: " + error);
        });
}

export {getPrograms, postProgram, deleteProgram};
