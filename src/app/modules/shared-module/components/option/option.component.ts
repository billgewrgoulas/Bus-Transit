import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Output() public onSelect = new EventEmitter<string[]>();

  @Input() public icon: string = '';
  @Input() public text: string = '';
  @Input() public desc: string = '';
  @Input() public data: string[] = [];

  constructor() { }

  ngOnInit(): void {}

  public onClick(){
    this.onSelect.emit(this.data);
  }

}
