import { OnDestroy } from '@angular/core';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { slideAnimation } from 'src/app/route-animations';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [slideAnimation]
})
export class SideNavComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('wrapper') public wrapper: any;

  public flag: boolean = false;
  public dragPosition: any = {x: 0, y: 0};
  private el: any;
  private sub!: Subscription;

  constructor(
    private msg: DataShareService, 
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.msg.toggleObserver.subscribe(v => this.toggle());
  }

  ngAfterViewInit(): void {
    this.el = this.wrapper.nativeElement;
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  public prepareOutlet(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }

  public logInOut(type: string){
    this.toggle();
    this.router.navigate([{ outlets: { sidebar: ['auth', type] }}]);
  }

  public logout(){
    this.auth.removeUserInfo();
    this.home();
  }

  public home(){
    this.toggle();
    this.router.navigate(['']);
  }

  public get user(){
    return this.auth.getUserInfo();
  }

  public get authenticated(){
    return this.auth.isAuthenticated();
  }

  @HostListener('window:resize', ['$event'])
  public dragEnd($e: any){

    if($e.type == 'resize'){
      this.dragPosition = {x: 0, y: 0};
      setTimeout(() => this.flag = false, 100);
      return;
    }

    const width: number = Math.floor(this.el.offsetWidth / 4);
    const distX: number = Math.abs($e.distance.x);

    if(distX <= width && this.dragPosition.x == 0){
      this.dragPosition = {x: 0, y: 0};
      setTimeout(() => this.flag = false, 100);
    }else if(distX > width && this.dragPosition.x != 0){
      this.dragPosition = {x: 0, y: 0};
      setTimeout(() => this.flag = false, 100);
    }else if(distX > width && this.dragPosition.x == 0){
      this.dragPosition = {x: width * 2, y: 0};
    }else if(distX <= width){
      this.dragPosition = {...this.dragPosition};
    }

  }

  public onFocusOut($e: any){
    if(this.dragPosition.x != 0){
      this.toggle();
    }
  }

  private toggle(){
    const width: number = Math.floor(this.el.offsetWidth / 2);

    if(this.dragPosition.x == 0){
      this.flag = true;
      this.dragPosition = {x: width, y: 0};
    }else{
      this.dragPosition = {x: 0, y: 0};
      setTimeout(() => this.flag = false, 100);
    }

  }
}
