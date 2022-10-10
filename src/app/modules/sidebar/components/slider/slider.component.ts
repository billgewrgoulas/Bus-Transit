import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnDestroy {

  public selectedTab: number = 0;
  public module$!: Observable<any>;
  private subscriber!: Subscription;
  
  constructor(private dataShare: DataShareService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriber = this.dataShare.tabObserver.subscribe(tab => this.selectedTab = tab);
    this.module$ = this.route.data;
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
