import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  tourId;
  customerId;
  constructor(private service: RestService ,
              private route: ActivatedRoute,
              private router: Router ) {
    this.route.params.subscribe(params => {
      this.tourId = params.tourId;
      this.customerId = params.customerId;
      console.log('this.tourId ' , this.tourId );
      console.log('this.customerId ' , this.customerId );
    });
  }

  ngOnInit() {
    this.service.getSpecialCountryByTour(this.customerId , this.tourId)
      .subscribe(res => {
        console.log('get specific tour -->' , res);
        }
      );
  }

}
