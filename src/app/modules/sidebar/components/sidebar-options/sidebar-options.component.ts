import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar-options',
  templateUrl: './sidebar-options.component.html',
  styleUrls: ['./sidebar-options.component.css']
})
export class SidebarOptionsComponent implements OnInit {

  public options: any[] = [
    {text: 'Lines', icon: 'route', desc: 'Display line information', link: ['lines', 'lines_load']},
    {text: 'Find routes', icon: 'swap_vert', desc: 'Estimate the best route or bus', link: ['routes', 'stop_load']},
    {text: 'Closest stops', icon: 'where_to_vote', desc: 'Find closest stops and lines'},
    {text: 'Saved information', icon: 'file_present', desc: 'Saved lines, stops...'},
    {text: 'Recently searched', icon: 'folder_special', desc: 'Recent searches'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  public onSelect(data: string[]){
    this.router.navigate([{ outlets: { sidebar: data[0] }}], {queryParams: {module: data[1]}});
  }

}
