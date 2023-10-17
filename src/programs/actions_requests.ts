import database from "../db";
import { APIError} from "../APIErrors";

async function addMediaToProgram (idProgram: number, idMedia: number): Promise<APIError|object|undefined> {
    return database.table("medias")
        .where({"id": idMedia, "idProgram": null})
        .count()
        .then((result) => {
            if (result[0]["count(*)"]) {
                return database.table("medias")
                    .where("id", idMedia)
                    .update({idProgram: idProgram})
                    .then((result) => {
                        if (result === 1) {
                            return {
                                message: "Media updated",
                            };
                        } else {
                            return new APIError(16, "Media is not updated");
                        }

                    })
                    .catch((error) => {
                        return new APIError(17, "Cannot update media: " + error);
                    });
            } else {
                return new APIError(15, "Media is still in a program");
            }
        });
}

async function delMediaToProgram (idProgram: number, idMedia: number): Promise<APIError|object|undefined> {
    return database.table("medias")
        .where({"id": idMedia, "idProgram": idProgram})
        .count()
        .then((result) => {
            if (result[0]["count(*)"]) {
                return database.table("medias")
                    .where("id", idMedia)
                    .update({idProgram: null})
                    .then((result) => {
                        if (result === 1) {
                            return {
                                message: "Media updated",
                            };
                        } else {
                            return new APIError(16, "Media is not updated");
                        }

                    })
                    .catch((error) => {
                        return new APIError(17, "Cannot update media: " + error);
                    });
            } else {
                return new APIError(15, "Program does not contain this media");
            }
        });
}

export { addMediaToProgram, delMediaToProgram };
