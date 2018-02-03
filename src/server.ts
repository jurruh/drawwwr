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
    socket.on('createRoom', () => {
        let room = new Room();
        rooms.push(room);

        let particpant = new Participant(socket);
        room.addParticipant(particpant);

        socket.emit('joinRoom', {roomNumber : room.id});
    });

    socket.on('joinRoom', (data:any) => {
        rooms.forEach((room) => {
            if(room.id = data.id){
                let particpant = new Participant(socket, data.name);
                room.addParticipant(particpant);

                socket.emit('joinRoom', {participants:room.participants} )
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socket.id);
    });
});
