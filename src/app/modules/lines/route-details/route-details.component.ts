import { Component, OnInit } from '@angular/core';
import { LiveDataStore } from 'src/app/state/LocalStore/live.data.store';

@Component({
  selector: 'route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css'],
  providers: [LiveDataStore]
})
export class RouteDetailsComponent implements OnInit {

  constructor(private liveStore: LiveDataStore) { }

  ngOnInit(): void {
  }

}
