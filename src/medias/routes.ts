import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getMedias, postMedia } from "./medias_requests";

export default function (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) {

    // List des medias
    fastify.get("/", async (req, res) => {
        res.send(await getMedias());
    });

    // Creation d'un media
    fastify.post("/", async (req, res) => {
        const params = req.body as {name: string, duration: number, description: string};
        const response: object = await postMedia(params.name, params.duration, params.description)
            .then(() => {
                return {
                    message: "Data recorded successfully",
                };
            })
            .catch((error) => {
                return {
                    error: 2,
                    message: "Error when inserting data: " + error,
                };
            });

        res.send(response);
    });

    // Lecture d'un media
    fastify.get("/:id", async (req, res) => {
        const params = req.params as {id: string};
        res.send(await getMedias(params.id));
    });

    // Mise a jour d'un media
    fastify.put("/:id", async (req, res) => {
        const params = req.params as {id: string};
        res.send({ message: "put /medias/" + params.id});
    });

    // Suppression d'un media
    fastify.delete("/:id", async (req, res) => {
        const params = req.params as {id: string};
        res.send({ message: "delete /medias/" + params.id});
    });

    done();
}
