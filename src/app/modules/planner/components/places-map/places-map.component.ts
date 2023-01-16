import { Component, OnInit } from '@angular/core';
import { DirectionsStore } from '../../state/directions.store';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.css']
})
export class PlacesMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
