import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { IStation } from '../state/entities/dataInterfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private markers: any[] = [];
  private polyline: any = L.polyline([]);
  private readonly center: LatLngExpression = [38.03587, 23.54];
  private icon: L.Icon = L.icon({iconUrl: '../../assets/bus-stop.png', iconSize: [50, 50]});

  constructor() {}

  public set setMap(map: L.Map){
    this.map = map;
  }

  public mapInit(){
    this.map.setView(this.center, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  public carvePath(points: number[][]){
    this.polyline = L.polyline(<LatLngExpression[]>points, {color: 'blue'}).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }

  public displayMarkers(stations: IStation[]){
    stations.forEach((station: IStation) => {
      const marker = L.marker(<LatLngExpression>station.latLong, {icon: this.icon});
      marker.bindPopup(station.description + '(' + station.stationCode + ')');
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  public clearMap(){
    this.map.removeLayer(this.polyline);
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.map.setView(this.center, 13);
    this.markers = [];
  }


}
