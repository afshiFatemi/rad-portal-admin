import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnumToArrayPipe} from './enum-pipe';

@NgModule({
  declarations: [
    EnumToArrayPipe
  ],
  imports: [
    CommonModule,
  ],

})
export class SharedModule {
  private static TranslateLoader: any;
}
