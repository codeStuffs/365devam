import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanInfoPage } from './can-info';

@NgModule({
  declarations: [
    CanInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CanInfoPage),
  ]
})
export class CanInfoPageModule {}
