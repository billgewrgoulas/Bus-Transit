import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io, Socket } from 'socket.io-client';
import { AppState } from '../state/Reducers/api-reducer';
import * as select_actions from '../state/Actions/select.actions';

interface msg{
  value: number,
  trip_ids: number[]
};

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  private socket!: Socket;

  constructor(private store: Store<AppState>) { 
    this.socket = io('http://localhost:3000');

    this.socket.on('accepted', (data)=>{
      console.log(data.msg);
    });

    this.socket.on('update', (data: msg) => {
      this.store.dispatch(select_actions.updateOccupancy({
        value: data.value, trip_ids: data.trip_ids
      }));
    });

  }

}
