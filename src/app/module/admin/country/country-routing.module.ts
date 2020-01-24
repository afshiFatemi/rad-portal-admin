import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryListComponent } from './country-list/country-list.component';
import { NewCountryComponent } from './new-country/new-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';

const routes: Routes = [
  {
    path: '', component: CountryListComponent, children: [
      { path: 'country-list', component: CountryListComponent },
      { path: 'new-country', component: NewCountryComponent },
      { path: 'edit-country/:id', component: EditCountryComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
