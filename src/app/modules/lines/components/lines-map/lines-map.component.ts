import { Component, OnInit } from '@angular/core';
import { LiveDataStore } from '../../state/live.data.store';
import { Observable, tap } from 'rxjs';
import { IArrival } from 'src/app/state/Entities/live.data';
import { DataService } from 'src/app/services/data.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'lines-map',
  templateUrl: './lines-map.component.html',
  styleUrls: ['./lines-map.component.css']
})
export class LinesMapComponent implements OnInit {

  public buses$!: Observable<IArrival[]>;

  constructor(private localStore: LiveDataStore, private msg: DataShareService) { }

  ngOnInit(): void {
    this.buses$ = this.localStore.getBusLocations().pipe(tap(v => this.msg.sendBusStatus(v)));
  }

}
