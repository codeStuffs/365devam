import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MyApp } from './app.component';
import { AppDataProvider } from '../providers/app-data/app-data';
import { Badge } from '@ionic-native/badge';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations   : [
    MyApp
  ],
  imports        : [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap      : [ IonicApp ],
  entryComponents: [
    MyApp
  ],
  providers      : [
    StatusBar,
    SplashScreen,
    AppDataProvider,
    Badge,
    LocalNotifications,
    ScreenOrientation,
    BackgroundMode,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
