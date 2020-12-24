// Libraries
const sqlite3 = require('sqlite3').verbose();
const lockers = require('./config.json').lockers;
const DB_PATH = './locker.db';

// Constants
var DB;

// ----------------------------------------------
// Initializers
// ----------------------------------------------
/**
 * Initializes the locker database
 */
function init() {
    if(!lockers) {
        throw "No lockers defined in config."
    }

    DB = new sqlite3.Database(DB_PATH, async function(err) {
        if(err) {
            console.error(err);
            throw err;
        }
        console.log("Connected to database at " + DB_PATH);

        await initLockerTable().catch(function(err) {
            throw err;
        });
        await initLockerRows().catch(function(err) {
            throw err;
        });

        console.log("Locker DB Ready!");
    });
}

/**
 * Initializes Locker table
 * @returns {Promise}
 */
function initLockerTable() {
    return new Promise(function(resolve, reject) {
        const createTable = `
            CREATE TABLE IF NOT EXISTS locker (
                id TINYTEXT NOT NULL PRIMARY KEY,
                checked_out BOOLEAN NOT NULL,
                pass SMALLINT,
                reserve_date TIMESTAMP
            );
        `;
        DB.exec(createTable, function(err) {
            if(err) {
                console.error("Failed to create locker database: ", err);
                reject(err);
            }
            resolve();
        });
    });
}

/**
 * Initializes Locker table
 * @returns {Promise}
 */
function initLockerRows() {
    return new Promise(function(resolve, reject) {
        var query = "REPLACE INTO locker VALUES";
        var lockerQueries = []
        for(var locker of lockers) {
            lockerQueries.push(generateLocker(locker));
        }
        query += lockerQueries.join(",");

        DB.exec(query, function(err) {
            if(err) {
                console.error("Failed to generate lockers within database: ", err);
                reject(err);
            }

            resolve();
        });
    });
}

/**
 * Generates a SQL value string with rows for a locker set
 * @param {String} locker 
 */
function generateLocker(locker) {
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


// ----------------------------------------------
// Utilities
// ----------------------------------------------
/**
 * Returns a full locker row from the given ID
 * @param {String} lockerId - ID of locker
 * @returns {Promise}
 */
function getRow(lockerId) {
    return new Promise(function(resolve, reject) {
        const query = "SELECT * FROM locker WHERE id = ?";
        DB.get(query, [lockerId], (err, row) => {
            if(err) {
                console.error("Failed to retrieve locker: ", err);
                reject(err);
            }

            resolve(row);
        });
    });
}

module.exports = {
    init: init,
    getRow: getRow
}