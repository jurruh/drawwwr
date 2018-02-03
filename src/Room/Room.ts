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
    }
}