import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'dropdown-wrapper',
  templateUrl: './drop-down-wrapper.component.html',
  styleUrls: ['./drop-down-wrapper.component.css']
})
export class DropDownWrapperComponent implements OnInit {

  public module$!: Observable<any>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.module$ = this.route.data;
  }

}
