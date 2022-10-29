import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import * as select_actions from '../../../../state/actions/select.actions';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() public stop!: IStop;
  @Input() public isLast: boolean = false;

  constructor(private store: Store<AppState>, private dataShare: DataShareService) { }

  ngOnInit(): void {

  }

  public selectStop(){
    this.store.dispatch(select_actions.selectStop({code: this.stop.code}));
    this.dataShare.slide(2);
  }

}
