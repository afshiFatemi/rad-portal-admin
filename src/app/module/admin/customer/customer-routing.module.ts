import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { NewCustomerComponent } from './new-custmer/new-custmer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  //{
    // path: '', component: CustomerListComponent, children: [
    //   { path: 'customer-list', component: CustomerListComponent },
    //   { path: 'new-customer', component: NewCustomerComponent },
    //   { path: 'edit-customer/:marketingId/:countryId', component: EditCustomerComponent },
    // ],
  //},

  { path: '', component: CustomerListComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  { path: 'edit-customer/:marketingId/:countryId', component: EditCustomerComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
