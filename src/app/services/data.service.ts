import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap, Observable, throwError } from 'rxjs';
import { IArrival, IArrivalInfo, ILine, IRoute } from '../state/entities/dataInterfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly URL: string = 'https://telematics.oasa.gr/api/?act=';
  private readonly options: Object; 

  constructor(private http: HttpClient) { 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.options = { headers: headers, withCredentials: false };
  }

  public getAllLines(uri: string): Observable<any>{
    return this.http.get(this.URL + uri, this.options).pipe(map((res: any) => {
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getRouteDetailsAndStops(uri: string): Observable<IRoute>{
    return this.http.get('http://localhost:3000/oasa/path/' + uri, this.options).pipe(map((res: any)=>{
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getRouteDetails(code: string): Observable<any>{
    return this.http.get(this.URL + 'webGetRoutes&p1=' + code, this.options).pipe(map((res: any)=>{
      return res.map((e: any)=>e.RouteCode);
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getStationArrivals(stationCode: string): Observable<IArrival>{
    return this.http.get<IArrivalInfo[]>('http://localhost:3000/oasa/arrivals/' + stationCode, this.options).pipe(map((res: any)=>{
      return {stationCode: stationCode, arrivalInfo: res};
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

}
