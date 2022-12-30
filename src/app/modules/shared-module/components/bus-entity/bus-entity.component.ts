import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IArrival } from 'src/app/state/Entities/live.data';


@Component({
  selector: 'bus-entity',
  templateUrl: './bus-entity.component.html',
  styleUrls: ['./bus-entity.component.css'],
})
export class BusEntityComponent implements OnInit {

  @Input() public buses: IArrival[] = [];
  @Output() public onClick = new EventEmitter<number>();

  constructor(private dataShare: DataShareService) { }
  
  ngOnInit(): void {}

  public selectBus(bus: IArrival){
    this.dataShare.fly([bus.latitude, bus.longitude]);
  }

}
