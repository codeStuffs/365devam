import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the CanInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'CanInfoPage'
})
@Component({
  selector: 'page-can-info',
  templateUrl: 'can-info.html',
})
export class CanInfoPage {

  constructor( public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CanInfoPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
