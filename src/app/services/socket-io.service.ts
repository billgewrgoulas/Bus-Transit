import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io, Socket } from 'socket.io-client';
import { AppState } from '../state/Reducers/api-reducer';
import * as actions from '../state/Actions/api-calls.actions'
import * as socket from '../state/Actions/socketIO.actions';
import { filter, Subscription, take, tap } from 'rxjs';


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

  }

  public getBusUpdates(routeCode?: string){
    this.socket.emit('start-bus-updates', {routeCode: routeCode});
  }

  public cancelBusUpdates(){
    this.socket.emit('cancel-bus-updates');
  }

}
