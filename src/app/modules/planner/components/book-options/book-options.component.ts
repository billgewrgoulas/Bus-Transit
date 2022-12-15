import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'book-options',
  templateUrl: './book-options.component.html',
  styleUrls: ['./book-options.component.css']
})
export class BookOptionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public tripPlanner(): void{
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trip', 'options'] }}], {queryParams: {module: 'trip_options'}});
  }

}
