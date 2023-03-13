import { Injectable } from '@angular/core';
import OpenStreetMapProvider, { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';

@Injectable({
  providedIn: 'root',
})
export class GeocoderService {

    private provider: OpenStreetMapProvider = new OpenStreetMapProvider();

    constructor(){}

    public async geocoder(coords: L.LatLng): Promise<string>{
        const results = await this.provider.search({ query: `${coords.lat},${coords.lng}` }).catch(e => console.error('Can not geocode!'));

        if(!results){
          return 'Επιλογή';
        }

        const label: string[] = results[0].label.split(',');
        return label[0] + label[1];
    }

}