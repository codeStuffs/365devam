import { Component } from '@angular/core';
import { AlertController, IonicPage, Platform } from 'ionic-angular';
import * as moment from 'moment';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector   : 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  timeText: string;
  timeNotify: Date;
  alarmSet: boolean = false;
  showBtn: boolean  = false;
  
  constructor(private nativeStorage: NativeStorage,
              public platform: Platform, public alertCtrl: AlertController,
              public localNotifications: LocalNotifications) {
    
    
    //check for stored schedule/reminder
    this.nativeStorage.getItem('reminder')
      .then(
        data => {
          this.timeText   = moment(data['reminderDate']).format();
          this.timeNotify = new Date();
          this.showBtn    = false;
          this.alarmSet   = true;
          
        },
        error => {
          this.timeText   = moment(new Date()).format();
          this.timeNotify = new Date();
          this.alarmSet   = false;
        }
      );
    
    /* if(this.checkIfSet() && this.checkIfPlatform()){
     this.alarmSet = true;
     }*/
  }
  
  ionViewDidLoad() {
  }
  
  
  timeChange(time) {
    this.timeNotify = new Date();
    this.timeNotify.setHours(time.hour, time.minute, 0);
    //show save btn
    this.showBtn = true;
  }
  
  //check if set
  checkIfSet() {
    return this.localNotifications.isScheduled(101);
  }
  
  checkIfPlatform() {
    return this.platform.is('cordova');
  }
  
  checkIfHasPermission() {
    return this.localNotifications.hasPermission();
  }
  
  _requestPermission() {
    this.localNotifications.registerPermission().then((granted) => {
      this.onEnable();
    })
  }
  
  onEnable() {
    
    if (this.checkIfPlatform()) {
      this.platform.ready().then(() => {
        
        //check if app has permission
        if (this.checkIfHasPermission()) {
          
          let isSet = this.checkIfSet();
          
          //check is a reminder has been scheduled.
          if (isSet) {
            
            //cancel reminder if set and get a new reminder
            this.localNotifications.cancelAll() //cancel old, set new
              .then(() => {
                this.setReminder();
              })
          } else {
            // set new reminder
            this.setReminder();
          }
        } else {
          this._requestPermission();
        }
      }, (error) => {
        this.presentAlert("Reminder Not set");
      })
      
    } else {
      //console.log('not running n cordova')
    }
  }
  
  
  setReminder() {
    this.localNotifications.schedule({
      id   : 101,
      title: 'Gunde Devri Kelam...',
      icon: "res://icon.png",
      text : 'Günlük okuma hatırlatıcınız',
      // sound: this.platform.is('android')? 'file://sound.mp3': 'file://beep.caf',
      at   : this.timeNotify,
      every: 'day'
    });
    let readable = moment(this.timeNotify).format("h:mm a");
    this.presentAlert('Hatırlatma ayarı: ' + readable + ' her gün');
    this.nativeStorage.setItem('reminder', {reminderDate: this.timeNotify})
      .then(
        () => {},
        error => {}
      );
  }
  
  setAlarm() {
    if (this.alarmSet) {
      //do nothing just show save btn
      this.showBtn = true;
    } else {
      this.onCancel();
    }
  }
  
  onCancel() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.localNotifications.cancelAll().then(() => {
          this.nativeStorage.clear().then(()=> {}, error=>{});
          this.presentAlert("Hatırlatıcı İptal Edildi");
          this.showBtn =false;
        }, (erorr) => {
          this.presentAlert("Hatırlatıcıyı iptal etme hatası");
        });
      })
    } else {
      // console.log('not running n cordova')
    }
    
  }
  
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title   : 'Alarm',
      subTitle: msg,
      buttons : [ 'Tamam' ]
    });
    alert.present();
  }
  
}
