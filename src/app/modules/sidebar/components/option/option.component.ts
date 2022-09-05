import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Input() public icon: string = '';
  @Input() public text: string = '';
  @Input() public desc: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(option: string){
    this.router.navigate([{ outlets: { sidebar: ['lines'] } }]);
  }

}
