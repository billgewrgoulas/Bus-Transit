
export interface Step{
    distance: number;
    relativeDirection: string;
    streetName: string;
    absoluteDirection: string;
    lon: number;
    lat: number;
}

export interface Vertex{
    name: string;
    lon: string;
    lat: string;
    vertexType: string;
    departure: string;
    arrival: string;
    stopCode?: string;
    stopId?: string;
    stopIndex: number;
    stopSequence: number;
}

export interface Leg{
    points: string;
    duration: number;
    mode: string;
    steps: Step[];
    routeId: string;
    tripId: string;
    serviceDate: string;
    agencyName: string;
    agencyTimeZoneOffset: number;
    startTime: string;
    endTime: string;
    distance: string;
    departureDelay: number;
    arrivalDelay: number;
    routeShortName: string;
    from: Vertex;
    to: Vertex;
    intermediateStops: Vertex[];
}

export interface Itinerary{
    duration: number;
    startTime: string;
    endTime: string;
    walkTime: number;
    transitTime: number;
    waitingTime: number;
    walkDistance: number;
    legs: Leg[];
}

export interface Plan{
    date: string;
    arrival: string;
    from: Vertex;
    to: Vertex;
    totalWalk: number;
    duration: number;
    itineraries: Itinerary[];
}