import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, MenuController, NavController, ViewController, Slides, Platform } from 'ionic-angular';
import * as moment from 'moment';
import { AppDataProvider } from "../../providers/app-data/app-data";
import { Observable } from 'rxjs/Observable';


//import * as $ from 'jquery'

@IonicPage({
  name: "HomePage"
})
@Component({
  selector   : 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  daysInMonth;
  days = [];
  currentDay;
  currentMonth;
  _365_data: Observable<any>;
  currentChip;
  noOfDaySlides: number;
  @ViewChild('slideDays') slideDays: Slides;
  
  constructor(public navCtrl: NavController, public platform: Platform,
              public app360Data: AppDataProvider,
              public menu: MenuController, public events: Events,
              public viewCtrl: ViewController) {
    moment.locale('tr'); // set moment to use tr locale
    let monthIndex =  moment().month(); // month index 0; //
  
    platform.ready().then((readySource) => {
      let width = platform.width();
      
      if(width > 480){
        this.noOfDaySlides = 10;
      }else{
        this.noOfDaySlides = 5;
      }
    });
    //event from sidebar months on click
    events.subscribe('shareObject', (month) => {
      monthIndex = month;
      this.setCurrentMonth(monthIndex, true);
    });
    
    this.setCurrentMonth(monthIndex, false); // set current month
    app360Data.load().subscribe(d => {}); // load initial data
  }
  
  
  setCurrentMonth(monthIndex: number, FromEmitter: boolean) {
    if(FromEmitter){
      this.days = []; //reset days to empty object
    }
    
    this.daysInMonth  = moment().month(monthIndex).daysInMonth(); //get the number of days in the chosen month
    this.currentDay   = moment().get('date');   //  1;                // set the current day
    let startOfMonth  = moment().startOf('month').date();// get the start of the chosen month
    this.currentMonth = moment().month(monthIndex).format('MMM'); // get the current month as string
    
    for (let day = 0; day < this.daysInMonth; day++) { // get the days of the current month
      this.days.push({
        day  : startOfMonth,
        month: this.currentMonth
      });
      startOfMonth++;
    }
    //
    if (FromEmitter){
      this.dayOnClick({day: this.currentDay, month: this.currentMonth}, event);
      this.moveToDay();
    }
  }
  
 
  
  ionViewDidLoad() {
    this.menu.enable(true);
    this.viewCtrl.showBackButton(false);
  }
  
  moveToDay(){
    let index = this.currentDay - 1;
    this.slideDays.slideTo(index,1000);
  }
  
  ionViewDidEnter() {
    this.dayOnClick({day: this.currentDay, month: this.currentMonth}, event);
    this.moveToDay();
  }
  
  dayOnClick(day: any, event: Event) {
    if (day.day !== this.currentDay){
      this.currentChip = day.day;
    }else{
      this.currentChip = null;
    }
    this._365_data = this.app360Data.getSelectedDayMessage(day);
  }
}
