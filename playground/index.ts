/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NxFormsModule }  from 'nx-forms';

@Component({
  selector: 'app-playground',
  template: `
    <div style="text-align: center;display:flex; justify-content: center;">
    <div style="text-align: left; width: 40%;">
      <h1>Welcome to the demo page of NxForms !</h1>
      <h3>You can see below some examples of existing directives.</h3>
        <div style="border: 1px solid rgba(0,0,0,0.35);padding: 10px;margin-bottom: 20px;">
          <nx-input
            type="text"
            label="Input"
            [model]="nxInput"
            (ngModelChange)="nxInput = $event"
            [required]="true"
            help="you can see the result below.">
          </nx-input>
          <p>Result: {{nxInput}}</p>
        </div>
        <div style="border: 1px solid rgba(0,0,0,0.35);padding: 10px;margin-bottom: 20px;">
          <nx-select
            label="Select"
            [model]="nxSelect"
            (ngModelChange)="nxSelect = $event"
            [options]="nxSelectOptions"
            [required]="true">
          </nx-select>
          <p>Result: {{nxSelect}}</p>
        </div>
        <div style="border: 1px solid rgba(0,0,0,0.35);padding: 10px;margin-bottom: 20px;">
          <nx-datalist
            type="text"
            label="Datalist"
            [model]="nxDatalist"
            (ngModelChange)="nxDatalist = $event"
            [options]="nxDatalistOptions"
            noResult="no result."
            [required]="true"
            help="you can see the result below.">
          </nx-datalist>
          <p>Result: {{nxDatalist}}</p>
        </div>
        <div style="border: 1px solid rgba(0,0,0,0.35);padding: 10px;margin-bottom: 20px;">
          <nx-date
            label="Date"
            [model]="nxDate"
            start-date="2016-01-01"
            end-date="2018-12-31"
            (ngModelChange)="nxDate = $event"
            [required]="true">
          </nx-date>
          <p>Result: {{nxDate}}</p>
        </div>
      </div>
  `
})
class AppComponent {
  @Input() nxInput = '';
  @Input() nxSelect = '';
  @Input() nxDatalist = '';
  @Input() nxDate = '';
  nxSelectOptions = [
    {label: 'first value', value: 'first_value'},
    {label: 'second value', value: 'second_value'},
    {label: 'third value', value: 'third_value'}
  ];
  nxDatalistOptions = [
    {label: 'first value', value: 'first_value'},
    {label: 'second value', value: 'second_value'},
    {label: 'third value', value: 'third_value'}
  ];
  constructor() {}
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NxFormsModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
