import { Component, OnInit } from '@angular/core';



 import popover from '../../../assets/scripts/popover';
 import scrollbar from'../../../assets/scripts/scrollbar';
 import search from '../../../assets/scripts/search';
 import sidebar from '../../../assets/scripts/sidebar';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    popover();
    scrollbar();
    search();
    sidebar();
    // sidebar();
  }

}
