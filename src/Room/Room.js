"use strict";
exports.__esModule = true;
var Room = (function () {
    function Room() {
        this.participants = new Array();
        this.id = Math.floor((Math.random() * 1000) + 1);
        this.word = Room.words[Math.floor(Math.random() * Room.words.length)];
        Room.positions[this.id] = 0;
    }
    Room.prototype.addParticipant = function (participant) {
        var _this = this;
        Room.positions[this.id]++;
        participant.position = Room.positions[this.id];
        this.participants.push(participant);
        this.participants.forEach(function (p) {
            if (p.base64 != undefined) {
                participant.socket.emit('imageFinished', { base64: p.base64, position: p.position });
            }
        });
        participant.socket.on("showMessage", function (data) {
            data.username = participant.name;
            _this.emit("printMessage", data);
        });
        participant.socket.on("submitImage", function (data) {
            participant.base64 = data.base64;
            _this.emit('imageFinished', { base64: data.base64, position: data.position });
        });
    };
    Room.prototype.emit = function (name, data) {
        this.participants.forEach(function (p) {
            console.log('name');
            p.socket.emit(name, data);
        });
    };
    Room.words = [
        "Fiets",
        "Auto",
        "Laptop",
        "Huis",
        "Mens",
        "Eifeltoren",
        "Spongebob",
        "Denneboom"
    ];
    Room.positions = {};
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=Room.js.map