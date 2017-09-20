import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { generateGuid, AssetService } from '../index';

@Component({
  selector: 'nx-datalist',
  templateUrl: './nx-datalist.component.html',
  styleUrls: ['../main.scss', './nx-datalist.component.scss']
})
export class NxDatalistComponent {
  @Input() type: string;
  @Input() label: string;
  @Input() gridClass = 'col-xs-12 col-sm-7 col-lg-4';
  @Input() model: any;
  @Input() help: string;
  @Input() required: boolean;
  @Input() srOnly: string;
  @Input() noResult: string;
  @Input() locale: string;
  @Input() set options(elem: any[]) {
    this.datalistOptions = elem;
  }
  @Output() ngModelChange = new EventEmitter();

  alert: string;
  datalistModel = '';
  inputName: string;
  valid = false;
  submitted = false;
  datalistOptions: any[] = [];
  matchingValue: boolean;

  @ViewChild('input') input: ElementRef;

  constructor(private assetService: AssetService) {
    this.inputName = generateGuid();
  }

  onChangeInput(value): void {
    this.matchingValue = false;
    for (let i = 0; i < this.datalistOptions.length; i++) {
      const label = this.datalistOptions[i].label;

      if (value === label) {
        this.model = this.datalistOptions[i].value;
        this.ngModelChange.emit(this.model);
        return;
      }

      const reg = new RegExp(value, 'i');
      if (label.search(reg) !== -1) {
        this.matchingValue = true;
      }
    }
    this.model = '';
    this.ngModelChange.emit(this.model);
  }

  isValid(): boolean {
    this.submitted = true;
    this.valid = true;
    if (this.required && this.datalistModel === '') {
      this.assetService.get('alert.required', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    } else if (this.datalistModel !== '' && this.model === '') {
      this.assetService.get('alert.incorrect', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    }
    return this.valid;
  }

  hasInputFocus(): boolean {
    return this.input.nativeElement === document.activeElement;
  }
}
