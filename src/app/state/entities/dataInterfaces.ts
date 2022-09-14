
export interface IArrivalInfo{
    route_code: string;
    veh_code: string;
    btime2: string;
}

export interface IArrival{
    arrivalInfo: IArrivalInfo[];
    stationCode: string;
}

export interface IStation{
    stationCode: string;
    id: string;
    description: string;
    heading: string;
    latLong: number[];
}

export interface IBus{
    VEH_NO: string;
    CS_DATE: string;
    CS_LAT: string;
    CS_LNG: string;
    ROUTE_CODE: string;
}

export interface IRoute{
    routeCode: string;
    routeDesc: string;
    routeDescEng: string;
    stations: IStation[];
    latLong: number[][];
    buses: IBus[];
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