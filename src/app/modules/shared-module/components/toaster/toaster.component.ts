import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'toaster-component',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit, OnDestroy, OnChanges {

  public flag: boolean = false;
  public text: string = '';
  private sub!: Subscription;

  @Input() public msg$: Subject<string> | undefined;
  @Input() public msg: string = '';

  constructor() { }

  ngOnInit(): void {
    if(this.msg$){
      this.sub = this.msg$.subscribe({next: (v) => this.start(v)});
    }
  }

  ngOnDestroy(): void {
    if(this.msg$){
      this.sub.unsubscribe();
    }
  }

  ngOnChanges(): void{
    if(this.msg != ''){
      this.start(this.msg);
    }
  }

  public start(msg: string): void {
    this.text = msg;
    this.flag = true;
    setTimeout(() => this.flag = false, 1000);
  }

}
