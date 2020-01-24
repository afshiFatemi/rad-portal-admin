import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingOfficeListComponent } from './marketing-office-list/marketing-office-list.component';
import { MarketingOfficeEditComponent } from './marketing-office-edit/marketing-office-edit.component';
import { MarketingOfficeAddComponent } from './marketing-office-add/marketing-office-add.component';

const routes: Routes = [
  // {
  //   path: '', component: MarketingOfficeListComponent, children: [
  //     { path: 'marketing-office-list', component: MarketingOfficeListComponent },
  //     { path: 'new-marketing-office', component: MarketingOfficeAddComponent },
  //     { path: 'edit-marketing-office/:id', component: MarketingOfficeEditComponent },
  //   ]
  // },
     {path: '', component: MarketingOfficeListComponent},
     { path: 'marketing-office-list', component: MarketingOfficeListComponent },
     { path: 'new-marketing-office', component: MarketingOfficeAddComponent },
    { path: 'edit-marketing-office/:id', component: MarketingOfficeEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingOfficeRoutingModule { }
