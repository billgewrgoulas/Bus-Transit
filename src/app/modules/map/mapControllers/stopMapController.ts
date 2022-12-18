import { Store } from "@ngrx/store";
import { Map } from "./map";
import * as L from 'leaflet';
import * as select_actions from 'src/app/state/Actions/select.actions';
import 'leaflet.markercluster';
import { IStop } from "src/app/state/Entities/stop.entity";
import { AppState } from "src/app/state/Reducers/api-reducer";
import { Router } from "@angular/router";

export class StopsMap extends Map{

    private clusters = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: (mapZoom) => {
            if (mapZoom > 16) {
                return 20;
            } else {
                return 80;
            }
        },
    });
    
    private currentStop!: L.Marker;
    private router: Router;

    public constructor(map: L.Map, router: Router){
        super(map);
        this.clusters.addTo(this.map);
        this.router = router;
    }

    public addClustersToMap(stops: IStop[]){

        if(stops.length == 0){
            this.clearLayerGroup();
            return;
        }

        const markers: L.Marker[] = stops.map((stop) => {
            const marker = this.createMarker(stop.latitude, stop.longitude, stop.desc, this.bus_stop_icon, false);
            marker.addEventListener("click", (e) => this.selectStop(stop.code));
            return marker;
        });
        this.clusters.addLayers(markers);
    }

    public clearLayerGroup(): void {
        this.clusters.clearLayers();
        this.setCurrentStop(undefined);
    }

    public setCurrentStop(point: IStop | undefined){

        if(this.currentStop){
            this.map.removeLayer(this.currentStop);
        }

        if(!point){
            return;
        }

        this.currentStop = this.createMarker(point.latitude, point.longitude, point.desc, this.pin, false);
        this.currentStop.addTo(this.map);
    }

    public override focusOnPoint(point: string[]): void {
        super.focusOnPoint(point);
    }

    private selectStop(code: string){
        this.router.navigate([{ outlets: { sidebar: [ 'stops', code ] }}], {queryParams: {module: 'stop_data'}});
    }
    
}