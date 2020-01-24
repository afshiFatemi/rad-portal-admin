import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import { MatTableDataSource,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers : any = [];
  CustomerModalFlag = false;
  selectedCountry;
  selectedMarketingId;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'companyName', 
    'agent', 
    'marketingName', 
    'email',
    'phoneNumber',
    'country',
    'operation'
  ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize: number;
  pageIndex: number;

  constructor(
    private services: RestService
    ) 
    { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllCustomer();
  }
  
  getAllCustomer() {
    return this.services.getAllCustomer().subscribe( (res: any) =>{
      debugger
      this.customers = res;
      this.dataSource = res;
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

  deleteCustomer(customerId) {
    this.services.deleteSpecialCustomer(customerId).subscribe(res => {
      console.log('response -->' , res);
      this.getAllCustomer();
    } , error => {
      console.log('error->' , error.error);
      alert(error.error.message);
    });
  }
}
