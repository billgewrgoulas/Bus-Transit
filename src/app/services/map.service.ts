import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { IStop } from '../state/entities/stop.entity';
import { IPoint } from '../state/entities/route.entity';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private buses: L.Marker[] = [];
  private polyline: any = L.polyline([]);
  private readonly center: LatLngExpression = [39.667341104708946, 20.854922400637918];
  private icon: L.Icon = L.icon({iconUrl: '../../assets/bus-stop.png', iconSize: [35, 35]});
  private busIcon: L.Icon = L.icon({iconUrl: '../../assets/bus-icon.png', iconSize: [25, 25]});

  constructor() {}

  public set setMap(map: L.Map){
    this.map = map;
  }

  public mapInit(){
    this.map.setView(this.center, 2);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  public carvePath(points: IPoint[]){
    const path: any = [];
    points.forEach(point => path.push([+point.latitude, +point.longitude]));
    this.polyline = L.polyline(<LatLngExpression[][]>path, {color: '#1f63d4'}).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }

  public displayMarkers(stops: IStop[]){
    stops.forEach((s: IStop) => {
      const coords = <LatLngExpression>[+s.latitude, +s.longitude];
      const marker = L.marker(coords, {icon: this.icon, interactive: true});
      marker.bindPopup(s.desc + '(' + s.code + ')');
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  // public displayBusLocations(buses: IBus[]){
  //   this.buses.forEach(bus => this.map.removeLayer(bus));
  //   buses.forEach((bus: IBus) => {
  //     const coords = <LatLngExpression>[+bus.CS_LAT, +bus.CS_LNG];
  //     const marker = L.marker(coords, {icon: this.busIcon, interactive: true});
  //     marker.bindPopup(`<b>${bus.VEH_NO}</b>`);
  //     marker.addTo(this.map);
  //     this.buses.push(marker);
  //   });
  // }

  public clearMap(){
    this.map.removeLayer(this.polyline);
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.buses.forEach(bus => this.map.removeLayer(bus));
    this.map.setView(this.center, 13);
    this.markers = [];
    this.buses = [];
  }

  public focusOnPoint(point: string[]){
    const coords = <LatLngExpression>[+point[0], +point[1]];
    this.map.flyTo(coords, 18);
  }

}
