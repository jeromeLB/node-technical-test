import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getMedias, postMedia, putMedia, deleteMedia } from "./medias_requests";
import { APIError } from "../APIErrors";

export default function (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) {

    // List des medias
    fastify.get("/", async (req, res) => {
        res.send(await getMedias());
    });

    // Creation d'un media
    fastify.post("/", async (req, res) => {
        const params = req.body as {name: string, duration: number, description: string, file: string};
        const response: object = await postMedia(params.name, params.duration, params.description, params.file)
            .then((id) => {
                return {
                    message: "Data recorded successfully",
                    id: id,
                };
            })
            .catch((error) => {
                return new APIError(2, "Error: " + error);
            });

        res.send(response);
    });

    // Lecture d'un media
    fastify.get("/:id", async (req, res) => {
        const params = req.params as {id: number};
        res.send(await getMedias(params.id));
    });

    // Mise a jour d'un media
    fastify.put("/:id", async (req, res) => {
        const params = req.params as {id: number};
        const paramsBody = req.body as {id: number, name: string, duration: number, description: string, file: string};
        console.log("** paramsbody", paramsBody);
        if (paramsBody) {
            const response = await putMedia(params.id, paramsBody.name, paramsBody.duration, paramsBody.description, paramsBody.file)
                .then((result) => {
                    if (result === 1) {
                        return {
                            message: "Media updated",
                        };
                    } else {
                        return new APIError(7, "Media is not updated");
                    }
                })
                .catch((error) => {
                    return new APIError(6, "Error when updating data: " + error);
                });

            res.send(response);
        } else {
            res.send(new APIError(5, "Nothing to update"));
        }
    });

    // Suppression d'un media
    fastify.delete("/:id", async (req, res) => {
        const params = req.params as {id: number};
        res.send(await deleteMedia(params.id));
    });

    done();
}
