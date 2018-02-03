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
        Room.positions[this.id]++;
        participant.position = Room.positions[this.id];
        this.participants.push(participant);
        participant.socket.on("submitImage", function (data) {
            console.log(data.base64);
        });
    };
    Room.words = ["Fiets", "Auto", "Laptop"];
    Room.positions = {};
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=Room.js.map