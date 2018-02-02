"use strict";
exports.__esModule = true;
var express = require("express");
var socketIo = require("socket.io");
var http_1 = require("http");
var app = express(), port = 3000, server = http_1.createServer(app), io = socketIo.listen(server);
var allClients = '';
app.use(express.static('public'));
server.listen(port);
io.on('connection', function (socket) {
    console.log('Client connected: ' + socket.id);
    socket.on('disconnect', function () {
        console.log('Client disconnected: ' + socket.id);
    });
});
//# sourceMappingURL=server.js.map