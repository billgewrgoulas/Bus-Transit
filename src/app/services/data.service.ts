import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap, Observable, throwError } from 'rxjs';
import { IArrival, IArrivalInfo, ILine, IRoute } from '../state/entities/dataInterfaces';

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

  public getAllLines(uri: string): Observable<any>{
    return this.http.get(this.url + uri, this.options).pipe(map((res: any) => {
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getRouteDetailsAndStops(uri: string): Observable<IRoute>{
    return this.http.get(this.url+ 'path/' + uri, this.options).pipe(map((res: any)=>{
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getRouteDetails(code: string): Observable<any>{
    return this.http.get(this.url + 'routeDetails/' + code, this.options).pipe(map((res: any)=>{
      return res.map((e: any)=>e.RouteCode);
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getStationArrivals(stationCode: string): Observable<IArrival>{
    return this.http.get<IArrivalInfo[]>(this.url + 'arrivals/' + stationCode, this.options).pipe(map((res: any)=>{
      return {stationCode: stationCode, arrivalInfo: res};
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

}
