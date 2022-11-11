import { IPoint } from "./route.entity";
import { IStop } from "./stop.entity";

export interface IMapData{
    stops: IStop[];
    points: IPoint[];
}

export interface TripData{
    start: string[];
    destination: string[];
}

export const defaultTrip: TripData = {
    start: [],
    destination: []
}