import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingOfficeRoutingModule } from './marketing-office-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { MarketingOfficeListComponent } from './marketing-office-list/marketing-office-list.component';
import { MarketingOfficeEditComponent } from './marketing-office-edit/marketing-office-edit.component';
import { CustomMaterialModule } from 'src/Shared/material-module/material-module';
import { MarketingOfficeAddComponent } from './marketing-office-add/marketing-office-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [MarketingOfficeAddComponent, MarketingOfficeListComponent, MarketingOfficeEditComponent],
  imports: [
    CommonModule,
    MarketingOfficeRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule,
    FormsModule
  ]
})
export class MarketingOfficeModule { }
