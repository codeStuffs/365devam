import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController,  Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  
  
  showSkip = true;
  
  @ViewChild('slides') slides: Slides;
  
  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public storage: Storage) {
  }
  
  startApp() {
    this.navCtrl.push('HomePage').then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }
  
  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }
  
  ionViewWillEnter() {
    this.slides.update();
  }
  
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    //this.menu.enable(false);
  }
  
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
    console.log('leaving');
  }
}
