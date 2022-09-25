import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-options',
  templateUrl: './sidebar-options.component.html',
  styleUrls: ['./sidebar-options.component.css']
})
export class SidebarOptionsComponent implements OnInit {

  public options: any[] = [
    {text: 'Lines', icon: 'route', desc: 'Display line information'},
    {text: 'Best Route', icon: 'swap_vert', desc: 'Get the best line'},
    {text: 'Closest stops', icon: 'where_to_vote', desc: 'Find closest stops and lines'},
    {text: 'Saved stops', icon: 'file_present', desc: 'Saved lines, stops...'},
    {text: 'Recently searched', icon: 'folder_special', desc: 'Recent searches'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
