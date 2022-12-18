import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as nav_actions from 'src/app/state/Actions/navigation.actions';
import { AppState } from 'src/app/state/Reducers/api-reducer';

@Component({
  selector: 'double-input',
  templateUrl: './double-input.component.html',
  styleUrls: ['./double-input.component.css']
})
export class DoubleInputComponent implements OnInit {

  @Input() public start: string = '';
  @Input() public end: string = '';
  @Input() public disabled: boolean = false;
  @Input() public startPlaceholder: string = 'search start';
  @Input() public endPlaceholder: string = 'search end';

  @Output() public clicked = new EventEmitter<string>();
  @Output() public swap = new EventEmitter<void>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  public navigate(){
    this.store.dispatch(nav_actions.arrowNavigation());
  }

  public swapPoints(){
    this.swap.next();
  }

  public onClick(data: string){
    if(!this.disabled){
      this.clicked.next(data);
    }
  }

}
