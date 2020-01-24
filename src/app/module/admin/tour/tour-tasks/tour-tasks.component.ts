import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tour-tasks',
  templateUrl: './tour-tasks.component.html',
  styleUrls: ['./tour-tasks.component.scss']
})
export class TourTasksComponent implements OnInit {
  tourId;
  customerId
  constructor(private service: RestService ,
              private route: ActivatedRoute,
              private router: Router ) {
    this.route.params.subscribe(params => {
      this.tourId = params.tourId;
      this.customerId = params.customerId;
      console.log('this.tourId' , this.tourId );
      console.log('this.customerId' , this.customerId );
    });
  }

  ngOnInit() {

  }

}
