import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { generateGuid, AssetService } from '../index';

@Component({
  selector: 'nx-input',
  templateUrl: './nx-input.component.html',
  styleUrls: ['../main.scss', './nx-input.component.scss']
})
export class NxInputComponent {
  @Input() type: string;
  @Input() label: string;
  @Input() gridClass = 'col-xs-12 col-sm-7 col-lg-4';
  @Input() inputClass: string;
  @Input() model: any;
  @Input() help: string;
  @Input() required: boolean;
  @Input() pattern: string;
  @Input() maxlength: string;
  @Input() srOnly: string;
  @Input() forceError: boolean;
  @Input() errorMessage: string;
  @Input() validityText: string;
  @Input() locale: string;

  @Output() ngModelChange = new EventEmitter();

  alert: string;
  inputName: string;
  valid = false;
  submitted = false;

  @ViewChild('input') input: ElementRef;

  constructor(private assetService: AssetService) {
    this.inputName = generateGuid();
  }

  isValid(): boolean {
    this.submitted = true;
    this.valid = true;
    const regex = new RegExp(`${this.pattern}`);
    if (this.required && this.model === '') {
      this.input.nativeElement.setCustomValidity(this.validityText);
      this.assetService.get('alert.required', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    } else if (this.pattern && this.model !== '' && !regex.test(this.model)) {
      this.input.nativeElement.setCustomValidity('');
      this.assetService.get('alert.incorrect', this.locale).subscribe((data) => {
        this.alert = data;
      });
      this.valid = false;
    }
    this.input.nativeElement.setCustomValidity('');
    return this.valid;
  }
}
