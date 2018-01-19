import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { CanInfoPage } from '../can-info/can-info';

@NgModule({
  declarations: [
    AboutPage,
    
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
   
  ],
})
export class AboutPageModule {}
