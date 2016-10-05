'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './calendar.routes';
import moment from 'moment';

export class calendarComponent {
  /*@ngInject*/
  constructor($timeout) {
    this.$timeout = $timeout;
    this.showDay = new Array(7).fill(true);
    this.daySelected = new Array(7).fill(false);
    let sunday = moment().startOf('week');
    this.startDate = new Date(sunday);
    this.dates = [new Date(sunday)];

    for(let i = 1; i < 7; i++)
      this.dates.push(new Date(sunday.add(1, 'days')));
    this.endDate = new Date(sunday);
    this.datePickerOptions = {
      minDate: this.startDate
    };
    this.toEndOfMonth = false;
  }

  startDateChanged() {
    if(!this.startDate) return;
    if(this.endDate && this.startDate > this.endDate)
      this.endDate = this.startDate;
    this.updateDisplay();
  }

  endDateChanged() {
    if(!this.endDate) return;
    if(this.startDate && this.endDate < this.startDate)
      this.startDate = this.endDate;
    this.updateDisplay();

  }

  updateDisplay() {
    let endDate = this.toEndOfMonth ? new Date(moment().endOf('month').startOf('day')) : this.endDate;
    for(let i = 0; i < 7; i++) {
      if(this.dates[i].getTime() >= this.startDate.getTime() && this.dates[i].getTime() <= endDate.getTime())
        this.showDay[i] = true;
      else {
        this.showDay[i] = false;
        this.daySelected[i] = false;
      }
    }
  }

  toEndOfMonthChanged() {
    this.updateDisplay();
  }
  stuff(index) {
    this.daySelected[index] = !this.daySelected[index];

  }

}

export default angular.module('pandatestApp.calendar', [uiRouter])
  .config(routing)
  .component('calendar', {
    template: require('./calendar.html'),
    controller: calendarComponent
  })
  .name;
