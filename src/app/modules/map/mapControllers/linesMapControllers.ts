import { IPoint } from "src/app/state/Entities/route.entity";
import { Map } from "./map";
import * as L from 'leaflet';
import { IStop } from "src/app/state/Entities/stop.entity";
import { IArrival } from "src/app/state/Entities/live.data";
import { IMapData } from "src/app/state/Entities/map.data.entity";

export class LinesMap extends Map{

    private layerGroup: L.LayerGroup = new L.LayerGroup() ;
    private buses: L.Marker[] = [];

    public constructor(map: L.Map){
        super(map);
        this.layerGroup.addTo(this.map);
    }

    public displayRouteInfo(data: IMapData | undefined){

        this.clearLayerGroup();
        this.clearBuses();
        this.centerMap();

        if(!data) return;
        
        this.carvePath(data.points);
        this.displayStops(data.stops);
    }

    public carvePath(points: IPoint[]){
        const path = points.map(point => [+point.latitude, +point.longitude]);
        const polyline = this.createPolyline(path, '#002D62');
        this.layerGroup.addLayer(polyline);
        this.map.fitBounds(polyline.getBounds());
    }

    public displayStops(stops: IStop[]){
        stops.forEach(stop =>{
            const marker = this.createMarker(stop.latitude, stop.longitude, stop.desc, this.bus_stop_icon);
            this.layerGroup.addLayer(marker);
        });
    }

    public displayBusLocations(buses: IArrival[]){
        this.clearBuses();
        buses.forEach((bus: IArrival) => {
          const marker = this.createMarker(bus.latitude, bus.longitude, bus.lineCode, this.bus_icon);
          this.buses.push(marker);
          this.layerGroup.addLayer(marker);
        });
    }

    public clearBuses(){
        this.buses.forEach(bus => this.layerGroup.removeLayer(bus));
    }

    public clearLayerGroup(): void {
        this.layerGroup.clearLayers();
    }

    public override focusOnPoint(point: string[]): void {
        super.focusOnPoint(point);
    }
    
}