import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import * as nav_actions from 'src/app/state/Actions/navigation.actions';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';
import { AppState } from 'src/app/state/Reducers/api-reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials!: FormGroup;

  constructor(private store: Store<AppState>, private msg: DataShareService) { }

  ngOnInit(): void {
    this.credentials = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
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
