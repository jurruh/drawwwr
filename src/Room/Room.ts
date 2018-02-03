import { Participant } from "../Participant/Participant";

export class Room {
    static words:string[] = [
        "Fiets",
        "Auto",
        "Laptop",
        "Huis",
        "Mens",
        "Eifeltoren",
        "Spongebob",
        "Denneboom"
    ];

    static positions:any = {};

    id:number;
    word:string;
    participants: Array<Participant>;

    constructor(){
        this.participants = new Array<Participant>();
        this.id = Math.floor((Math.random() * 1000) + 1);
        this.word = Room.words[Math.floor(Math.random()*Room.words.length)];
        Room.positions[this.id] = 0;
    }

    addParticipant(participant:Participant){
        Room.positions[this.id]++;
        participant.position = Room.positions[this.id];
        this.participants.push(participant);

        this.participants.forEach((p) => {
            if(p.base64!=undefined){
                participant.socket.emit('imageFinished', {base64:p.base64, position:p.position});
            }
        });

        participant.socket.on("showMessage", (data : any) => {
            data.username = participant.name;
            this.emit("printMessage", data)
        });

        participant.socket.on("submitImage", (data:any) => {
            participant.base64 = data.base64;
            this.emit('imageFinished', {base64:data.base64, position:data.position});
        });
    }

    emit(name:string, data:any){
        this.participants.forEach((p) => {
            console.log('name');
            p.socket.emit(name,data);
        });
    }

}