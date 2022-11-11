import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'stop-slider',
  templateUrl: './stop-slider.component.html',
  styleUrls: ['./stop-slider.component.css']
})
export class StopSliderComponent implements OnInit, OnDestroy {

  public selectedTab: number = 0;
  public tabSubscriber$!: Subscription;

  constructor(private msg: DataShareService) { }

  ngOnInit(): void {
    this.tabSubscriber$ = this.msg.tabObserver.subscribe(tab => this.selectedTab = tab);
  }

  ngOnDestroy(): void{
    this.tabSubscriber$.unsubscribe();
  }



}
