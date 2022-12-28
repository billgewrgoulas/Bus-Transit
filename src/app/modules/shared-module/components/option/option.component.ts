import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Output() public onSelect = new EventEmitter<string[]>();
  @Output() public save = new EventEmitter<string>();
  @Output() public remove = new EventEmitter<string>();

  @Input() public menu: boolean = false;
  @Input() public icon: string = '';
  @Input() public text: string = '';
  @Input() public desc: string = '';
  @Input() public saved: boolean = false;
  @Input() public data: string[] = [];

  constructor() { }

  ngOnInit(): void {}

  public onClick(){
    this.onSelect.emit(this.data);
  }

  public onSave(){
    this.save.emit(this.data[0]);
  }

  public onRemove(){
    this.remove.emit(this.data[0]);
  }

}
