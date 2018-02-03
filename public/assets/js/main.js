'use strict';

$('.addUsername').hide();

const socket = io.connect('http://localhost:3000');

$('.createRoom').on('click', function(e) {
    e.preventDefault();
    socket.emit('createRoom');
});

$('.enterUsername').on('click', function(e) {
    e.preventDefault();
    if ($('.roomNumber').val().length > 0) {
        $('.preUsername').hide();
        $('.addUsername').show();
    } else {
        alert('Enter roomnumber');
    }
});

socket.on('joinRoom', function(data) {
    console.log('hij komt bij join room');
    $('.addUsername').hide();
    $('.waitingroom').show();
    console.log(data);
    var joinedRoomnumber = data.roomNumber;
    $('.addUsername__roomnumber span').html(joinedRoomnumber);

    if(data.participants != undefined){
        for (var i = 0; i < data.participants.length; i ++) {
            $('#usernames').append('<li>' + data.participants[i].name + '</li>');
        }
    }


});

$('.joinRoom').on('click', function(e) {
    e.preventDefault();
    var roomId = $('[name=roomnumber]').val();
    var username = $('.username').val();
    socket.emit('joinRoom', { 'id': roomId, 'username': username });
});


socket.on('passWaitingroom', function(data) {
    $('.addUsername').hide();
    $('.waitingroom').show();
    var joinedRoomnumber = data.roomNumber;
    var roomSubject = data.roomSubject;
    $('.waitingroom__roomnumber span').html(joinedRoomnumber);
    $('.waitingroom__subject span').html(roomSubject);
});

$('.enterDrawing').on('click', function(e) {
    e.preventDefault();

});