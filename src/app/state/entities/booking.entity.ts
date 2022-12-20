
export interface Booking{
    trip_id: number;
    user_id: string;
    startStop: string;
    endStop: string;
    slug: string;
    it: number;
    stopCodes: string[];
    start: string;
    end: string;
    route: string;
    travel: string;
    arrive: string;
    fromPlace: string;
    toPlace: string;
    arriveBy: string;
}