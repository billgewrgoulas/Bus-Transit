import { Component, OnInit } from '@angular/core';
import { DirectionsStore } from '../../state/directions.store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { Store } from '@ngrx/store';
import { spinner } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'places-slider',
  templateUrl: './places-slider.component.html',
  styleUrls: ['./places-slider.component.css']
})
export class PlacesSliderComponent implements OnInit {

  public spinner$!: Observable<boolean>;
  public value: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.spinner$ = this.store.select(spinner);
  }

}
