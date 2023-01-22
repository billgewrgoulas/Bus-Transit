import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as nav_actions from 'src/app/state/Actions/navigation.actions';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'input-field',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.css']
})
export class MainInputComponent implements OnInit {

  public mapBtn: boolean = false;

  @Input() public value: string = '';
  @Input() public placeholder: string = '';
  @Input() public icon: string = '';
  @Input() public type: string = '';
  @Input() public disabled: boolean = false;
  @Input() public mapLink: string[] = [];
  @Input() public dots: boolean = false;
  @Input() public saved: boolean = false;
  @Input() public code: string = '';
  @Input() public module: string = '';
  @Input() public title: string = '';

  @Output() public onType = new EventEmitter<string>();
  @Output() public save = new EventEmitter<string>();
  @Output() public remove = new EventEmitter<string>();

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mapButton();
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

  public onSave(){
    this.save.emit(this.code);
  }

  public onRemove(){
    this.remove.emit(this.code);
  }

  public map(){

    if(this.mapLink.length > 0){
      this.router.navigate([{ outlets: { sidebar: this.mapLink }}], {queryParams: {module: 'route_data'}});
    }

  }

  @HostListener('window:resize', ['$event'])
  private mapButton(){

    if(window.innerWidth > 500){
      this.mapBtn = false;
    }else{
      this.mapBtn = true;
    }

  }

}
