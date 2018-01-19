import { Component } from '@angular/core';
import { App, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { AboutPage } from '../pages/about/about';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BackgroundMode } from '@ionic-native/background-mode';
//import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';
  
  months = [
    {
      month: 'Ocak', id: 0
    },
    {
      month: 'Şubat', id: 1
    },
    {
      month: 'Mart', id: 2
    },
    {
      month: 'Nisan', id: 3
    },
    {
      month: 'Mayıs', id: 4
    },
    {
      month: 'Haziran', id: 5
    },
    {
      month: 'Temmuz', id: 6
    },
    {
      month: 'Ağustos', id: 7
    },
    {
      month: 'Eylül', id: 8
    },
    {
      month: 'Ekim',
      id   : 9
    },
    {month: 'Kasım', id: 10},
    {month: 'Aralık', id: 11}
  ];
  
  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
              public events: Events, public appCtrl: App,private backgroundMode: BackgroundMode,
              private screenOrientation: ScreenOrientation,
              public storage: Storage) {
    
    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = 'HomePage';
        } else {
          this.rootPage = 'TutorialPage';
        }
        this.platformReady()
      });
    
    
  }
  
  monthSelected(id) {
    //wait for menu to close
    setTimeout(() => {
      this.events.publish("shareObject", id);
    }, 1500);
  }
  
  goToAboutPage() {
    this.appCtrl.getRootNav().push('AboutPage');
  }
  
  //Todo: version
  goToSettings() {
    this.appCtrl.getRootNav().push('SettingsPage');
  
  }
  
  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.lockScreen();
      this.enableBgMode();
      this.splashScreen.hide();
    });
  }
  
  enableBgMode(){
    this.backgroundMode.setDefaults({silent: true});
    if(!this.backgroundMode.isEnabled()){
      this.backgroundMode.enable();
    }
  }
  lockScreen(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .then(()=>{
      
    })
  }
}

