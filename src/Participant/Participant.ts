export class Participant {

    socket:any;
    name:string;
    position:number;

    constructor(socket:any, name:string){
        this.socket = socket;
        this.name = name;
    }

}