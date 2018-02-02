"use strict";
exports.__esModule = true;
var express = require("express");
var socketIo = require("socket.io");
var http_1 = require("http");
var app = express();
app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
var server = http_1.createServer(app);
var io = socketIo(server);
io.on('connection', function (socket) {
    console.log('Connected: ' + socket.id);
    socket.on('disconnect', function () {
        console.log('Disconnected: ' + socket.id);
    });
});
//# sourceMappingURL=server.js.map