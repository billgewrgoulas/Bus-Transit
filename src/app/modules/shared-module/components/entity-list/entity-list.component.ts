import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  @Input() public module: string = '';

  public data$!: Observable<undefined>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    if(this.module === 'bus'){
      //this.data$ = this.store.select(getRouteVeh);
    }

  }

}
