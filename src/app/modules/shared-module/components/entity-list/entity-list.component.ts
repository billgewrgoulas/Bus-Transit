import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBus } from 'src/app/state/entities/bus.entity';
import { IStation } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { getRouteVeh } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  @Input() public module: string = '';

  public data$!: Observable<IBus[] | undefined>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    if(this.module === 'bus'){
      this.data$ = this.store.select(getRouteVeh);
    }

  }

}
