import Fastify from "fastify";
import mediaRoutes from "./medias/routes";
import database from "./db";
import fastifyFormbody from "@fastify/formbody";

const fastify = Fastify({
    logger: true,
});

fastify.register(fastifyFormbody);
fastify.register(mediaRoutes, { prefix: "/medias" });

try {
    database.raw("select 1+1 as result;")
        .then((response) => {
            if(response[0][0].result !== 2) {
                fastify.log.error("Cannot connect to database: " + response);
            }
        })
        .catch((error) => {
            fastify.log.error(error.message);
        });
} catch(error) {
    fastify.log.error("Cannot connect to database: " + error);
}

const start = async () => {
    try {
        await fastify.listen({ port: 8080 });
    } catch (error) {
        fastify.log.error(error);
    }
};

start();
