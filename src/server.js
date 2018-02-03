"use strict";
exports.__esModule = true;
var express = require("express");
var socketIo = require("socket.io");
var http_1 = require("http");
var Room_1 = require("./Room/Room");
var Participant_1 = require("./Participant/Participant");
var app = express(), port = 3000, server = http_1.createServer(app), io = socketIo.listen(server);
var allClients = '';
app.use(express.static('public'));
server.listen(port);
var rooms = Array();
io.on('connection', function (socket) {
    socket.on('createRoom', function () {
        var room = new Room_1.Room();
        rooms.push(room);
        var particpant = new Participant_1.Participant(socket);
        room.addParticipant(particpant);
        socket.emit('joinRoom', { roomNumber: room.id });
        console.log(room.id);
    });
    socket.on('joinRoom', function (data) {
        rooms.forEach(function (room) {
            if (room.id = data.id) {
                var particpant = new Participant_1.Participant(socket, data.name);
                room.addParticipant(particpant);
                socket.emit('joinRoom', { participants: room.participants });
            }
        });
    });
    socket.on('disconnect', function () {
        console.log('Disconnected: ' + socket.id);
    });
});
//# sourceMappingURL=server.js.map