
export interface Booking{
    trip_id: number;
    user_id: string;
    startStop: string;
    endStop: string;
    slug: string;
    it: number;
    stopCodes: string[];
}