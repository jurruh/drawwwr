"use strict";
exports.__esModule = true;
var express = require("express");
var socketIo = require("socket.io");
var http_1 = require("http");
var Room_1 = require("./Room/Room");
var Participant_1 = require("./Participant/Participant");
var app = express(), port = 3000, server = http_1.createServer(app), io = socketIo.listen(server);
app.use(express.static('public'));
server.listen(port);
var rooms = Array();
io.on('connection', function (socket) {
    socket.on('createRoom', function (data) {
        var room = new Room_1.Room();
        rooms.push(room);
        var particpant = new Participant_1.Participant(socket, data.username);
        room.addParticipant(particpant);
        socket.emit('joinRoom', { roomNumber: room.id, word: room.word, participants: [{ name: data.username }] });
    });
    socket.on('joinRoom', function (data) {
        console.log(data);
        rooms.forEach(function (room) {
            if (room.id == data.id) {
                var particpant = new Participant_1.Participant(socket, data.username);
                room.addParticipant(particpant);
                var participants_1 = new Array();
                room.participants.forEach(function (p) {
                    if (p.socket.id != socket.id) {
                        p.socket.emit('userJoined', { username: data.username });
                    }
                    participants_1.push({ name: p.name });
                });
                socket.emit('joinRoom', { participants: participants_1, roomNumber: room.id, word: room.word });
            }
        });
    });
    socket.on('disconnect', function () {
        console.log('Disconnected: ' + socket.id);
    });
});
//# sourceMappingURL=server.js.map