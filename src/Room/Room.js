"use strict";
exports.__esModule = true;
var Room = (function () {
    function Room() {
        this.participants = new Array();
        this.id = Math.floor((Math.random() * 1000) + 1);
        this.word = Room.words[Math.floor(Math.random() * Room.words.length)];
    }
    Room.prototype.addParticipant = function (participant) {
        var _this = this;
        this.participants.push(participant);
        participant.socket.on("showMessage", function (data) {
            _this.emit("printMessage", data);
        });
    };
    Room.prototype.emit = function (name, data) {
        this.participants.forEach(function (p) {
            p.socket.emit(name, data);
        });
    };
    Room.words = ["Fiets", "Auto", "Laptop"];
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=Room.js.map