import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'dashboard', loadChildren:
          () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'marketing', loadChildren:
          () => import('./marketing-office/marketing-office.module').then(m => m.MarketingOfficeModule)
      },
      {
        path: 'customer', loadChildren:
          () => import('./customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'country', loadChildren:
          () => import('./country/country.module').then(m => m.CountryModule)
      },
      {
        path: 'tour', loadChildren:
          () => import('./tour/tour.module').then(m => m.TourModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // declarations: [AdminComponent],
})
export class AdminRoutingModule { }
