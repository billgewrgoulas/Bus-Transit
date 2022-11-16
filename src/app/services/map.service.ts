import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { IStop } from '../state/Entities/stop.entity';
import { IPoint } from '../state/Entities/route.entity';
import { IArrival } from '../state/Entities/live.data';
import test from 'node:test';
import { IMapData } from '../state/Entities/map.data.entity';
import { TripState } from '../state/LocalStore/directions.store';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private buses: L.Marker[] = [];
  private polyline: any = L.polyline([]);

  private center: LatLngExpression = [39.667341104708946, 20.854922400637918];
  private marker: L.Icon = L.icon({iconUrl: '../../assets/location.png', iconSize: [45, 45]});
  private icon: L.Icon = L.icon({iconUrl: '../../assets/bus-stop.png', iconSize: [35, 35]});
  private busIcon: L.Icon = L.icon({iconUrl: '../../assets/bus-icon.png', iconSize: [45, 45]});

  private start: L.Marker = <L.Marker>{};
  private end: L.Marker = <L.Marker>{};

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
    this.map.setView(this.center, 13);
  }

  public displayRouteInformation(data: IMapData | undefined){
    this.clearMap();
    if(!data)return;
    this.carvePath(data.points);
    this.displayStops(data.stops);
  }

  public carvePath(points: IPoint[]){
    const path: any = [];
    points.forEach(point => path.push([+point.latitude, +point.longitude]));
    this.polyline = L.polyline(<LatLngExpression[][]>path, {color: '#1f63d4'}).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }

  public displayStops(stops: IStop[]){
    stops.forEach((s: IStop) => {
      const marker = this.createMarker(s.latitude, s.longitude, s.code, this.icon);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  public displayBusLocations(buses: IArrival[]){
    if(buses.length == 0)return;
    this.buses.forEach(bus => this.map.removeLayer(bus));
    buses.forEach((bus: IArrival) => {
      const marker = this.createMarker(bus.latitude, bus.longitude, bus.lineCode, this.busIcon);
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
    this.map.removeLayer(this.start);
    this.map.removeLayer(this.end);
  }

  public focusOnPoint(point: string[]){
    if(!point) return;
    const coords = <LatLngExpression>[+point[0], +point[1]];
    this.map.flyTo(coords, 18);
  }

  public addMarker(data: TripState){

    let point: string[] = [];
    if(data.direction == 'start'){
      point = data.start;
      this.map.removeLayer(this.start);
    }else if(data.direction == 'dest'){
      point = data.destination;
      this.map.removeLayer(this.end);
    }

    if(point.length == 0){
      return;
    }

    const marker: L.Marker = this.createMarker(point[2], point[3], point[1], this.marker);
    
    if(data.direction == 'start'){
      this.start = marker;
    }else if(data.direction == 'dest'){
      this.end = marker;
    }

    marker.addTo(this.map);
    this.map.flyTo([+point[2], +point[3]], 16);
  }

  private createMarker(x: string, y: string, text: string, icon: L.Icon){
    const coords = <LatLngExpression>[+x, +y];
    const marker = new L.Marker(coords, {icon: icon, interactive: true, draggable: true});
    marker.bindPopup(`<b>${text}</b>`);
    return marker;
  }

}