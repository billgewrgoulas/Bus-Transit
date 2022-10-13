import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap, Observable, throwError } from 'rxjs';
import { IArrival, IArrivalDetails } from '../state/entities/arival.entity';
import { IRouteVeh } from '../state/entities/bus.entity';
import { ISchedule } from '../state/entities/schedule.entity';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly url: string = 'http://localhost:3000/oasa/';
  private readonly options: Object; 

  constructor(private http: HttpClient) { 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.options = { headers: headers, withCredentials: false };
  }

  public getArrivalUpdates(stopCodes: string[]): Observable<any>{
    return this.http.post(this.url + 'update-arrivals', stopCodes, this.options).pipe(map((res: any)=>{
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getBusLocations(routeCode: string): Observable<IRouteVeh>{
    return this.http.get(this.url + 'bus-locations/' + routeCode, this.options).pipe(map((res: any)=>{
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getAllLines(uri: string): Observable<any>{
    return this.http.get(this.url + uri, this.options).pipe(map((res: any) => {
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getRouteDetailsAndStops(uri: string): Observable<any>{
    return this.http.get(this.url+ 'path/' + uri, this.options).pipe(map((res: any)=>{
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getLineRoutes(lineCode: string): Observable<any>{
    return this.http.get(this.url + 'routeDetails/' + lineCode, this.options).pipe(
      catchError((err)=>throwError(()=>new Error(err)))
    );
  }

  public getSchedule(lineCode?: string, ml?: string, sdc?: string): Observable<ISchedule>{
    const data = {lineCode: lineCode, ml: ml, sdc: sdc};
    return this.http.post<ISchedule>(this.url + 'schedule', data, this.options).pipe(
      catchError((err)=>throwError(()=>new Error(err)))
    );
  }

  public getStationArrivals(stationCode: string): Observable<IArrival>{
    return this.http.get<IArrivalDetails[]>(this.url + 'arrivals/' + stationCode, this.options).pipe(
      map((res)=> res ? res : []), map((res: any)=>{
        return {stop_code: stationCode, arrivalDetails: res};
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

}
