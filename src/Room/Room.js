"use strict";
exports.__esModule = true;
var Room = (function () {
    function Room() {
        this.id = Math.floor((Math.random() * 1000) + 1);
        this.participants = new Array();
    }
    Room.prototype.addParticipant = function (participant) {
        this.participants.push(participant);
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=Room.js.map