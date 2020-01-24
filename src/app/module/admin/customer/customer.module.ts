import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NewCustomerComponent} from './new-custmer/new-custmer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import { CustomMaterialModule } from 'src/Shared/material-module/material-module';


@NgModule({
  declarations: [CustomerListComponent, NewCustomerComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomMaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
