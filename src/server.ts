import * as express from 'express';
import * as socketIo from 'socket.io';
import { createServer } from "http";

const   app = express(),
    port = 3000,
    server = createServer(app),
    io = socketIo.listen(server);

let allClients = '';

app.use(express.static('public'));

server.listen(port);

io.on('connection', (socket: any) => {
    console.log('Client connected: ' + socket.id);

    socket.on('joinRoom', function(response) {
        allClients.push(response);
        socket.join(response.room);
        io.in(response.room).emit( 'watchers', { 'currWatchers': clientNum('/', response.room) } );
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id);
    });
});
