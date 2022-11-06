import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers/api-reducer';
import * as api_actions from '../../../../state/actions/api-calls.actions';
import * as navigation from '../../../../state/actions/navigation.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  public start: string = '';
  public end: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  public swap(){
    const temp: string = this.start;
    this.start = this.end;
    this.end = temp;
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

}
