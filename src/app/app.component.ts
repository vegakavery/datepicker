import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  daySelected: any;
  weekSelected: any;
  year = 2024;
  month = 12;
  days!: any[];
  months = [
    'January',
    'Febraury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Septemper',
    'October',
    'November',
    'December',
  ];
  weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  ngOnInit() {
    this.days = this.generateDays(this.year, this.month);
    let date = new Date('' + this.year + '-' + this.month + '-1');
    this.daySelected = date.getDate();
    this.getWeekDay();
  }
  incrementMonth(increment: number) {
    const month =
      this.month + increment == 13
        ? 1
        : this.month + increment == 0
        ? 1
        : this.month + increment;
    this.year =
      this.month + increment == 13
        ? this.year + 1
        : this.month + increment == 0
        ? this.year - 1
        : this.year;
    this.month = month;
    this.days = this.generateDays(this.year, this.month);
    this.getWeekDay();
  }

  incrementYear(increment: number) {
    this.year = this.year + increment;
    this.days = this.generateDays(this.year, this.month);
    this.getWeekDay();
  }
  generateDays(year: number, month: number) {
    const increment = this.getIncrement(year, month);
    const days: { dateTxt: string; date: any; day: any; isMonth: boolean }[][] =
      [];
    [0, 1, 2, 3, 4, 5].forEach((x, index) => {
      days.push([]);
      for (let y = 0; y < 7; y++) {
        const date = this.getDate(x, y, year, month, increment);
        days[index].push(date);
      }
    });
    return days;
  }

  getIncrement(year: number, month: number): number {
    let date = new Date('' + year + '-' + month + '-1');
    let increment = date.getDay() - 1;
    return increment;
  }

  getDate(
    week: number,
    dayWeek: number,
    year: number,
    month: number,
    increment: number
  ) {
    let date: any;
    let day = week * 7 + dayWeek - increment;
    if (day <= 0) {
      let dateAuxiliar = new Date('' + year + '-' + month + '-1');
      date = new Date(
        dateAuxiliar.getTime() + (day - 1) * 24 * 60 * 60 * 1000
      );
    } else {
      date = new Date('' + year + '-' + month + '-' + day);
      if (isNaN(date.getTime())) {
        let dateAuxiliar = new Date('' + year + '-' + month + '-1');
        date = new Date(
          dateAuxiliar.getTime() + (day - 1) * 24 * 60 * 60 * 1000
        );
        console.log(day, increment, date);
      }
    }
    return {
      dateTxt:
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2),
      date: date,
      day: date.getDate(),
      isMonth: date.getMonth() == month - 1,
    };
  }
  selectedDate(event: any) {
    this.daySelected = event;
    this.getWeekDay();
  }
  getWeekDay() {
    let date = new Date(this.year, this.month - 1, this.daySelected);
    let day = date.getDay();
    if (day == 0) {
      this.weekSelected = 'Sunday';
    } else if (day == 1) {
      this.weekSelected = 'Monday';
    } else if (day == 2) {
      this.weekSelected = 'Tuesday';
    } else if (day == 3) {
      this.weekSelected = 'Wednesday';
    } else if (day == 4) {
      this.weekSelected = 'Thursday';
    } else if (day == 5) {
      this.weekSelected = 'Friday';
    } else if (day == 6) {
      this.weekSelected = 'Saturday';
    }
  }
}
