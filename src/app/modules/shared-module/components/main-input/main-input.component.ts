import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as nav_actions from 'src/app/state/Actions/navigation.actions';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'input-field',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.css']
})
export class MainInputComponent implements OnInit {

  @Input() public value: string = '';
  @Input() public placeholder: string = '';
  @Input() public icon: string = '';
  @Input() public type: string = '';
  @Input() public disabled: boolean = false;

  @Output() public onType = new EventEmitter<string>();

  constructor(private store: Store<AppState>, private msg: DataShareService) { }

  ngOnInit(): void {
  }

  public send(){
    this.onType.emit(this.value);
  }

  public clear(){
    this.value = '';
    this.send();
  }

  public goBack(){
    this.store.dispatch(nav_actions.arrowNavigation());
  }

  public toggle(){
    this.msg.onToggle();
  }

}
