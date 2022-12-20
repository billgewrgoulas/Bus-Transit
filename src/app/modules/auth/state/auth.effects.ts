import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as api_actions from "src/app/state/Actions/api-calls.actions";
import { tap } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects{

    constructor(private actions$: Actions, private router: Router){}

    loginSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.loginSuccess, api_actions.registerSuccess),
            tap((action) => {
                localStorage.setItem('token', JSON.stringify(action.data.access_token));
                this.router.navigate(['']);
            })
        ), {dispatch: false}
    );

    logout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(api_actions.logOut),
            tap(() => {
                localStorage.clear();
                this.router.navigate(['']);
            })
        ), {dispatch: false}
    );

}
