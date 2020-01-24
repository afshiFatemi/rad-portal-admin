import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  tourArray = [];
  allTours: any;
  customerId;
  listTitle = 'New Tour List';
  constructor(private service: RestService ,
              private route: ActivatedRoute,
              private router: Router ) {
    this.route.params.subscribe(params => {
      this.customerId = params.customerId;
      console.log('this.customerId ' , this.customerId );
    });
  }

  ngOnInit() {
    this.getAllTour();
  }
 getAllTour() {
    this.service.getAllTour(this.customerId).subscribe((res: any) => {
      console.log('all |Tours ---> ' , res);
      this.allTours = res;
      this.tourArray = [];
      if (this.allTours) {
        this.tourArray = this.allTours.newTours;
       } else {
        this.tourArray = [];
   }
      this.listTitle = 'New Tour List';
    });
 }

  getArchiveTours() {
    this.tourArray = [];
    if (this.allTours ) {
      this.tourArray = this.allTours.archiveTours;
    } else {
      this.tourArray =[];
    }

    this.listTitle = 'Archive Tours List';
  }
  getNegotiatingTours() {
    this.tourArray = [];
    if (this.allTours ) {
      this.tourArray = this.allTours.negotiatingTours;
    } else {
      this.tourArray = [];
    }
    this.listTitle = 'Negotiating Tours List';
  }
  getNewTours() {
    this.tourArray = [];
    if (this.allTours) {
      this.tourArray = this.allTours.newTours;
    } else {
      this.tourArray = [];
    }
    this.listTitle = 'New Tours List';
  }
   addTourToArchiveTours( tourId) {
     this.service.addTourToArchiveTours(tourId).subscribe(
       res => {
         console.log('add Tour To Archive Tours response' , res);
         this.getAllTour();
       }
     );

   }
  deleteTour(tourId) {
    this.service.deleteSpecialTour(tourId).subscribe( res => {
      console.log('deleted');
      this.getAllTour();
    });
  }
}
