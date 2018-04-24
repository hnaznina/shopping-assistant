import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ItemPage } from '../pages/item/item';
import { MartPage } from '../pages/mart/mart';
import { StorePage } from '../pages/store/store';
import { StoreLocationModalPage } from '../pages/store-location-modal/store-location-modal';

import { ItemSearchPipe } from '../pipes/item-search/item-search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

//Google Map
import { AgmCoreModule } from '@agm/core';

//GeoLocation
import { Geolocation } from '@ionic-native/geolocation';

//Database provider
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ItemPage,
    MartPage,
    StorePage,
    StoreLocationModalPage,
    ItemSearchPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCgCP78arh0qyxLGqBV4G7-aBrCUp72bsc",
      libraries: ["places"]
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ItemPage,
    MartPage,
    StorePage,
    StoreLocationModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    Toast,
    DatabaseProvider,
    SQLitePorter,
    Geolocation
  ]
})
export class AppModule { }
