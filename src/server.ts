import * as express from 'express';
import * as socketIo from 'socket.io';
import {createServer} from "http";
import { Room } from './Room/Room';
import { Participant } from './Participant/Participant';

const app = express();
const server = createServer(app);
const io = socketIo(server);

app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Drawwwr app listening on port 3000!')
});

const rooms = new Array<Room>();

io.on('connection', (socket: any) => {
    console.log('Connected: ' + socket.id);

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
                let particpant = new Participant(socket);
                room.addParticipant(particpant);
            }
        });


    });

    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socket.id);
    });
});


