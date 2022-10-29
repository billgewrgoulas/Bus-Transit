import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ILine } from '../state/entities/line.entity';
import { IRoute, IRouteInfo } from '../state/entities/route.entity';
import { IArrival } from '../state/entities/live.data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly url: string = 'http://localhost:3000/transitAPI/';
  private readonly liveUri: string = 'http://localhost:3000/live/';
  private readonly options: Object; 

  constructor(private http: HttpClient) { 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.options = {headers: headers, withCredentials: false};
  }

  public getAllLines(): Observable<ILine[]>{
    return this.http.get(this.url + 'lines', this.options).pipe(
      map((res: any) => <ILine[]>res),
      catchError((err) => throwError(()=>new Error(err))));
  }

  public getLineRoutes(id: string): Observable<IRoute[]>{
    return this.http.get(this.url + 'lineRoutes/' + id, this.options).pipe(
      map((res: any) => <IRoute[]>res),
      catchError((err) => throwError(()=>new Error(err)))
    );
  }

  public getRouteDetails(code: string): Observable<IRouteInfo>{
    return this.http.get(this.url + 'routeInfo/' + code, this.options).pipe(
      map((res: any) => <IRouteInfo>res), 
      catchError((err) => throwError(()=>new Error(err))))
  }

  public getStopArrivals(code: string): Observable<IArrival[]>{
    return this.http.get(this.liveUri + 'stops/' + code, this.options).pipe(
      map((res: any) => <IArrival[]>res), 
      catchError((err) => throwError(()=>new Error(err))))
  }

}
