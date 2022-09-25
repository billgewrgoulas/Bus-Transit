import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io, Socket } from 'socket.io-client';
import { AppState } from '../state/reducers/api-reducer';
import * as actions from '../state/actions/api-calls.actions'
import * as socket from '../state/actions/socketIO.actions';
import { filter, Subscription, take, tap } from 'rxjs';
import { routeStopCodes } from '../state/selectors/appState.selectors';
import { IArrival } from '../state/entities/arival.entity';
import { IBus, IRouteVeh } from '../state/entities/bus.entity';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  private socket: Socket;

  constructor(private store: Store<AppState>) { 
    this.socket = io('http://localhost:3000');
  }

  public setupSocketConnection() {

    this.socket.on('accepted', (data)=>{
      console.log(data.msg);
    });

    this.socket.on('update-arrivals', (data: IArrival[])=>{
      data.forEach((arrival) => {
        this.store.dispatch(actions.requests.getStationsArrivalsSuccess({data: arrival}));
      });
    });

    this.socket.on('bus-updates-fetched', (data: IRouteVeh)=>{
      this.store.dispatch(socket.SocketActions.busLocationsUpdates({data: data}));
    });

  }

  public updateAll(){
    this.store.select(routeStopCodes).pipe(
      filter(stopCodes => stopCodes.length > 0),
      take(1)
    ).subscribe(stopCodes => {
      this.socket.emit('update-arrivals', {stopCodes: stopCodes});
    });
  }

  public getBusUpdates(routeCode?: string){
    this.socket.emit('start-bus-updates', {routeCode: routeCode});
  }

  public cancelBusUpdates(){
    this.socket.emit('cancel-bus-updates');
  }

}
