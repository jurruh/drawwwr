import { Participant } from "../Participant/Participant";

export class Room {
    id:number;

    participants: Array<Participant>;

    constructor(){
        this.participants = new Array<Participant>();
        this.id = Math.floor((Math.random() * 1000) + 1);      
    }

    addParticipant(participant:Participant){
        this.participants.push(participant);
    }
}