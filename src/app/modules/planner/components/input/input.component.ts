import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DirectionsStore } from 'src/app/modules/planner/state/directions.store';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

  public obs$!: Observable<any>;
  public disabled: boolean = false;

  constructor(
    private local: DirectionsStore,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.obs$ = this.local.getNames();
  }

  public swap(){
    this.local.swapPoints();
  }

  public places(dest: string){
    this.router.navigate([{ outlets: 
      { sidebar: [ 'routes', 'places', dest] }}], 
      {queryParams: {module: 'places'}
    });
  }

  public checkUrl(){
    const url: string = this.router.url;
    if(url.includes('module=trips')){
      this.disabled = true;
    }else if(url.includes('module=trip_details')){
      this.disabled = true;
    }else if(url.includes('module=trip_map')){
      this.disabled = true;      
    }else{
      this.disabled = false;
    }
  }

}
