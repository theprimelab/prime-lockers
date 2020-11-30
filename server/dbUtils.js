const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './locker.db';

const createTable = `
    CREATE TABLE IF NOT EXISTS locker (
        id integer NOT NULL PRIMARY KEY,
        checked_out boolean NOT NULL,
        user text,
        pass text
    );
`;

const DB = new sqlite3.Database(DB_PATH, function(err) {
    if(err) {
        console.error(err);
        return;
    }
    console.log("Connected to " + DB_PATH + " database.");
    DB.exec(createTable, function(err) {
        if(err) {
            console.error("Failed to create locker database: ", err);
        }
    });
});