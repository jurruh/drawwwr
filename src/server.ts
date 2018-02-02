import * as express from 'express';
import * as socketIo from 'socket.io';
import {createServer} from "http";

const app = express();

app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});


const server = createServer(app);
const io = socketIo(server);

io.on('connected', () => {
    console.log("test");
});


