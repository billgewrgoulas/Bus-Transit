import { IPoint } from "./route.entity";
import { IStop } from "./stop.entity";

export interface IMapData{
    stops: IStop[];
    points: IPoint[];
}