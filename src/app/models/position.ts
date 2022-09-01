import * as L from "leaflet";
import { LatLng } from "leaflet";

export class Position{
    
    constructor(private lat: number, private long: number){}

    get arr(): LatLng{
        return L.latLng(this.lat, this.long);
    }

    get latitude(){
        return this.lat;
    }

    get longitude(){
        return this.long;
    }
}