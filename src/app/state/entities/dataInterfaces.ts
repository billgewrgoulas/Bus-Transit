
export interface IArrival{
    routeCode: string;
    busId: string;
    arrivalTime: string;
    stationCode: string;
}

export interface IStation{
    stationCode: string;
    id: string;
    description: string;
    heading: string;
    latLong: number[];
}

export interface IRoute{
    routeCode: string;
    routeDesc: string;
    routeDescEng: string;
    stations: IStation[];
    latLong: number[][];
}

export interface ILine{
    sdc_code: string;
    line_code: string;
    line_id: string;
    line_decr: string;
    line_descr: string;
    routesDetails: IRoute;
    routeCodes: number[];
}