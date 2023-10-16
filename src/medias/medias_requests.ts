import database from "../db";
import { Media } from "./Medias";
import { MediaError} from "./Medias_Errors";

async function getMedias(id?: number):Promise<object> {
    const getMediasRequest = database.table("medias");
    if (id) {
        getMediasRequest.where("id", id);
    }
    const totalCount = await getMediasRequest.clone().count();
    const data = await getMediasRequest.clone().select();
    return {
        totalCount: totalCount[0]["count"],
        data: data,
    };
}

async function postMedia(name: string, duration: number, description: string, file: string): Promise<object> {
    if (!name || !duration || !description || !file) {
        return new MediaError(1, "Fields must not be empty");
    } else {
        return await database.table("medias").insert({
            name: name,
            duration: duration,
            description: description,
            file: file,
        }, "id");
    }
}

async function putMedia(id: number, name: string, duration: number, description: string, file: string) {
    const putMediaRequest = new Media() ;
    if (name) {
        putMediaRequest.name = name;
    }
    if (duration) {
        putMediaRequest.duration = duration;
    }
    if (description) {
        putMediaRequest.description = description;
    }
    if (file) {
        putMediaRequest.file = file;
    }

    return await database.table("medias")
        .where("id", id)
        .update(putMediaRequest)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return new MediaError(6, "Cannot update media: " + error);
        });
}

async function deleteMedia(id: number) {
    return await database.table("medias")
        .where("id", id)
        .del()
        .then((result) => {
            if (result === 1) {
                return {
                    message: "Media deleted",
                    id: id,
                };
            } else {
                return new MediaError(4, "Media not found");
            }
        })
        .catch((error) => {
            return new MediaError(3, "Media cannot be deleted: " + error);
        });
}

export {getMedias, postMedia, putMedia, deleteMedia};
