import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourRoutingModule } from './tour-routing.module';
import { TourListComponent } from './tour-list/tour-list.component';
import { TourComponent } from './tour/tour.component';
import { TourEditComponent } from './tour-edit/tour-edit.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import { TourTasksComponent } from './tour-tasks/tour-tasks.component';
import { ActionComponent } from './action/action.component';
import { TouristListTaskComponent } from './tourist-list-task/tourist-list-task.component';


@NgModule({
  declarations: [TourListComponent, TourComponent, TourEditComponent, TourTasksComponent, ActionComponent, TouristListTaskComponent],
  imports: [
    CommonModule,
    TourRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class TourModule { }
