import database from "../db";

async function getMedias(id?: string):Promise<object> {
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

async function postMedia(name: string, duration: number, description: string): Promise<object> {
    if (!name || !duration || !description) {
        return {
            error: 1,
            message: "Fields must not be empty",
        };
    } else {
        return await database.table("medias").insert({
            name: name,
            duration: duration,
            description: description,
        });
    }
}
export {getMedias, postMedia};
