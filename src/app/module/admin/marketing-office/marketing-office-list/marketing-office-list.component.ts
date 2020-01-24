import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import {animate, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-marketing-office-list',
  templateUrl: './marketing-office-list.component.html',
  styleUrls: ['./marketing-office-list.component.scss'],
  animations: [
    trigger(
      'fadeAnimation', [
        transition(
          ':enter',
          [
            style(
              {opacity: 0}
            ),
            animate(
              '400ms',
              style(
                {opacity: 1}
              )
            )
          ]
        ),
        transition(
          ':leave',
          [
            style(
              {opacity: 1}
            ),
            animate(
              '400ms',
              style(
                {opacity: 0}
              )
            )
          ]
        )
      ]
    )
  ]
})

export class MarketingOfficeListComponent implements OnInit {
  marketingArray = [];
  CustomerModalFlag = false;
  selectedCountry;
  selectedMarketingId;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
     'marketingName', 
     'agent',
     'email',
     'phoneNumber',
     'country',
     'customers',
     'operation'
  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize: number;
  pageIndex: number;
  
  constructor(private services: RestService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllMarketing();
  }

  getAllMarketing() {
    return this.services.getAllMarketing().subscribe( (res: any) =>{
      console.log('get all Marketing ->' , res);
      debugger
      this.marketingArray = res;
    //  this.dataSource = res;
      this.dataSource = new MatTableDataSource(res);
      //this.paginator.length = res.Total;
      //this.paginator.pageSize = 10;
      //this.paginator.length = res.Total;
     // this.pageIndex = 0;
    });
  }

  // paginatorEvent(event) {
  //   this.services.getAllMarketing(event.pageIndex + 1, event.pageSize)
  //     .subscribe(res => {
  //       this.pageSize = event.pageSize;
  //       this.paginator.length = res.Total;
  //       this.pageIndex = event.pageIndex + 1;
  //       this.dataSource = new MatTableDataSource(res.DataList);
  //     });
  // }



  deleteMarketing(marketingId) {
    return this.services.deleteSpecialMarketing(marketingId).subscribe((res) => {
      // console.log( 'delete marketing --->'  , res);
      this.getAllMarketing();
    } , (error) => {
      alert(error.error);
    });
  }

  Customers( toggle , marketing , country) {
    this.CustomerModalFlag = toggle;
    if (toggle) {
      this.selectedMarketingId = marketing.id;
      console.log('selectedMarketingId' , this.selectedMarketingId);
      this.selectedCountry = country;
      console.log('selectedCountry' , this.selectedCountry);
    }
  }
  
  deleteCustomer(customerId) {
    this.services.deleteSpecialCustomer(customerId).subscribe(res => {
      console.log('response -->' , res);
      this.getAllMarketing();
    } , error => {
      console.log('error->' , error.error);
      alert(error.error.message);
    });
  }

}
