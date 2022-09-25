import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { IStation } from '../state/entities/station.entity';
import { IBus } from '../state/entities/bus.entity';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private buses: L.Marker[] = [];
  private polyline: any = L.polyline([]);
  private readonly center: LatLngExpression = [38.03587, 23.54];
  private icon: L.Icon = L.icon({iconUrl: '../../assets/bus-stop.png', iconSize: [35, 35]});
  private busIcon: L.Icon = L.icon({iconUrl: '../../assets/bus-icon.png', iconSize: [25, 25]});

  constructor() {}

  public set setMap(map: L.Map){
    this.map = map;
  }

  public mapInit(){
    this.map.setView(this.center, 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  public carvePath(points: number[][]){
    this.polyline = L.polyline(<LatLngExpression[]>points, {color: '#232631'}).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }

  public displayMarkers(stations: IStation[]){
    stations.forEach((s: IStation) => {
      const coords = <LatLngExpression>[s.StopLat, s.StopLng];
      const marker = L.marker(coords, {icon: this.icon, interactive: true});
      marker.bindPopup(s.StopDescr + '(' + s.StopCode + ')');
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  public displayBusLocations(buses: IBus[]){
    this.buses.forEach(bus => this.map.removeLayer(bus));
    buses.forEach((bus: IBus) => {
      const coords = <LatLngExpression>[+bus.CS_LAT, +bus.CS_LNG];
      const marker = L.marker(coords, {icon: this.busIcon, interactive: true});
      marker.bindPopup(`<b>${bus.VEH_NO}</b>`);
      marker.addTo(this.map);
      this.buses.push(marker);
    });
  }

  public clearMap(){
    this.map.removeLayer(this.polyline);
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.buses.forEach(bus => this.map.removeLayer(bus));
    this.map.setView(this.center, 13);
    this.markers = [];
    this.buses = [];
  }

  public focusOnStop(stop: IStation){
    const coords = <LatLngExpression>[+stop?.StopLat, +stop?.StopLng];
    this.map.flyTo(<LatLngExpression>coords, 18);
  }

}
