import { Injectable } from '@angular/core';
import OpenStreetMapProvider from 'leaflet-geosearch/lib/providers/openStreetMapProvider';


@Injectable({
  providedIn: 'root',
})
export class GeocoderService {

    private provider: OpenStreetMapProvider = new OpenStreetMapProvider();

    constructor(){}

    public async geocoder(x: number, y: number): Promise<any>{
        const results = await this.provider.search({ query: `${x},${y}` });
        console.log(results);
    }

 

}