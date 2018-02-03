import { Participant } from "../Participant/Participant";

export class Room {
    id:number;

    participants: Array<Participant>;

    constructor(){
<<<<<<< HEAD
        this.participants = new Array<Participant>();
        this.id = Math.floor((Math.random() * 1000) + 1);      
=======
        this.id = Math.floor((Math.random() * 1000) + 1);
        this.participants = new Array<Participant>();
>>>>>>> e74e2cc6fab294d4d5afec71d03c4a1bceeb5877
    }

    addParticipant(participant:Participant){
        this.participants.push(participant);
    }
}