import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourListComponent } from './tour-list/tour-list.component';
import { TourComponent } from './tour/tour.component';
import { TourEditComponent } from './tour-edit/tour-edit.component';
import { TourTasksComponent } from './tour-tasks/tour-tasks.component';
import { ActionComponent } from './action/action.component';
import { TouristListTaskComponent } from './tourist-list-task/tourist-list-task.component';


const routes: Routes = [

  {
    path: '', component: TourComponent, children: [
      { path: 'tour-list', component: TourListComponent },
      { path: 'tour-tasks/:customerId/:tourId', component: TourTasksComponent },
      { path: 'action/:customerId/:tourId', component: ActionComponent },
      { path: 'tourist-list/:customerId/:tourId', component: TouristListTaskComponent },
      { path: 'tour-edit/:id', component: TourEditComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
