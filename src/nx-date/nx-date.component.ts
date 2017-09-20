import { Component, Input, Output, EventEmitter } from '@angular/core';
import { generateGuid, AssetService } from '../index';

@Component({
  selector: 'nx-date',
  templateUrl: './nx-date.component.html',
  styleUrls: ['../main.scss', './nx-date.component.scss']
})
export class NxDateComponent {
  @Input() label: string;
  @Input() model: any;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() forceError: boolean;
  @Input() dayLabel: string;
  @Input() monthLabel: string;
  @Input() yearLabel: string;
  @Input() locale: string;
  @Input('start-date') set startDate(date: string) {
    this.startYear = new Date(date).getFullYear();
    this.startDateInput = date;
    this.yearOptions = this.getYearOptions();
  }
  @Input('end-date') set endDate(date: string) {
    this.endYear = new Date(date).getFullYear();
    this.endDateInput = date;
    this.yearOptions = this.getYearOptions();
  }

  @Output() ngModelChange = new EventEmitter();

  alert: string;
  date: any = {day: '-1', month: '-1', year: '-1'};
  inputName: string;
  dayOptions: any[];
  monthOptions: any[];
  yearOptions: any[];
  startYear: number;
  endYear: number;
  startDateInput = '';
  endDateInput = '';
  valid = false;
  submitted = false;

  constructor(private assetService: AssetService) {
    this.inputName = generateGuid();
    this.dayOptions = this.getDayOptions();
    this.monthOptions = this.getMonthOptions();
    this.assetService.get([
      'date.dayLabel',
      'date.monthLabel',
      'date.yearLabel'
    ], this.locale).subscribe((data) => {
      this.dayLabel = data['date.dayLabel'];
      this.monthLabel = data['date.monthLabel'];
      this.yearLabel = data['date.yearLabel'];
    });
  }

  getDayOptions(): any[] {
    const days = Array.from(Array(31), (x: undefined, i: number) => {
      return {'value': i + 1, 'label': i + 1};
    });
    return days;
  }

  getMonthOptions(): any[] {
    let months;
    const options = [];

    this.assetService.get('date.months', this.locale).subscribe((data) => {
      months = data;

      months.forEach((label: string, idx: number) => {
        options.push({
          'value': idx + 1,
          'label': label
        });
      });
    });

    return options;
  }

  getYearOptions(): any[] {
    const years = [];
    if (this.startYear && this.endYear) {
      for (let i = this.startYear; i <= this.endYear; i++) {
        years.push({'value': i, 'label': i});
      }
    }
    return years;
  }

  onChange(): void {
    this.ngModelChange.emit(this.formatDate(this.date));
  }

  formatDate(val: any): string {
    const dateFormat = `${val.year}-${('0' + val.month).slice(-2)}-${('0' + val.day).slice(-2)}`;
    return dateFormat;
  }

  isValid(): boolean {
    this.submitted = true;
    this.valid = true;
    if (this.date.day === '-1' && this.date.month === '-1' && this.date.year === '-1') {
      this.assetService.get('alert.required', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
      return this.valid;
    } else if (this.date.day === '-1' || this.date.month === '-1' || this.date.year === '-1') {
      this.assetService.get('alert.date.incomplete', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
      return this.valid;
    }
    const inputDate = new Date(this.date.year, this.date.month - 1, this.date.day);
    const startDate = new Date(this.startDateInput);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(this.endDateInput);
    endDate.setHours(23, 59, 59);
    if (inputDate < startDate) {
      this.assetService.get('alert.incorrect', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    } else if (inputDate > endDate) {
      this.assetService.get('alert.date.beyondToday', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    }
    return this.valid;
  }

}
