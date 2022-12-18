import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

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

  @Output() public e = new EventEmitter<any>();
  @Output() public save = new EventEmitter<any>();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public onClick($e: any){
    this.e.emit(this.data);
  }

  public get authenticated(){
    return this.auth.isAuthenticated();
  }

  public onSave(){
    this.save.emit(this.data);
  }

}
