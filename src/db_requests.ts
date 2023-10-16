import database from "./db";
import { MediaError} from "./medias/Medias_Errors";

async function dropDB(table: string) {
    return await database.schema.dropTable(table)
        .then(() => {
            return {
                message: "Table dropped",
            };
        })
        .catch((error) => {
            return new MediaError(8, "Cannot drop table: " + error);
        });
}

async function emptyDB(table: string) {
    return await database.table(table).truncate()
        .then(() => {
            return {
                message: "Table truncated",
            };
        })
        .catch((error) => {
            return new MediaError(8, "Cannot truncate table: " + error);
        });
}

export {dropDB, emptyDB};
