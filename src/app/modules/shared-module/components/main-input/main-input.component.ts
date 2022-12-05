import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-input-field',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.css']
})
export class MainInputComponent implements OnInit {

  public value: string = '';

  @Input() public placeholder: string = '';
  @Input() public icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
