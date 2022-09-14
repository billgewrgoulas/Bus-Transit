import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io, Socket } from 'socket.io-client';
import { IArrival, IBus } from '../state/entities/dataInterfaces';
import { AppState } from '../state/reducers/api-reducer';
import * as actions from '../state/actions/api-calls.actions'
import { selectedStops } from '../state/selectors/appState.selectors';
import { filter, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  private socket: Socket;
  private subscription!: Subscription;

  constructor(private store: Store<AppState>) { 
    this.socket = io('http://localhost:3000');
  }

  public setupSocketConnection() {

    this.socket.on('accepted', (data)=>{
      console.log(data.msg);
    });

    this.socket.on('update-arrivals', (data: IArrival[])=>{
      data.forEach((arrival) => {
        this.store.dispatch(actions.requests.getStationsArrivalsSuccess({data: arrival}))
      });
    });

    this.socket.on('bus-updates-fetched', (data: any)=>{
      console.log(data);
    });

  }

  public updateAll(){
    this.subscription = this.store.select(selectedStops).pipe(
      filter(stopCodes => stopCodes.length > 0),
    ).subscribe(stopCodes => {
      this.socket.emit('update-arrivals', {stopCodes: stopCodes});
      this.subscription.unsubscribe();
    });
  }

  public getBusUpdates(routeCode: string){
    this.socket.emit('start-bus-updates', {routeCode: routeCode});
  }

  public cancelBusUpdates(){
    this.socket.emit('cancel-bus-updates');
  }

}
