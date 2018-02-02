'use strict';

var socket = io.connect('http://localhost:3000');

$('.createRoom').on('click', function(e) {
    e.preventDefault();
    socket.emit('createRoom');
});

$('.joinRoom').on('click', function(e) {
    e.preventDefault();
    var roomId = $('.roomNumber').val();
    socket.emit('joinRoom', { 'id': roomId });
});