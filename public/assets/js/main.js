'use strict';

$('.addUsername').hide();

const socket = io.connect('http://localhost:3000');

let newRoom = false;

$('.createRoom').on('click', function(e) {
    e.preventDefault();
    $('.preUsername').hide();
    $('.addUsername').show();
    newRoom = true;
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

    $('.room-placeholder').html(data.roomNumber);
    $('.word-placeholder').html(data.word);

    if(data.participants != undefined){
        for (var i = 0; i < data.participants.length; i ++) {
            $('#usernames').append('<li>' + data.participants[i].name + '</li>');
        }
    }


});

$('.joinRoom').on('click', function(e) {
    e.preventDefault();
    var username = $('.username').val();
    if(newRoom){
        socket.emit('createRoom', {'username':username});
    }else{
        var roomId = $('[name=roomnumber]').val();
        socket.emit('joinRoom', { 'id': roomId, 'username': username });
    }
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

    $('.waitingroom').hide();
    $('.gameroom').show();
    InitThis();
});

socket.on('userJoined', function(data){
    $('#usernames').append('<li>' + data.username + '</li>');
});