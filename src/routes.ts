import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { dropDB, emptyDB } from "./db_requests";

export default function (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) {

    fastify.get("/drop/:table", async(req, res) => {
        const params = req.params as {table: string};
        res.send(await dropDB(params.table));
    });

    fastify.get("/empty/:table", async(req, res) => {
        const params = req.params as {table: string};
        res.send(await emptyDB(params.table));
    });

    done();
}
