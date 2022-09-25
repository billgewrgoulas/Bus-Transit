import { IBus } from "./bus.entity"
import { IStation } from "./station.entity"

export interface IMapData{
    path: number[][];
    stations: IStation[];
}