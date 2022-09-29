import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnDestroy {

  public selectedTab: number = 0;
  private subscriber: Subscription | undefined;

  constructor(private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.subscriber = this.dataShare.tabObserver.subscribe(tab => this.selectedTab = tab);
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

}
