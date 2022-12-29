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
    {text: 'Lines', icon: 'route', desc: 'Line information', link: ['lines', 'lines_load']},
    {text: 'Stops', icon: 'where_to_vote', desc: 'Stop information', link: ['stops', 'stops_module']},
    {text: 'Trip planner', icon: 'directions', desc: 'Book trips', link: ['routes', 'trip_module']},
    {text: 'Bookings', icon: 'departure_board', desc: 'Booked trips', link: [[ 'routes', 'bookings'], 'trip_options']},
    {text: 'Saved information', icon: 'file_present', desc: 'Saved lines, stops...'},
  ];

  constructor(private router: Router, private msg: DataShareService) { }

  ngOnInit(): void {
    this.msg.clearLayers();
  }

  public onSelect(data: string[] | string[][]){
    this.router.navigate([{ outlets: { sidebar: data[0] }}], {queryParams: {module: data[1]}});
  }

  public toggle(){
    this.msg.onToggle();
  }

}
