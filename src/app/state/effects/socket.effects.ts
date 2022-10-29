
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, tap, withLatestFrom } from "rxjs";
import * as actions from '../actions/socketIO.actions';
import { AppState } from "../reducers/api-reducer";
import { SocketIOService } from "src/app/services/socket-io.service";
import { currentRoute } from "../selectors/appState.selectors";

@Injectable()
export class SocketEffects{

    private arrivalTimer: NodeJS.Timer | undefined;

    constructor(private io: SocketIOService, private actions$: Actions, private store: Store<AppState>){}

   

}
