import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'entity-component',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  ngOnInit(): void {
    
  }

  // public buses$!: Observable<IBus[] | undefined>;
  // public stop$!: Observable<IStation | undefined>;

  // @Input() public module: string = '';

  // constructor(private store: Store<AppState>) { }

  // ngOnInit(): void {

  //   if(this.module === 'bus'){
  //     this.buses$ = this.store.select(getRouteVeh);
  //   }else if(this.module === 'stop'){
  //     this.stop$ = this.store.select(getActiveStation);
  //   }

  // }

  // public focus(busCode: string){
  //   this.store.dispatch(actions.requests.selectBus({busCode: busCode}));
  // }

}
