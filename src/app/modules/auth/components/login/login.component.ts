import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import * as nav_actions from 'src/app/state/Actions/navigation.actions';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';
import { clearState, getMsg } from '../../state/message.reducer';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials!: FormGroup;
  public authMsg$!: Observable<string>;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService,
    private auth: Store<Notification>
  ) { }

  ngOnInit(): void {
    this.credentials = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.auth.dispatch(clearState());
    this.authMsg$ = this.auth.select(getMsg);
  }

  public toggle(){
    this.msg.onToggle();
  }

  public back(){
    this.store.dispatch(nav_actions.arrowNavigation());
  }

  public errors(value: string, type: string): boolean{
    return this.credentials.controls[value].hasError(type);
  }

  public login(){
    if(!this.credentials.valid){
      confirm('Invalid fields');
    }else{

      const user = {
        email: this.credentials.value['email'],
        password: this.credentials.value['password']
      };

      this.store.dispatch(api_actions.login({data: user}));
    }
  }

}
