import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreLocationModalPage } from './store-location-modal';

@NgModule({
  declarations: [
    StoreLocationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreLocationModalPage),
  ],
})
export class StoreLocationModalPageModule {}
