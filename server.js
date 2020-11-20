console.log("Bump.");

// Libraries
const GPIO = require('onoff').GPIO;
const express = require('express');
const http = require('http');

// My Scripts
const locker = require('./locker');
const PrimeLockers = require('./server/PrimeLockers');

console.log("Set.");

//-------------------------------------
// Constants
//-------------------------------------
const { version } = require('./package.json');
const pinout = {
    buzzer: new GPIO(5, 'out'),
    A: {
        lock: new GPIO(17, 'out'),
        select: [
            new GPIO(27, 'out'),
            new GPIO(22, 'out')
        ]
    },
    B: {
        lock: new GPIO(16, 'out'),
        select: [
            new GPIO(20, 'out'),
            new GPIO(21, 'out')
        ]
    }
}

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
