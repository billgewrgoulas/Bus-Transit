import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'sidebar-options',
  templateUrl: './sidebar-options.component.html',
  styleUrls: ['./sidebar-options.component.css']
})
export class SidebarOptionsComponent implements OnInit {

  public options: any[] = [
    {text: 'Lines', icon: 'route', desc: 'Display line information', link: ['lines', 'lines_load']},
    {text: 'Stops', icon: 'where_to_vote', desc: 'Display stop information', link: ['stops', 'stops_module']},
    {text: 'Trip planner', icon: 'departure_board', desc: 'Find and book routes', link: ['routes', 'trip_module']},
    {text: 'Saved information', icon: 'file_present', desc: 'Saved lines, stops...'},
    {text: 'Settings', icon: 'settings', desc: 'Application settings'}
  ];

  constructor(private router: Router, private msg: DataShareService) { }

  ngOnInit(): void {
    this.msg.clearLayers();
  }

  public onSelect(data: string[]){
    this.router.navigate([{ outlets: { sidebar: data[0] }}], {queryParams: {module: data[1]}});
  }

  public toggle(){
    this.msg.onToggle();
  }

}
