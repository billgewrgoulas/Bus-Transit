import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap, Observable, throwError } from 'rxjs';
import { ILine, IRoute } from '../state/entities/dataInterfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly URL: string = 'http://telematics.oasa.gr/api/?act=';
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
    return this.http.get('http://localhost:3000/points/' + uri, this.options).pipe(map((res: any)=>{
      return res;
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

  public getRouteDetails(code: string): Observable<any>{
    return this.http.get(this.URL + 'webGetRoutes&p1=' + code, this.options).pipe(map((res: any)=>{
      return res.map((e: any)=>e.RouteCode);
    }), catchError((err)=>throwError(()=>new Error(err))))
  }

}
