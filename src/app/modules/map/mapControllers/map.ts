
import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';

export abstract class Map{

    protected map!: L.Map;
    protected center: any = [39.667341104708946, 20.854922400637918];
    protected marker: L.Icon = L.icon({iconUrl: '../../../../assets/location.png', iconSize: [50, 50]});
    protected bus_stop_icon: L.Icon = L.icon({iconUrl: '../../../../assets/bus-stop.png', iconSize: [25, 25]});
    protected bus_icon: L.Icon = L.icon({iconUrl: '../../../../assets/bus-icon.png', iconSize: [45, 45]});
    protected dest_marker: L.Icon = L.icon({iconUrl: '../../../../assets/dest-marker.png', iconSize: [50, 50]});
    protected pin: L.Icon = L.icon({iconUrl: '../../../../assets/pin.ico', iconSize: [50, 50]});

    abstract clearLayerGroup(): void;

    protected constructor (map: L.Map){
        this.map = map;
    }

    protected createMarker(x: string, y: string, text: string, icon: L.Icon, draggable: boolean = false){
        const coords = <LatLngExpression>[+x, +y];
        const marker = new L.Marker(coords, {icon: icon, interactive: true, draggable: draggable, autoPan: true});
        marker.bindPopup(`<b>${text}</b>`);
        return marker;
    }

    protected centerMap(){
        this.map.setView(this.center, 13);
    }

    protected createPolyline(path: number[][], color: string, text?: string){
        const polyline = L.polyline(<LatLngExpression[]>path, {color: color});
        return polyline;
    }

    protected focusOnPath(p1: L.Marker, p2: L.Marker){
        if(p1 && p2){
          const polyline = L.polyline([p1.getLatLng(), p2.getLatLng()]);
          this.map.fitBounds(polyline.getBounds());
        }
    }

    protected focusOnPoint(point: string[]){
        const coords = <LatLngExpression>[+point[0], +point[1]];
        this.map.flyTo(coords, 18);
    }
    
}