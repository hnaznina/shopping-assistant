import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ItemPage } from '../pages/item/item';
import { MartPage } from '../pages/mart/mart';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

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
    MartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ItemPage,
    MartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    Toast,
    DatabaseProvider,
    SQLitePorter,
  ]
})
export class AppModule { }
