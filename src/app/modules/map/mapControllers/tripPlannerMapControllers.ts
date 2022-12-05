import { Map } from "./map";
import * as L from 'leaflet';
import { TripState } from "src/app/state/LocalStore/directions.store";
import { Itinerary } from "src/app/state/Entities/itinerary";
import { DataService } from "src/app/services/data.service";
import { DataShareService } from "src/app/services/data-share.service";

export class TripPlannerMap extends Map{

    private layerGroup: L.LayerGroup = new L.LayerGroup() ;
    private start: L.Marker = this.createMarker('0', '0', '', this.marker, true);
    private end: L.Marker = this.createMarker('0', '0', '', this.dest_marker, true);
    private msg: DataShareService;

    public constructor(map: L.Map, msg: DataShareService){
        super(map);
        this.layerGroup.addTo(this.map);
        this.msg = msg;

        this.start.addEventListener("dragend", (v) => {

            const point: string[] = [
                '0', 'Custom',
                this.start.getLatLng().lat + '',
                this.start.getLatLng().lng + ''
            ];

            this.msg.onDragStart(point);
        });

        this.end.addEventListener("dragend", (v) => {

            const point: string[] = [
                '0', 'Custom',
                this.end.getLatLng().lat + '',
                this.end.getLatLng().lng + ''
            ];

            this.msg.onDragEnd(point);
        });

    }

    public addMarker(data: TripState){

        if(data.direction == 'start' && data.start.length > 0){
            this.start.setLatLng([+data.start[2], +data.start[3]]);
            this.start.setPopupContent(`<b>${data.start[1]}</b>`);
            this.start.addTo(this.map);
            this.map.flyTo(this.start.getLatLng(), 15);
        }else if(data.direction == 'dest' && data.destination.length > 0){
            this.end.setLatLng([+data.destination[2], +data.destination[3]]);
            this.end.setPopupContent(`<b>${data.destination[1]}</b>`);
            this.end.addTo(this.map);
            this.map.flyTo(this.end.getLatLng(), 15);
        }else if(data.direction == 'swap'){
            let temp = this.start.getLatLng();
            this.start.setLatLng(this.end.getLatLng());
            this.end.setLatLng(temp);
            this.start.setPopupContent(`<b>${data.start[1]}</b>`);
            this.end.setPopupContent(`<b>${data.destination[1]}</b>`);
        }else{
            this.clearPoint(data.direction);
        }

    }

    public displayItinerary(it: Itinerary | undefined){
        
        this.clearLayerGroup();

        if(!it) return;

        it.legs.forEach(leg =>{
    
            const path = leg.points.map(point => [+point[0], +point[1]]); 

            let color: string = ''
            let text = '';

            if(leg.mode == 'WALK'){
                color = 'rgb(187, 187, 187)';
                text = 'Walk';
            }else{
                color = '#002D62'
                text = 'Bus route ' + leg.routeId;
            }
    
            if(leg.from.vertexType == 'TRANSIT'){
                const marker = this.createMarker(leg.from.lat, leg.from.lon, stop.name, this.bus_stop_icon);
                this.layerGroup.addLayer(marker);
            }
    
            if(leg.to.vertexType == 'TRANSIT'){
                const marker = this.createMarker(leg.to.lat, leg.to.lon, stop.name, this.bus_stop_icon);
                this.layerGroup.addLayer(marker);
            }
    
            if(leg.mode == 'TRAM'){
                leg.intermediateStops.forEach(stop => {
                    const marker = this.createMarker(stop.lat, stop.lon, stop.name, this.bus_stop_icon);
                    this.layerGroup.addLayer(marker);
                });
            }
          
            const polyline = this.createPolyline(path, color);
            polyline.bindPopup(text);
            this.layerGroup.addLayer(polyline);
        });
    
        this.focusOnPath(this.start, this.end);
    }

    public clearPoint(direction: string){
        if(direction == 'start'){
            this.map.removeLayer(this.start);
        }else if (direction == 'dest'){
            this.map.removeLayer(this.end);
        }
    }

    public clearPoints(){
        this.map.removeLayer(this.start);
        this.map.removeLayer(this.end);
    }

    public clearLayerGroup(): void {
        this.layerGroup.clearLayers();
    }

}