import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getPrograms, postProgram, deleteProgram } from "./programs_requests";
import { addMediaToProgram, delMediaToProgram } from "./actions_requests";
import { APIError } from "../APIErrors";

export default function (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) {
    // List des programs
    fastify.get("/", async (req, res) => {
        res.send(await getPrograms());
    });

    // Creation d'un program
    fastify.post("/", async (req, res) => {
        const params = req.body as {name: string, cover: string, description: string};
        const response: object = await postProgram(params.name, params.cover, params.description)
            .then((id) => {
                return {
                    message: "Data recorded successfully",
                    id: id,
                };
            })
            .catch((error) => {
                return new APIError(12, "Error: " + error);
            });

        res.send(response);
    });

    // Suppression d'un program
    fastify.delete("/:id", async (req, res) => {
        const params = req.params as {id: number};
        res.send(await deleteProgram(params.id));
    });

    // Lecture d'un program
    fastify.get("/:id", async (req, res) => {
        const params = req.params as {id: number};
        res.send(await getPrograms(params.id));
    });

    fastify.get("/:idProgram/add/:idMedia", async (req, res) => {
        const params = req.params as {idProgram: number, idMedia: number};
        res.send(await addMediaToProgram(params.idProgram, params.idMedia));
    });

    fastify.get("/:idProgram/del/:idMedia", async (req, res) => {
        const params = req.params as {idProgram: number, idMedia: number};
        res.send(await delMediaToProgram(params.idProgram, params.idMedia));
    });

    done();
}
