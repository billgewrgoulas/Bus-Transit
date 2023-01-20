import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.css']
})
export class DropdownOptionComponent implements OnInit {

  @Input() public text: string = '';
  @Input() public details: string = '';
  @Input() public mentos: string[] = [];
  @Input() public data: any;
  @Input() public flex: boolean = true;

  @Output() public e = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClick($e: any){
    this.e.emit(this.data);
  }

}
