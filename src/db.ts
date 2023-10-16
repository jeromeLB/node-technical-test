import knex from "knex";
import Fastify from "fastify";

const fastify = Fastify({
    logger: true,
});

const database = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        port: 3306,
        user: "server",
        password: "staging",
        database: "app",
    },
    // debug: true,
    log: {
        warn(message) {
            fastify.log.warn("Database warning: " + message);
        },
        error(message) {
            fastify.log.error("Database error: " + message);
        },
        debug(message) {
            fastify.log.debug("Database debug: " + message);
        },
    },
});

database.raw("DESCRIBE medias")
    .catch((error) => {
        if(error.code === "ER_NO_SUCH_TABLE") {
            database.schema.createTable("medias", (table) => {
                table.increments();
                table.string("name");
                table.integer("duration");
                table.string("description");
                table.string("file");
            })
                .then(() => {
                    fastify.log.info("Database 'medias' created");
                })
                .catch((error) => {
                    fastify.log.error("Database 'medias' not created: ", error);
                });
        }
    });

database.raw("DESCRIBE programs")
    .catch((error) => {
        if(error.code === "ER_NO_SUCH_TABLE") {
            database.schema.createTable("programs", (table) => {
                table.increments();
                table.string("name");
                table.string("cover");
                table.string("description");
            })
                .then(() => {
                    fastify.log.info("Database 'programs' created");
                })
                .catch((error) => {
                    fastify.log.error("Database 'programs' not created: ", error);
                });
        }
    });

export default database;
