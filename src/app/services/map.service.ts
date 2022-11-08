import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { IStop } from '../state/entities/stop.entity';
import { IPoint } from '../state/entities/route.entity';
import { IArrival } from '../state/entities/live.data';
import test from 'node:test';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private buses: L.Marker[] = [];
  private polyline: any = L.polyline([]);

  private readonly center: LatLngExpression = [39.667341104708946, 20.854922400637918];
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

  public carvePath(points: IPoint[]){
    const path: any = [];
    points.forEach(point => path.push([+point.latitude, +point.longitude]));
    this.polyline = L.polyline(<LatLngExpression[][]>path, {color: '#1f63d4'}).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }

  public displayMarkers(stops: IStop[]){
    stops.forEach((s: IStop) => {
      const marker = this.createMarker(s.latitude, s.longitude, s.code, this.icon);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  public displayBusLocations(buses: IArrival[]){
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
    const coords = <LatLngExpression>[+point[0], +point[1]];
    this.map.flyTo(coords, 18);
  }

  public addStart(data: string[]){
    this.map.removeLayer(this.start);
    const marker = this.createMarker(data[2], data[3], data[1], this.marker);
    marker.addTo(this.map);
    this.start = marker;
  }

  public addEnd(data: string[]){
    this.map.removeLayer(this.end);
    const marker = this.createMarker(data[2], data[3], data[1], this.marker);
    marker.addTo(this.map);
    this.end = marker;
  }

  private createMarker(x: string, y: string, text: string, icon: L.Icon){
    const coords = <LatLngExpression>[+x, +y];
    const marker = new L.Marker(coords, {icon: icon, interactive: true});
    marker.bindPopup(`<b>${text}</b>`);
    this.map.flyTo(coords, 17);
    return marker;
  }

}