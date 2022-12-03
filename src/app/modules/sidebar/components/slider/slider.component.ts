import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnDestroy {

  public selectedTab: number = 0;
  private subscriber!: Subscription;
  
  constructor(private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.subscriber = this.dataShare.tabObserver.subscribe(tab => this.selectedTab = tab);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
