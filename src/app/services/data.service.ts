import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ILine } from '../state/Entities/line.entity';
import { IRoute, IRouteInfo } from '../state/Entities/route.entity';
import { IArrival } from '../state/Entities/live.data';
import { IScheduleDetails } from '../state/Entities/schedule.entity';
import { IStop } from '../state/Entities/stop.entity';
import { TripState } from '../modules/planner/state/directions.store';
import { Plan } from '../state/Entities/itinerary';
import { Booking } from '../state/Entities/booking.entity';
import { ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly url: string = 'http://localhost:3000';
  private readonly liveUri: string = 'http://localhost:3000/live/';
  private readonly options: Object; 

  constructor(private http: HttpClient) { 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.options = {headers: headers, withCredentials: false};    
  }

  public getAllLines(): Observable<ILine[]>{
    return this.http.get(this.url + '/transitAPI/lines', this.options).pipe(
      map((res: any) => <ILine[]>res),
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getAllStops(): Observable<IStop[]>{
    return this.http.get(this.url + '/transitAPI/stops', this.options).pipe(
      map((res: any) => <IStop[]>res),
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getLineRoutes(id: string): Observable<IRoute[]>{
    return this.http.get(this.url + '/transitAPI/lineRoutes/' + id, this.options).pipe(
      map((res: any) => <IRoute[]>res),
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getRouteDetails(code: string): Observable<IRouteInfo>{
    return this.http.get(this.url + '/transitAPI/routeInfo/' + code, this.options).pipe(
      map((res: any) => <IRouteInfo>res), 
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getRouteSchedules(code: string): Observable<IScheduleDetails>{
    return this.http.get(this.url + '/transitAPI/routeSchedules/' + code, this.options).pipe(
      map((res: any) => <IScheduleDetails>res), 
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getLiveUpdates(code: string, slug: string): Observable<IArrival[]>{
    return this.http.get(this.liveUri + slug + code, this.options).pipe(
      map((res: any) => <IArrival[]>res), 
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getFilteredRoutes(payload: TripState): Observable<IRoute[]>{
    return this.http.post(this.url + '/transitAPI/getPaths', {data: payload}, this.options).pipe(
      map((res: any) => <IRoute[]>res), 
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getFilteredStops(code: string): Observable<IStop[]>{
    return this.http.get(this.url + '/transitAPI/filterStops/' + code, this.options).pipe(
      map((res: any) => <IStop[]>res),
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getRoutesByStop(code: string): Observable<IRoute[]>{
    return this.http.get(this.url + '/transitAPI/stopRoutes/' + code, this.options).pipe(
      map((res: any) => <IRoute[]>res),
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getPlan(payload: TripState): Observable<Plan>{
    return this.http.post(this.url + '/transitAPI/getPaths', {data: payload}, this.options).pipe(
      map((res: any) => <Plan>res), 
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public login(credentials: any): Observable<any>{
    return this.http.post(this.url + '/login', credentials, this.options);
  }

  public register(credentials: any): Observable<any>{
    return this.http.post(this.url + '/register', credentials, this.options);
  }

  public book(data: Booking[]): Observable<any>{
    return this.http.post(this.url + '/bookings/new', data, {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token(),
    }}).pipe(map((res: any) => <any>res));
  }

  public getBookings(): Observable<Booking[]>{
    return this.http.get(this.url + '/bookings/get', {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token()}}).pipe(
        map((res: any) => <Booking[]>res)
    );
  }

  public deleteBooking(booking: Booking): Observable<any>{
    return this.http.post(this.url + '/bookings/delete', booking, {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token()}}).pipe(
        map((res: any) => <any>res), 
    );
  }

  public getBookingPlan(payload: Booking): Observable<Plan>{
    return this.http.post(this.url + '/bookings/getPlan', {data: payload}, {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token()}}).pipe(
        map((res: any) => <Plan>res)
    );
  }

  public saveStop(code: string): Observable<any>{
    return this.http.get(this.url + '/saved/saveStop/' + code, {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token()}}).pipe(
        map((res: any) => <any>res), 
    );
  }

  public deleteStop(code: string): Observable<any>{
    console.log(code)
    return this.http.get(this.url + '/saved/deleteStop/' + code, {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token()}}).pipe(
        map((res: any) => <any>res), 
    );
  }

  public getSavedStops(): Observable<any>{
    return this.http.get(this.url + '/saved/getStops', {withCredentials: false, headers:{
      Authorization: 'Bearer ' + this.token()}}).pipe(
        map((res: any) => <string[]>res), 
    );
  }

  private token(){
    return JSON.parse(localStorage.getItem('token')!);
  }

}
