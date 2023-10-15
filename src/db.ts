import knex from "knex";

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
            console.warn("Database warning: " + message);
        },
        error(message) {
            console.error("Database error: " + message);
        },
        debug(message) {
            console.debug("Database debug: " + message);
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
            })
                .then(() => {
                    console.log("Database 'medias' created");
                })
                .catch((error) => {
                    console.log("Database 'medias' not created: ", error);
                });
        }
    });

export default database;
