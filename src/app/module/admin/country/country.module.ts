import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NewCountryComponent, CountryListComponent, EditCountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
