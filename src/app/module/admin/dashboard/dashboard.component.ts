import {Component, OnInit} from '@angular/core';

import masonry from '../../../../assets/scripts/masonry';
 import '../../../../assets/scripts/charts';
 import skycons from '../../../../assets/scripts/skycons';
 import vectorMaps from '../../../../assets/scripts/vectorMaps/index.js';
 import '../../../../assets/scripts/chat';
 import datatable from '../../../../assets/scripts/datatable';
 import datepicker from '../../../../assets/scripts/datepicker';
 import email from '../../../../assets/scripts/email';
 import fullcalendar from '../../../../assets/scripts/fullcalendar';
 import googleMaps from '../../../../assets/scripts/googleMaps';
 import utils from '../../../../assets/scripts/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor() {}
  ngOnInit() {
    masonry();
    skycons();
    // vectorMaps();
     datatable();
     datepicker();
     email();
     fullcalendar();
     googleMaps();
     utils();
  }
}
