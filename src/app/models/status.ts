
import { Station } from "./station";

export class Status{

    private isFinal: boolean = false;
    private estimatedArrival: string = '';

    constructor(private station: Station, private arrival: string){}

    get nextStation(): Station{
        return this.station
    }

    set next(station: Station){
        this.station = station;
    }

    get arrivalTime(): string{
        return this.arrival;
    }

    set setFinal(value: boolean){
        this.isFinal = value;
    }

    get final(): boolean{
        return this.isFinal;
    }

    get estimatedTime(){
        return this.estimatedArrival;
    }

    set estimated(value: string){
        this.estimatedArrival = value;
    }
}