// Libraries
const sqlite3 = require('sqlite3').verbose();
const lockers = require('./config.json').lockers;
const DB_PATH = './locker.db';

// Constants
const createTable = `
    CREATE TABLE IF NOT EXISTS locker (
        id TINYTEXT NOT NULL PRIMARY KEY,
        checked_out BOOLEAN NOT NULL,
        user TINYTEXT,
        pass SMALLINT
    );
`;

const createLocker = `
    REPLACE INTO locker
    VALUES 
`;

// Initialization
const DB = new sqlite3.Database(DB_PATH, function(err) {
    if(err) {
        console.error(err);
        return;
    }
    console.log("Connected to " + DB_PATH + " database.");
    DB.exec(createTable, function(err) {
        if(err) {
            console.error("Failed to create locker database: ", err);
            return;
        }
        
        var query = createLocker;
        var lockerQueries = []
        for(var locker of lockers) {
            lockerQueries.push(getInitLocker(locker));
        }
        query += lockerQueries.join(",");
        DB.exec(query, function(err) {
            if(err) {
                console.error("Failed to generate lockers within database: ", err);
            }
        });
    });
});

// Internal Utilities
function getInitLocker(locker) {
    var newLocker = [];
    for(var k = 1; k <= locker.size; k++) {
        newLocker.push(`(
            "${locker.id + k}",
            ${false},
            ${null},
            ${null}
        )`);
    }

    return newLocker.join(", ");
}
