console.log("Bump.");

const express = require('express');
const http = require('http');

console.log("Set.");

const { version } = require('./package.json');
//-------------------------------------
// Express Configuration
//-------------------------------------
var app = express();
// app.use(favicon());
app.use('/public', express.static(__dirname + 'public'));

// Health check for LB
app.use('/ecv', function(req, res) { res.sendStatus(200); });

//-------------------------------------
// Public API
//-------------------------------------

app.get('/version', function(req, res) {
    res.json({ version: version });
});

//-------------------------------------
// Public API
//-------------------------------------
app.use('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080);
http.createServer(app).listen(8443);

console.log("Spike.");