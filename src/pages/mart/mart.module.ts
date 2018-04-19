import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MartPage } from './mart';

@NgModule({
  declarations: [
    MartPage,
  ],
  imports: [
    IonicPageModule.forChild(MartPage),
  ],
})
export class MartPageModule {}
