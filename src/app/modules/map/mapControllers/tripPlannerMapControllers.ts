import { Map } from "./map";
import * as L from 'leaflet';
import { TripState } from "src/app/modules/planner/state/directions.store";
import { Itinerary, Vertex } from "src/app/state/Entities/itinerary";
import { DataService } from "src/app/services/data.service";
import { DataShareService } from "src/app/services/data-share.service";
import { IStop } from "src/app/state/Entities/stop.entity";
import { GeocoderService } from "src/app/services/geocode.service";

export class TripPlannerMap extends Map{

    private layerGroup: L.LayerGroup = new L.LayerGroup() ;
    private start: L.Marker = this.createMarker('0', '0', '', this.marker, false);
    private end: L.Marker = this.createMarker('0', '0', '', this.dest_marker, false);
    private msg: DataShareService;
    private geocode: GeocoderService

    public constructor(map: L.Map, msg: DataShareService, geocode: GeocoderService){
        super(map);
        this.layerGroup.addTo(this.map);
        this.msg = msg;
        this.geocode = geocode;

        this.start.addEventListener("dragend", (v) => this.onDragStart());
        this.end.addEventListener("dragend", (v) => this.onDragEnd());
    }

    public enableDrag(data: TripState){
        if(data.direction == 'start' && data.start[0] == '0'){
            this.start.dragging?.enable();
        }else if(data.direction == 'dest' && data.destination[0] == '0'){
            this.end.dragging?.enable();
        }else{
            this.dragOff();
        }
    }

    public dragOff(){
        this.start.dragging?.disable();
        this.end.dragging?.disable();
    }

    public initMarkers(data: TripState){

        if(data.start.length > 0){
            this.start.setLatLng([+data.start[2], +data.start[3]]);
            this.start.setPopupContent(`<b>${data.start[1]}</b>`);
            this.start.addTo(this.map);
        }

        if(data.destination.length > 0){
            this.end.setLatLng([+data.destination[2], +data.destination[3]]);
            this.end.setPopupContent(`<b>${data.destination[1]}</b>`);
            this.end.addTo(this.map);
        }

    }

    public addMarker(data: TripState){

        if(data.direction == 'start' && data.start.length > 0){
            this.initMarkers(data);
            this.map.flyTo(this.start.getLatLng(), 15);
        }else if(data.direction == 'dest' && data.destination.length > 0){
            this.initMarkers(data);
            this.map.flyTo(this.end.getLatLng(), 15);
        }else if(data.direction == 'swap'){
            let temp = this.start.getLatLng();
            this.start.setLatLng(this.end.getLatLng());
            this.end.setLatLng(temp);
            this.start.setPopupContent(`<b>${data.start[1]}</b>`);
            this.end.setPopupContent(`<b>${data.destination[1]}</b>`);
        }else {
            this.clearPoint(data.direction);
        }

        this.enableDrag(data);
    }

    public displayItinerary(data: {it: Itinerary | undefined, from: Vertex | undefined, to: Vertex | undefined}){
        
        this.clearLayerGroup();

        if(!data || !data.it || !data.from || !data.to) return;

        const start = this.createMarker(data.from.lat, data.from.lon, data.from?.name, this.marker);
        this.layerGroup.addLayer(start);

        const end = this.createMarker(data.to.lat, data.to.lon, data.to.name, this.dest_marker);
        this.layerGroup.addLayer(end);

        let shape: number[][] = [];

        data.it.legs.forEach(leg =>{
    
            const path: number[][] = leg.points.map(point => [+point[0], +point[1]]); 

            let color: string = ''
            let text: string = '';

            if(leg.mode == 'WALK'){
                color = '#ff726f';
                text = 'Walk';
            }else{
                color = '#002D62'
                text = 'Bus route ' + leg.routeId;
            }
    
            if(leg.from.vertexType == 'TRANSIT'){
                const marker = this.createMarker(leg.from.lat, leg.from.lon, leg.from.name, this.bus_stop_icon);
                this.layerGroup.addLayer(marker);
            }
    
            if(leg.to.vertexType == 'TRANSIT'){
                const marker = this.createMarker(leg.to.lat, leg.to.lon, leg.to.name, this.bus_stop_icon);
                this.layerGroup.addLayer(marker);
            }
    
            if(leg.mode == 'TRAM'){
                leg.intermediateStops.forEach(stop => {
                    const marker = this.createMarker(stop.lat, stop.lon, stop.name, this.bus_stop_icon);
                    this.layerGroup.addLayer(marker);
                });
            }
          
            shape = shape.concat(path);
            const polyline = this.createPolyline(path, color);
            polyline.bindPopup(text);
            this.layerGroup.addLayer(polyline);
        });
    
        this.map.fitBounds(this.createPolyline(shape).getBounds());
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

    public stop(stop: IStop){
        this.start.setLatLng([+stop.latitude, +stop.longitude]);
        this.start.setPopupContent(`<b>${stop.desc}</b>`);
        this.start.addTo(this.map);
    }

    public clearLayerGroup(): void {
        this.layerGroup.clearLayers();
    }

    private async onDragStart(): Promise<void>{
        const label: string = await this.geocode.geocoder(this.start.getLatLng());
        const point: string[] = [
            '0', label,
            this.start.getLatLng().lat + '',
            this.start.getLatLng().lng + ''
        ];

        this.msg.onDragStart(point);
    }

    private async onDragEnd(): Promise<void>{
        const label: string = await this.geocode.geocoder(this.end.getLatLng());
        const point: string[] = [
            '0', label,
            this.end.getLatLng().lat + '',
            this.end.getLatLng().lng + ''
        ];

        this.msg.onDragEnd(point);
    }

}