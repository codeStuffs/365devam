import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import * as moment from 'moment';

/*
  Generated class for the AppDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppDataProvider {

  data: any;
  monthsInYear= [];
  constructor(public http: HttpClient) {
    const year = 12;
    moment.locale('tr');

    for(let m =0; m<year; m++){
      this.monthsInYear.push({month: moment().month(m).format('MMM')})
    }
  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // convert to json
    this.data = data;
    /*let monthCount = 0;
    this.data.schedule.forEach((month: any)=>{
      let mm = this.monthsInYear[monthCount].month;
      console.log(month.verses);
     let verse = month.verses;
     verse.charAt();
      monthCount++;
    })*/

    return this.data;
  }

  getSelectedDayMessage(selectedDate: any): any{
    const date = selectedDate.day;
    const month = selectedDate.month;
    if(typeof this.data === 'undefined'){
      return false;
    }
    let myKeys = Object.keys(this.data).filter(key => key == month);
    let result = myKeys.reduce((r, k) => r.concat(this.data[k]), []);
    return result.filter(key=>key.day == date);

  }
}
