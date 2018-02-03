import * as express from 'express';
import * as socketIo from 'socket.io';
import { createServer } from "http";
import { Room } from './Room/Room';
import { Participant } from './Participant/Participant';

const   app = express(),
        port = 3000,
        server = createServer(app),
        io = socketIo.listen(server);

let allClients = '';

app.use(express.static('public'));

server.listen(port);

const rooms = Array<Room>();

io.on('connection', (socket: any) => {
    socket.on('createRoom', (data:any) => {
        let room = new Room();
        rooms.push(room);

        console.log(data);

        let particpant = new Participant(socket, data.username);
        room.addParticipant(particpant);

        console.log("Room id" + room.id);

        socket.emit('joinRoom', {roomNumber : room.id, word:room.word, participants: [{name:data.username}]});
    });

    socket.on('joinRoom', (data:any) => {
        console.log(data);
        rooms.forEach((room) => {
            if(room.id == data.id){
                let particpant = new Participant(socket, data.username);
                room.addParticipant(particpant);
                console.log(room.participants);

                let participants = new Array();

                room.participants.forEach((p:Participant) => {
                    if(p.socket.id != socket.id){
                        p.socket.emit('userJoined', {username:data.username});
                    }
                    participants.push({name:p.name});
                });

                socket.emit('joinRoom', {participants:participants} )
                socket.to(room.id).emit('joinRoom', { participants:participants, roomNumber:room.id, word:room.word });
            }
        });
        console.log("Room group showing");

        socket.broadcast.emit('', );
    });

    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socket.id);
    });
});
