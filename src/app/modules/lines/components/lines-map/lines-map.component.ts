import { Component, OnInit } from '@angular/core';
import { LiveDataStore } from '../../state/live.data.store';
import { Observable, tap } from 'rxjs';
import { IArrival } from 'src/app/state/Entities/live.data';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'lines-map',
  templateUrl: './lines-map.component.html',
  styleUrls: ['./lines-map.component.css']
})
export class LinesMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
