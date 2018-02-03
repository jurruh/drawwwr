export class Participant {

    socket:any;
    name:string;
    position:number;
    base64:string;

    constructor(socket:any, name:string){
        this.socket = socket;
        this.name = name;
    }

}