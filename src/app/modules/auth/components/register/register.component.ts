import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as nav_actions from 'src/app/state/Actions/navigation.actions';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { clearState, getMsg, getNotificationState } from '../../state/message.reducer';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public credentials!: FormGroup;
  public authMsg$!: Observable<string>;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private authStore: Store<Notification>
  ) { }

  ngOnInit(): void {
    this.credentials = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    this.authStore.dispatch(clearState());
    this.authMsg$ = this.authStore.select(getMsg);
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

  public register(){
    if(!this.credentials.valid){
      console.log('invalid');
    }else{

      const user = {
        name: this.credentials.value['name'],
        email: this.credentials.value['email'],
        password: this.credentials.value['password']
      };

      this.store.dispatch(api_actions.register({credentials: user}));
    }
  }

}
