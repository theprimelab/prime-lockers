console.log("Bump.");

// Libraries
const GPIO = require('onoff').GPIO;
const express = require('express');
const http = require('http');

// My Scripts
const dbUtils = require('./server/dbUtils');
const locker = require('./server/objects/PrimeLocker');
const PrimeLockers = require('./server/PrimeLockers');

console.log("Set.");

//-------------------------------------
// Constants
//-------------------------------------
const { version } = require('./package.json');

// ----------------------------------------------
// Database Initialization
// ----------------------------------------------
await dbUtils.init().catch(function(err) {
    console.error(err);
    process.exit(1);
});

//-------------------------------------
// Driver Setup
//-------------------------------------
let lockerA = new locker(pinout.A);
let lockerB = new locker(pinout.B);

//-------------------------------------
// Express Configuration
//-------------------------------------
var app = express();
// app.use(favicon());
app.use('/public', express.static(__dirname + 'public'));

// Health check for LB
app.use('/ecv', function(req, res) { res.sendStatus(200); });

//-------------------------------------
// Public API - Server
//-------------------------------------
app.get('/version', function(req, res) {
    res.json({ version: version });
});

//-------------------------------------
// Public API - Lockers
//-------------------------------------
app.get('/api/locker/:lockerId', PrimeLockers.handler.get);

app.get('/api/locker', PrimeLockers.handler.getAll);



//-------------------------------------
// Finally...
//-------------------------------------
app.use('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080);
http.createServer(app).listen(8443);

console.log("Spike.");
