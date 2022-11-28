import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { IStop } from '../state/Entities/stop.entity';
import { IPoint } from '../state/Entities/route.entity';
import { IArrival } from '../state/Entities/live.data';
import test from 'node:test';
import { IMapData } from '../state/Entities/map.data.entity';
import { TripState } from '../state/LocalStore/directions.store';
import { ConstantPool } from '@angular/compiler';
import { Itinerary } from '../state/Entities/itinerary';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private buses: L.Marker[] = [];
  private polyline: any = L.polyline([]);

  private center: any = [39.667341104708946, 20.854922400637918];
  private marker: L.Icon = L.icon({iconUrl: '../../assets/location.png', iconSize: [50, 50]});
  private icon: L.Icon = L.icon({iconUrl: '../../assets/bus-stop.png', iconSize: [25, 25]});
  private busIcon: L.Icon = L.icon({iconUrl: '../../assets/bus-icon.png', iconSize: [45, 45]});

  private start: L.Marker | undefined = undefined;
  private end: L.Marker | undefined = undefined;

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

  public displayRouteInformation(data: IMapData){
    this.clearMap('start');
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
    this.buses.forEach(bus => this.map.removeLayer(bus));
    buses.forEach((bus: IArrival) => {
      const marker = this.createMarker(bus.latitude, bus.longitude, bus.lineCode, this.busIcon);
      marker.addTo(this.map);
      this.buses.push(marker);
    });
  }

  public clearMap(mode: string){
    this.map.removeLayer(this.polyline);
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.buses.forEach(bus => this.map.removeLayer(bus));
    this.map.setView(this.center, 13);
    this.markers = [];
    this.buses = [];

    if(mode != 'plan'){
      this.clearMarkers();
    }

  }

  public clearMarkers(){

    if(this.start){
      this.map.removeLayer(this.start);
    }

    if(this.end){
      this.map.removeLayer(this.end);
    }

    this.start = undefined;
    this.end = undefined;
  }

  public focusOnPoint(point: string[]){
    const coords = <LatLngExpression>[+point[0], +point[1]];
    this.map.flyTo(coords, 18);
  }

  public addMarker(data: TripState){

    if(data.direction == ''){
      this.clearMap('delete_marker');
    }

    let point: string[] = [];
    if(data.direction == 'start'){
      point = data.start;
      if(this.start){
        this.map.removeLayer(this.start);
      }
    }else if(data.direction == 'dest'){
      point = data.destination;
      if(this.end){
        this.map.removeLayer(this.end);
      }
    }else if(data.direction == 'swap'){
      let temp = this.start;
      this.start = this.end;
      this.end = temp;
    }

    let marker: L.Marker;
    if(data.options.includes("interactive")){
      marker = this.createMarker(this.center[0], this.center[1], '', this.marker, true);
    }else if (point.length == 0){
      return;
    }else{
      marker = this.createMarker(point[2], point[3], point[1], this.marker);
    }
    
    if(data.direction == 'start'){
      this.start = marker;
    }else if(data.direction == 'dest'){
      this.end = marker;
    }

    marker.addTo(this.map);
    this.map.flyTo(marker.getLatLng(), 16);
  }

  public displayItinerary(it: Itinerary){
    this.clearMap('plan');

    let path: any = [];
    it.legs.forEach(leg =>{

      leg.points.forEach(point => path.push([+point[0], +point[1]])); 

      let color: string = '#002D62'
      if(leg.mode == 'WALK'){
        color = 'rgb(187, 187, 187)';
      }

      if(leg.from.vertexType == 'TRANSIT'){
        const marker = this.createMarker(leg.from.lat, leg.from.lon, stop.name, this.icon);
        marker.addTo(this.map);
        this.markers.push(marker);
      }

      if(leg.to.vertexType == 'TRANSIT'){
        const marker = this.createMarker(leg.to.lat, leg.to.lon, stop.name, this.icon);
        marker.addTo(this.map);
        this.markers.push(marker);
      }

      if(leg.mode == 'TRAM'){
        leg.intermediateStops.forEach(stop => {
          const marker = this.createMarker(stop.lat, stop.lon, stop.name, this.icon);
          marker.addTo(this.map);
          this.markers.push(marker);
        });
        
      }
      
      L.polyline(<LatLngExpression[][]>path, {color: color}).addTo(this.map);
      path = [];
    });

    this.focusOnPath(this.start!, this.end!);

  }

  private focusOnPath(p1: L.Marker, p2: L.Marker){

    if(p1 && p2){
      const polyline = L.polyline([p1.getLatLng(), p2.getLatLng()]);
      this.map.fitBounds(polyline.getBounds());
    }
    
  }

  private createMarker(x: string, y: string, text: string, icon: L.Icon, draggable: boolean = false){
    const coords = <LatLngExpression>[+x, +y];
    const marker = new L.Marker(coords, {icon: icon, interactive: true, draggable: draggable, autoPan: true});
    marker.bindPopup(`<b>${text}</b>`);
    return marker;
  }

}