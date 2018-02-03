import { Participant } from "../Participant/Participant";

export class Room {
    static words:string[] = ["Fiets", "Auto", "Laptop"];

    id:number;
    word:string;
    participants: Array<Participant>;

    constructor(){
        this.participants = new Array<Participant>();
        this.id = Math.floor((Math.random() * 1000) + 1);
        this.word = Room.words[Math.floor(Math.random()*Room.words.length)];   
    }

    addParticipant(participant:Participant){
        this.participants.push(participant);

        participant.socket.on("showMessage", (data : any) => {
            this.emit("printMessage", data)
        });
    }


    emit(name:string, data:any){
        this.participants.forEach((p) => {
            p.socket.emit(name,data);
        })
    }
    // emitRoom(test : Participant) {
    //     this.participants.forEach((room) => {
    //         if(room.socket == test.socket) {
    //             socket.emit('joinRoom', { 'test':'testdata' });
    //         }
    //     });
    // }
}